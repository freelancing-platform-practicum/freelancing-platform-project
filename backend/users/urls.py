from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import UserViewSet, FreelancerViewSet, ReviewViewSet

router = SimpleRouter()
router.register('users', UserViewSet)
router.register('freelancers', FreelancerViewSet)
router.register(r'users/(?P<user_id>\d+)/reviews',
                ReviewViewSet, basename='reviews')
# router.register('profile', WorkerProfileviewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', include('djoser.urls.jwt')),
]
