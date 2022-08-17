from django.contrib import admin
from users.models import CustomUser
# Register your models here.


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name','last_name','email','date_joined']
    list_filter = ['date_joined']
