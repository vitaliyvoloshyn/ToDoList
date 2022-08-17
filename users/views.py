from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
