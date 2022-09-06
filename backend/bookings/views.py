from re import T
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import BookingSerializer
from .models import Booking
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_booking(request):
    if request.method == 'GET':
        booking = Booking.objects.filter(user_id=request.user.id)
        serializer = BookingSerializer(booking, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        print(request.data)
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

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_booking(request, pk):
    booking = get_object_or_404(Booking, pk=pk)
    if request.method == 'DELETE':
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



