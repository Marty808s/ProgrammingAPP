from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('playground', index),
    path('login', index),
    path('logout', index)
]
