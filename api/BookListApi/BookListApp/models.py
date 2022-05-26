from django.db import models

class States(models.Model):
    StateId = models.AutoField(primary_key=True)
    StateName = models.CharField(max_length=500)

class Genres(models.Model):
    GenreId = models.AutoField(primary_key=True)
    GenreName = models.CharField(max_length=500)

class Books(models.Model):
    BookId = models.AutoField(primary_key=True)
    BookName = models.CharField(max_length=500)
    BookAuthor = models.CharField(max_length=500)
    Genre = models.CharField(max_length=500)
    BookStatus = models.CharField(max_length=500)