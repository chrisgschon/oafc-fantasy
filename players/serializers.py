from rest_framework import serializers
from .models import Player

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player 
        fields = ('pk','first_name', 'last_name', 'email','description')