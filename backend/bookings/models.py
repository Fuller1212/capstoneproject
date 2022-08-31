from django.db import models
from authentication.models import User



class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.TimeField()
    date = models.DateField()
    number_of_players = models.IntegerField(max_length = 5)
    
