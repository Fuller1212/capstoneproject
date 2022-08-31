from re import T
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import BookingSerializer
from .models import Booking


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_booking(request):
    if request.method == 'GET':
        booking = Booking.objects.filter(user_id=request.user.id)
        serializer = BookingSerializer(booking, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BookingSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])   
def get_all_bookings(request):
    if request.method == 'GET':
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)     


