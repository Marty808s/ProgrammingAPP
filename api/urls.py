from django.urls import path, include
from .views import UserList, CodeView, LevelView, AllCodes

urlpatterns = [
    path('users', UserList.as_view()),
    path('code', CodeView.as_view()),
    path('level', LevelView.as_view()),
    path('allcodes', AllCodes.as_view())
]
