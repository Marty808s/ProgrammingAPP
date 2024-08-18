# Vezme model a překonvertuje na JSON
# -slouží pro API

from rest_framework import serializers
from .models import User, Code, Level

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'email', 'password', 'created_at']

class CodeSerializer(serializers.ModelSerializer):
        class Meta:
            model = Code
            fields = ['code_id', 'id_user', 'code', 'send_at', 'level', 'code_output']
            read_only_fields = ['code_id', 'send_at', 'code_output']

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ['level_id', 'level_name', 'level_description', 'level_code', 'result']


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'password']
        

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    # kontrola, zda uživatel s tímto jménem nebo emailem neexistuje
    def validate_name(self, value):
        if User.objects.filter(name=value).exists():
            raise serializers.ValidationError("A user with this name already exists.")
        return value

    # kontrola, zda uživatel s tímto emailem neexistuje
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value