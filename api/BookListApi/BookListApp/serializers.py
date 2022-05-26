from rest_framework import serializers
from BookListApp.models import States, Genres, Books

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model=States
        fields=('StateId','StateName')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Genres
        fields=('GenreId','GenreName')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model=Books 
        fields=('BookId','BookName','BookAuthor','Genre','BookStatus')