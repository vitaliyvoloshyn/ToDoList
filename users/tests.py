from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

from todo.models import ProjectModel
from .models import CustomUser
from .views import CustomUserViewSet


class TestUserViewSet(TestCase):
    def test_get_list(self):
        """Получение списка пользователей"""
        print(self.__doc__)
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        """Создание пользователя под не авторизованным пользователем"""
        factory = APIRequestFactory()

        request = factory.post('/api/users/', {'username': 'User5',
                                               'email': 'user5@.mail.ru'}, format='json')
        view = CustomUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        """Создание пользователя под админом"""
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'User5',
                                               'email': 'user5@mail.ru',
                                               'password': 'qwerty'}, format='json')
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com',
                                                    'admin123456')
        force_authenticate(request, admin)
        view = CustomUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        """Получение информации по конкретном пользователю"""
        user = CustomUser.objects.create(username='User5',
                                         email='user5@mail.ru',
                                         password='qwerty')

        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        """Изменение пользователя под не авторизованным пользователем"""
        user = CustomUser.objects.create(username='User5',
                                         email='user5@mail.ru',
                                         password='qwerty')

        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'username': 'User6'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        """Изменение пользователя под админом"""
        user = CustomUser.objects.create(username='User5',
                                         email='user5@mail.ru',
                                         password='qwerty')
        client = APIClient()
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com',
                                                    'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/users/{user.id}/', {'username': 'User6',
                                                         'email': 'user5@mail.ru',
                                                         'password': 'qwerty'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = CustomUser.objects.get(id=user.id)
        self.assertEqual(user.username, 'User6')
        client.logout()


class TestBookViewSet(APITestCase):

    def test_get_list(self):
        """Получение списка проектов"""
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        """Редактирование проекта под админом"""
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        project = ProjectModel.objects.create(name='Project999', url='url')
        user = project.user.create(username='User5', email='user5@mail.ru', password='qwerty')
        self.client.login(username=admin.username, password='admin123456')
        response = self.client.put(f'/api/projects/{1}/', {
            'name': 'Project1000',
            'url': 'http://url.com',
            'user': user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_item = ProjectModel.objects.get(id=project.id)
        self.assertEqual(project_item.name, 'Project1000')
