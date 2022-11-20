"""
User serializer.
"""
from django.contrib.auth import (
    get_user_model,
    authenticate
)
from django.utils.translation import gettext as _

from rest_framework import serializers

from core import models


class DivisiSerializer(serializers.ModelSerializer):
    """Serializer for divisi."""

    class Meta:
        model = models.Divisi
        fields = ['id', 'nama']
        read_only_fields = ['']


class ProfilSerializer(serializers.ModelSerializer):
    """Serializer for Profil"""

    class Meta:
        model = models.Profil
        exclude = ['user']
        read_only_fields = ['id']


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user object."""

    profil = ProfilSerializer(required=False)

    class Meta:
        model = get_user_model()
        fields = ['id', 'nama_lengkap', 'email', 'password', 'foto', 'profil']
        read_only_fields = ['id', 'is_active']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}


    def create(self, validated_data):
        """Create and return a user with encrypte password."""
        profil = validated_data.pop('profil', None)
        user = get_user_model().objects.create_user(**validated_data)

        if profil is not None:
            userProfil = models.Profil.objects.filter(user=user)
            userProfil.update(**profil)

        return user

    def update(self, instance, validated_data):
        """Update and return user."""
        password = validated_data.pop('password', None)
        profil = validated_data.pop('profil', None)

        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        if profil is not None:
            userProfil = models.Profil.objects.filter(user=user)
            userProfil.update(**profil)

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Validate and authenticate the user."""
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user."""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials.')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs
