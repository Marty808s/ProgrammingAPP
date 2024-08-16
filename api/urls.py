from django.urls import path, include
from .views import UserList, CodeView, LevelView, AllCodes, Login, Register, InitializeSession, Logout

urlpatterns = [
    path('users', UserList.as_view()),
    path('code', CodeView.as_view()),
    path('level', LevelView.as_view()),
    path('allcodes', AllCodes.as_view()),
    path('login', Login.as_view()),
    path('register', Register.as_view()),
    path('init', InitializeSession.as_view()),
    path('logout', Logout.as_view())
]
