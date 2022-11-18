"""
Testing models.
"""
from datetime import time

from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def create_user(email='user@email.com', password='test1234', nama_lengkap='User Satu'):
    """Create and return a new user."""
    return get_user_model().objects.create_user(email, password, nama_lengkap)


class ModelTests(TestCase):
    """Test Model."""

    def test_create_user(self):
        """Test creating user"""
        email = 'test@mail.com'
        password = 'testpass123'
        nama_lengkap = 'Test Userudin'
        user = get_user_model().objects.create_user(email, password, nama_lengkap)

        self.assertEqual(user.email, email)
        self.assertEqual(user.nama_lengkap, nama_lengkap)
        self.assertTrue(user.check_password(password))

    def test_create_user_without_email_raise_error(self):
        """Test creating user without email"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user('', 'passwordq234', 'Antoni')

    def test_create_user_without_nama_lengkap_raise_error(self):
        """Test creating user without email"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user('anto@mail.com', 'passwordq234', '')

    def test_create_user_without_password_raise_error(self):
        """Test creating user without email"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user('anto@mail.com', '', 'Antoni')

    def test_create_superuser(self):
        """Test create superuser."""
        email = 'test@mail.com'
        password = 'testpass123'
        nama_lengkap = 'Test Userudin'
        user = get_user_model().objects.create_superuser(email, password, nama_lengkap)

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_delete_user_and_profil(self):
        """Test delete user and profile."""
        email = 'test@mail.com'
        password = 'testpass123'
        nama_lengkap = 'Test Userudin'

        user = get_user_model().objects.create_superuser(email, password, nama_lengkap)
        profil = models.Profil.objects.filter(user=user)

        nama_divisi = 'Divisi IT'
        divisi = models.Divisi.objects.create(nama=nama_divisi)

        profil.update(nik='1234', divisi=divisi)
        user.delete()

        user = get_user_model().objects.filter(email=email)
        divisi = models.Divisi.objects.filter(id=divisi.id)
        self.assertFalse(user.exists())
        self.assertFalse(profil.exists())
        self.assertTrue(divisi.exists())

    def test_delete_profil(self):
        """Test delete user and profile."""
        email = 'test@mail.com'
        password = 'testpass123'
        nama_lengkap = 'Test Userudin'

        user = get_user_model().objects.create_superuser(email, password, nama_lengkap)
        profil = models.Profil.objects.filter(user=user)

        nama_divisi = 'Divisi IT'
        divisi = models.Divisi.objects.create(nama=nama_divisi)

        profil.update(nik='1234', divisi=divisi)
        profil.delete()

        user = get_user_model().objects.filter(email=email)
        divisi = models.Divisi.objects.filter(id=divisi.id)

        self.assertFalse(user.exists())
        self.assertFalse(profil.exists())
        self.assertTrue(divisi.exists())

    def test_create_divisi_karyawan(self):
        """Test create divisi karyawan"""
        nama = 'Divisi IT'
        divisi = models.Divisi.objects.create(nama=nama)

        self.assertEqual(nama, divisi.nama)

    def test_delete_divisi_karyawan(self):
        """Test delete user and profile."""
        email = 'test@mail.com'
        password = 'testpass123'
        nama_lengkap = 'Test Userudin'
        user = get_user_model().objects.create_superuser(email, password, nama_lengkap)
        profil = models.Profil.objects.filter(user=user)

        nama_divisi = 'Divisi IT'
        divisi = models.Divisi.objects.create(nama=nama_divisi)
        profil.update(nik='1234', divisi=divisi)

        divisi.delete()

        user = get_user_model().objects.filter(email=email)
        divisia = models.Divisi.objects.filter(id=divisi.id)
        self.assertTrue(user.exists())
        self.assertTrue(profil.exists())
        self.assertFalse(divisia.exists())

    def test_create_jam_kerja(self):
        """Test creating jam kerja"""
        mulai = time(hour=9)
        selesai = time(hour=11)
        jam_kerja = models.JamKerja.objects.create(mulai=mulai, selesai=selesai)

        self.assertEqual(mulai, jam_kerja.mulai)
        self.assertEqual(selesai, jam_kerja.selesai)
        self.assertGreater(jam_kerja.selesai, jam_kerja.mulai)

    def test_create_absensi(self):
        """Test create absensi"""
        user = create_user()

        mulai = time(hour=9)
        selesai = time(hour=11)
        jam_kerja = models.JamKerja.objects.create(mulai=mulai, selesai=selesai, deskripsi='Kerja Reguler')
        absensi = models.AbsensiKaryawan(karyawan=user, keterangan='Terlambat', jam=time(10))

        self.assertGreater(absensi.jam, jam_kerja.mulai)

