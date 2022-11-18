"""
Test User API.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


ME_URL = reverse('user:me')

def detail_urls(user_id):
    """Return Detail URLs."""
    return reverse('user:user-detail', args=[user_id])


# Function Create Admin Super User
def create_user(nama_lengkap='Testo User', email='test@email.com', password='testpass123'):
    """Create and return user."""
    user = get_user_model().objects.create_user(email, password, nama_lengkap)
    user.refresh_from_db()
    return user


class PublicUserMeApiTests(TestCase):
    """Test the public feature of the user me API."""

    def setUp(self):
        self.client = APIClient()

    def test_get_me_failed(self):
        """Test get me info failed."""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserMeApiTests(TestCase):
    """Test the private feature of the user me API."""

    def setUp(self):
        self.user = create_user()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_get_me_success(self):
        """Test get me info success."""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['nama_lengkap'], self.user.nama_lengkap)

    def test_update_me_success(self):
        """Test update me success."""
        payload = {
            'nama_lengkap': 'Budiman',
            'email': 'budimans@email.com',
            'password': 'passwordhalal123',
            'profil':
                {'nik': '12345678', 'no_telp': '08567891012', 'jenis_kelamin': 'L'}
        }

        res = self.client.patch(ME_URL, payload, format='json')
        self.user.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.nama_lengkap, payload['nama_lengkap'])
        self.assertEqual(self.user.profil.nik, payload['profil']['nik'])


