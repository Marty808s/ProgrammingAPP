from django.shortcuts import render
from rest_framework import generics, status
from .models import User, Code, Level
from .serializers import UserSerializer, CodeSerializer, LevelSerializer, LoginSerializer, RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .codeValidator import test_code
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth import logout


class InitializeSession(APIView):
    def get(self, request):
        if not request.session.session_key:
            request.session.create()
        return Response({"session_key": request.session.session_key}, status=status.HTTP_200_OK)

#API uživatelů - POST A GET
# -> asi potom předělat na GET a POST přes APIView
# ->generics.ListCreateAPIView automaticky implementuje obě metody GET a POST
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# API kódů
class CodeView(APIView):
     serializer_class = CodeSerializer
     
     def post(self, request):
        # Pokud není session, tak jí vytvořím
        if not self.request.session.exists(request.session.session_key):
               self.request.session.create()
        # Zkontroluju data pomocí serializeru
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            code = serializer.save()
            code.code_output = test_code(code.code) #generuju vystup kodu - pridam do modelu
            self.request.session['code_id'] = code.code_id # do session uložím id kódu - pro následné GET
            code.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) # Vracím s requestem
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
     def get(self, request):
        code_id = self.request.session.get('code_id') #má uživatel session_key?
        if not code_id: #oukej, nemá ho, takže mi nepostul kod
            return Response({"error": "No code found for this session"}, status=status.HTTP_404_NOT_FOUND)
        code = Code.objects.get(code_id=code_id) # uživatel má session_key, takže mi postul kod
        # vracím kod, level a výsledek
        return Response(CodeSerializer(code).data, status=status.HTTP_200_OK)

# API levelů
class LevelView(APIView):
    serializer_class = LevelSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data) # načtu data do serializeru
        if serializer.is_valid():
            level, created = Level.objects.get_or_create(
                level_id=serializer.validated_data['level_id'],
                defaults={'result': serializer.validated_data['result']}
            )
            if not created: # pokud level s id existuje, tak ho aktualizuju
                level.result = serializer.validated_data['result']
                level.save()

            self.request.session['level_id'] = level.level_id  # uložíl level id do session
            serializer = self.serializer_class(level)
            status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
            return Response(serializer.data, status=status_code)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        level_id = request.query_params.get('level_id')
        if not level_id:
            return Response({"error": "level_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            level = Level.objects.get(level_id=level_id)
            return Response(LevelSerializer(level).data, status=status.HTTP_200_OK)
        except Level.DoesNotExist:
            return Response({"error": "Level not found"}, status=status.HTTP_404_NOT_FOUND)


class AllCodes(APIView):
    def get(self, request):
        queryset = Code.objects.all()
        serializer = CodeSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LevelALL(APIView):
    def get(self, request):
        queryset = Level.objects.all()
        serializer = LevelSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ClearLevels(APIView):
    def post(self, request):
        Level.objects.all().delete()
        return Response({"message": "All levels have been deleted"}, status=status.HTTP_200_OK)

class Login(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            password = serializer.validated_data['password']
            
            try:
                user = User.objects.get(name=name)
            except User.DoesNotExist:
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            if check_password(password, user.password):
                request.session['user_id'] = user.id
                return Response({"message": "Login successful", "user_id": user.id}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Register(APIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                user = User(
                    name=serializer.validated_data['name'],
                    email=serializer.validated_data.get('email')  # Předpokládáme, že email je v serializeru
                )
                user.password = make_password(serializer.validated_data['password'])
                user.save()
                return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#UDĚLAT VIEW PRO PŘEDÁNÍ INFORMACÍ O UŽIVATELI

class UserInfo(APIView): #přijímá name ze session a vrací id, name a email

    def get(self, request):
        user_name = request.query_params.get('username')
        user = User.objects.get(name=user_name)
        if user:
            return Response({"user_id": user.id, "name": user.name, "email": user.email}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)