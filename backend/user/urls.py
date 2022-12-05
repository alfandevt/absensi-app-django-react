"""
User URLs.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user import views


app_name = 'user'

router = DefaultRouter()
router.register('users', views.ManageUsersViewSet)
router.register('divisi', views.ManageDivisiViewSet)

urlpatterns = [
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('manage/', include(router.urls)),
    path('me/', views.ManageUserMeViewSet.as_view(), name='me')
]
