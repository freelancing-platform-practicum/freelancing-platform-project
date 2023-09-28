from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import UserViewSet  # , WorkerProfileviewSet

router = SimpleRouter()
router.register('users', UserViewSet),
# router.register('profile', WorkerProfileviewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', include('djoser.urls.jwt')),
]