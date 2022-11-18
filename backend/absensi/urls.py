"""
URL Mapping for absensi API.
"""
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from absensi import views


app_name = 'absensi'

router = DefaultRouter()
router.register('jamkerja', views.ManageJamKerjaViewSet)

urlpatterns = [
    path('manage/', include(router.urls))
]
