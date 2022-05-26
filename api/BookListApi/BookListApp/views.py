from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from BookListApp.models import States, Genres, Books
from BookListApp.serializers import StateSerializer, GenreSerializer, BookSerializer


@csrf_exempt
def stateApi(request,id=0):
    if request.method=='GET':
        states = States.objects.all()
        states_serializer=StateSerializer(states,many=True)
        return JsonResponse(states_serializer.data,safe=False)
    elif request.method=='POST':
        state_data=JSONParser().parse(request)
        states_serializer=StateSerializer(data=state_data)
        if states_serializer.is_valid():
            states_serializer.save()
            return JsonResponse("Добавлено успешно",safe=False)
        return JsonResponse("Не удалось добавить",safe=False)
    elif request.method=='PUT':
        state_data=JSONParser().parse(request)
        state=States.objects.get(StateId=state_data['StateId'])
        states_serializer=StateSerializer(state,data=state_data)
        if states_serializer.is_valid():
            states_serializer.save()
            return JsonResponse("Обновлено успешно",safe=False)
        return JsonResponse("Не удалось обновить")
    elif request.method=='DELETE':
        state=States.objects.get(StateId=id)
        state.delete()
        return JsonResponse("Удалено успешно",safe=False)

@csrf_exempt
def genreApi(request,id=0):
    if request.method=='GET':
        genres = Genres.objects.all()
        genres_serializer=GenreSerializer(genres,many=True)
        return JsonResponse(genres_serializer.data,safe=False)
    elif request.method=='POST':
        genre_data=JSONParser().parse(request)
        genres_serializer=GenreSerializer(data=genre_data)
        if genres_serializer.is_valid():
            genres_serializer.save()
            return JsonResponse("Добавлено успешно",safe=False)
        return JsonResponse("Не удалось добавить",safe=False)
    elif request.method=='PUT':
        genre_data=JSONParser().parse(request)
        genre=Genres.objects.get(GenreId=genre_data['GenreId'])
        genres_serializer=GenreSerializer(genre,data=genre_data)
        if genres_serializer.is_valid():
            genres_serializer.save()
            return JsonResponse("Обновлено успешно",safe=False)
        return JsonResponse("Не удалось обновить")
    elif request.method=='DELETE':
        genre=Genres.objects.get(GenreId=id)
        genre.delete()
        return JsonResponse("Удалено успешно",safe=False)

@csrf_exempt
def bookApi(request,id=0):
    if request.method=='GET':
        books = Books.objects.all()
        books_serializer=BookSerializer(books,many=True)
        return JsonResponse(books_serializer.data,safe=False)
    elif request.method=='POST':
        book_data=JSONParser().parse(request)
        books_serializer=BookSerializer(data=book_data)
        if books_serializer.is_valid():
            books_serializer.save()
            return JsonResponse("Добавлено успешно",safe=False)
        return JsonResponse("Не удалось добавить",safe=False)
    elif request.method=='PUT':
        book_data=JSONParser().parse(request)
        book=Books.objects.get(BookId=book_data['BookId'])
        books_serializer=BookSerializer(book,data=book_data)
        if books_serializer.is_valid():
            books_serializer.save()
            return JsonResponse("Обновлено успешно",safe=False)
        return JsonResponse("Не удалось обновить")
    elif request.method=='DELETE':
        book=Books.objects.get(BookId=id)
        book.delete()
        return JsonResponse("Удалено успешно",safe=False)