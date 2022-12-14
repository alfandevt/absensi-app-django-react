"""
Admin sites.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from core import models



@admin.register(models.User)
class UserAdmin(BaseUserAdmin):
    """Defining the admin page for users."""
    ordering = ['nama_lengkap', 'is_staff']
    list_display = ['nama_lengkap', 'email']
    search_fields = ('nama_lengkap', 'email')
    fieldsets = (
        (
            _('User Information'),
            {
                'fields': (
                    'nama_lengkap',
                    'email',
                    'password'
                )
            }
        ),
        (
            _('Permission'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser'
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login',)})
    )


admin.site.register(models.Profil)
admin.site.register(models.Divisi)
admin.site.register(models.JamKerja)
admin.site.register(models.Absensi)
