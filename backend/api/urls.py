from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import JobCategoryViewSet, JobViewSet
from users.views import UserViewSet, ReviewViewSet

app_name = 'api'

router_v1 = DefaultRouter()
router_v1.register(r'jobs', JobViewSet, basename='jobs')
router_v1.register(r'category', JobCategoryViewSet, basename='category')
router_v1.register(r'users', UserViewSet, basename='users')
router_v1.register(r'users/(?P<user_id>\d+)/reviews',
                ReviewViewSet, basename='reviews')

urlpatterns = [
    path('', include(router_v1.urls)),
    path('login/', include('djoser.urls.jwt')),
]
