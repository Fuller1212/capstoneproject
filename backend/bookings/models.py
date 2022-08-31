from django.db import models
from authentication.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.TimeField()
    date = models.DateField()
    number_of_players = models.IntegerField(default=1,validators=[MaxValueValidator(5),MinValueValidator(1)])
    
