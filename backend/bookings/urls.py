from bookings import views
from django.urls import path


urlpatterns = [
    path('', views.get_user_booking),
]