"""
URL Mapping for absensi API.
"""
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from absensi import views


app_name = 'absensi'

router = DefaultRouter()
router.register('setting/jam', views.ManageJamKerjaViewSet)

urlpatterns = [
    path('manage/', include(router.urls)),
    path('absen/', views.absen_karyawan, name='absen'),
    path('list-absen/<int:pk>/', views.absen_detail_list, name='list-absen'),
    path('absen-info/<int:pk>/', views.absen_user_count_current_month, name='info-absen'),
    path('absen-check/', views.check_user_absen, name='absen-check'),
]
