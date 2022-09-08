from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserViewSet(ModelViewSet):
    # permission_classes = [permissions.DjangoModelPermissions]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
