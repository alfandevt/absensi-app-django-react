"""
Test User API.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from faker import Faker
Faker.seed(0)

from user.serializers import (
    UserSerializer
)

USERS_URL = reverse('user:user-list')

def detail_urls(user_id):
    """Return Detail URLs."""
    return reverse('user:user-detail', args=[user_id])


# Function Create Admin Super User
def create_superuser(nama_lengkap='Testo User', email='test@email.com', password='testpass123'):
    """Create and return user."""
    user = get_user_model().objects.create_superuser(email, password, nama_lengkap)
    user.refresh_from_db()
    return user


class PublicUserApiTests(TestCase):
    """Test for unauthorized feature of Apis."""

    def setUp(self):
        self.client = APIClient()

    def test_retrieve_users_list(self):
        """Retrieve list of users will fail unauthorized."""
        res = self.client.get(USERS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class AdminUserApiTests(TestCase):
    """Test for authorized admin feature of Apis."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_superuser()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_users_list(self):
        """Retrieve list of users will success authorized."""
        faker = Faker('id-ID')
        for _ in range(10):
            get_user_model().objects.create_user(
                nama_lengkap=faker.name(),
                email=faker.email(),
                password='randompassword'
            )
        res = self.client.get(USERS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('results', res.data)
        self.assertIn('next', res.data)

    def test_create_an_user(self):
        """Create an user."""
        payload = {
            'nama_lengkap': 'Budiman',
            'email': 'budiman@email.com',
            'password': 'passwordhalal123'
        }
        res = self.client.post(USERS_URL, payload)

        addedUser = get_user_model().objects.filter(id=res.data['id'])
        self.assertTrue(addedUser.exists())

    def test_create_user_with_detil(self):
        """Create a user with detil."""

        payload = {
            'nama_lengkap': 'Budiman',
            'email': 'budimans@email.com',
            'password': 'passwordhalal123',
            'profil':
                {'nik': '12345678', 'no_telp': '08567891012', 'jenis_kelamin': 'L'}
        }
        res = self.client.post(USERS_URL, payload, format='json')

        addedUser = get_user_model().objects.get(id=res.data.get('id'))
        serialized = UserSerializer(addedUser)

        createdNik = serialized.data.get('profil', {}).get('nik', None)
        payloadNik = payload.get('profil', {}).get('nik')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(createdNik, payloadNik)

    def test_retrieve_user(self):
        """Retrieve an user."""
        res = self.client.get(detail_urls(self.user.id))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.email, res.data['email'])

    def test_retrieve_user_404(self):
        """Retrieve an user."""
        res = self.client.get(detail_urls(4))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_user(self):
        """Edit a user test."""
        payload = {'nama_lengkap': 'Antonov'}
        url = detail_urls(self.user.id)
        res = self.client.patch(url, payload)

        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.nama_lengkap, res.data['nama_lengkap'])

    def test_edit_user_detil(self):
        """Edit a user detil."""
        user = get_user_model().objects.create_user(nama_lengkap='Testto', email='testo@example.com', password='test12345')
        payload = {'nama_lengkap': 'Testaman', 'profil': {'nik': '12345678', 'no_telp': '08567891012', 'jenis_kelamin': 'L'}}
        res = self.client.patch(detail_urls(user.id), payload, format='json')

        user.refresh_from_db()
        user = UserSerializer(user, many=False)

        updatedNik = user.data.get('profil', {}).get('nik')
        payloadNik = payload.get('profil', {}).get('nik')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(updatedNik, payloadNik)

    def test_delete_user(self):
        """Delete a user."""
        faker = Faker('id-ID')
        user = None
        for _ in range(10):
            user = get_user_model().objects.create_user(
                nama_lengkap=faker.name(),
                email=faker.email(),
                password='randompassword'
            )
        res = self.client.delete(detail_urls(user.id))
        users = get_user_model().objects.filter(is_active=True)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(users.count(), 10)


