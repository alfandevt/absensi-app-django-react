"""
Database models.
"""
# import uuid
import os
from datetime import (
    datetime, time
)

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)

def default_time(hour=9, minute=0, second=0):
    """Create default time for timeField"""
    return time(hour, minute, second)

def profil_foto_file_path(instance, filename):
    """Generate file path for foto"""
    ext = os.path.splitext(filename)[1]
    filename = f'{instance.nama_lengkap}{ext}'
    return os.path.join('uploads', 'profil', filename)


class UserManager(BaseUserManager):
    """Manage for user."""

    def create_user(self, email, password, nama_lengkap):
        """Create, save and return user."""
        if not nama_lengkap:
            raise ValueError(_('User must have a fullname.'))
        if not email:
            raise ValueError(_('User must have an email address.'))
        if not password:
            raise ValueError(_('User must have a password.'))
        user = self.model(email=self.normalize_email(email), nama_lengkap=nama_lengkap)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, nama_lengkap):
        """Create and return a new superuser."""
        user = self.create_user(email, password, nama_lengkap)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user



class User(AbstractBaseUser, PermissionsMixin):
    """User model for system."""
    nama_lengkap = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class ProfilKaryawan(models.Model):
    """Profil model for user."""

    class JenisKelamin(models.TextChoices):
        LAKI = 'L', _('Laki-laki')
        PEREMPUAN = 'P', _('Perempuan')

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    nik = models.CharField(max_length=30)
    no_telp = models.CharField(null=True, max_length=30)
    tgl_lahir = models.DateField()
    jenis_kelamin = models.TextField(
        choices=JenisKelamin.choices,
        default=JenisKelamin.LAKI)
    foto = models.ImageField(null=True)
    divisi = models.ForeignKey('DivisiKerja', on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.user.nama_lengkap


class DivisiKerja(models.Model):
    """Model for Divisi Kerja."""
    nama = models.CharField(max_length=255)

    def __str__(self):
        return self.nama


class JamKerja(models.Model):
    """Model for Jam Kerja."""
    mulai = models.TimeField()
    selesai = models.TimeField()
    deskripsi = models.CharField(max_length=200)


class JamKerjaAktif(models.Model):
    """Model for set jam kerja aktif."""
    jam_kerja = models.OneToOneField('JamKerja', on_delete=models.SET_NULL, null=True)


class AbsensiKaryawan(models.Model):
    """Model for absensi karyawan."""
    karyawan = models.ForeignKey('ProfilKaryawan', on_delete=models.CASCADE)
    keterangan = models.CharField(max_length=255)
    jam = models.DateTimeField(auto_now_add=True)


