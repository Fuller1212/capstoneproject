from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    model = Booking
    fields =['id', 'user_id', 'start_time', 'date', 'number_of_players']
    depth = 1