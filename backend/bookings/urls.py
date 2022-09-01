from bookings import views
from django.urls import path


urlpatterns = [
    path('', views.user_booking),
    path('all/', views.get_all_bookings),
    path('<int:pk>/', views.delete_user_booking),
]