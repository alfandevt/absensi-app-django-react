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

    def test_create_user_with_profil(self):
        """Test create a user with profil"""
        user = create_user()
        divisi = models.DivisiKerja.objects.create(nama='Tech')
        karyawan = models.ProfilKaryawan.objects.create(
            user=user,
            nik='12344212321231',
            tgl_lahir='1988-02-14',
            no_telp='123123441223',
            jenis_kelamin='L',
            divisi=divisi
        )

        self.assertEqual(user, karyawan.user)
        self.assertEqual(divisi, karyawan.divisi)

    def test_create_divisi_karyawan(self):
        """Test create divisi karyawan"""
        nama = 'Divisi IT'
        divisi = models.DivisiKerja.objects.create(nama=nama)

        self.assertEqual(nama, divisi.nama)

    def test_create_jam_kerja(self):
        """Test creating jam kerja"""
        mulai = time(hour=9)
        selesai = time(hour=11)
        jam_kerja = models.JamKerja.objects.create(mulai=mulai, selesai=selesai)

        self.assertEqual(mulai, jam_kerja.mulai)
        self.assertEqual(selesai, jam_kerja.selesai)
        self.assertGreater(jam_kerja.selesai, jam_kerja.mulai)

    def test_create_jam_kerja_aktif(self):
        """Test creating jam kerja aktif"""
        mulai = time(hour=9)
        selesai = time(hour=11)
        jam_kerja = models.JamKerja.objects.create(mulai=mulai, selesai=selesai, deskripsi='Kerja Reguler')
        jam_kerja_aktif = models.JamKerjaAktif.objects.create(jam_kerja=jam_kerja)

        self.assertIs(jam_kerja, jam_kerja_aktif.jam_kerja)

    def test_create_absensi(self):
        """Test create absensi"""
        user = create_user()
        divisi = models.DivisiKerja.objects.create(nama='Tech')
        karyawan = models.ProfilKaryawan.objects.create(
            user=user,
            nik='12344212321231',
            tgl_lahir='1988-02-14',
            no_telp='123123441223',
            jenis_kelamin='L',
            divisi=divisi
        )

        mulai = time(hour=9)
        selesai = time(hour=11)
        jam_kerja = models.JamKerja.objects.create(mulai=mulai, selesai=selesai, deskripsi='Kerja Reguler')
        jam_kerja_aktif = models.JamKerjaAktif.objects.create(jam_kerja=jam_kerja)
        absensi = models.AbsensiKaryawan(karyawan=karyawan, keterangan='Terlambat', jam=time(10))

        self.assertGreater(absensi.jam, jam_kerja_aktif.jam_kerja.mulai)


