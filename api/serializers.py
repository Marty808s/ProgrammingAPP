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
        fields = ['level_id', 'result']


