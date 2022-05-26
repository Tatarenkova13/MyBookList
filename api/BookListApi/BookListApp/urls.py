from django.urls import re_path
from BookListApp import views

urlpatterns = [
    re_path(r'^state$', views.stateApi),
    re_path(r'^state/([0-9]+)$', views.stateApi),

    re_path(r'^genre$', views.genreApi),
    re_path(r'^genre/([0-9]+)$', views.genreApi),

    re_path(r'^book$', views.bookApi),
    re_path(r'^book/([0-9]+)$', views.bookApi),
]