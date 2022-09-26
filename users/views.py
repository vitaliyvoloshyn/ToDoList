from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet


from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerNew


class CustomUserViewSet(ModelViewSet):
    permission_classes = [permissions.DjangoModelPermissions]
    queryset = CustomUser.objects.all()

    def get_serializer_class(self):
        if self.request.version == '1.2':
            return CustomUserModelSerializerNew
        return CustomUserModelSerializer
