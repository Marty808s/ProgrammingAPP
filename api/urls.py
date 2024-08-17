from django.urls import path, include
from .views import UserList, CodeView, LevelView, AllCodes, Login, Register, InitializeSession, Logout, LevelALL, ClearLevels, UserInfo

urlpatterns = [
    path('users', UserList.as_view()),
    path('code', CodeView.as_view()),
    path('level', LevelView.as_view()),
    path('allcodes', AllCodes.as_view()),
    path('login', Login.as_view()),
    path('register', Register.as_view()),
    path('init', InitializeSession.as_view()), #init session
    path('logout', Logout.as_view()),
    path('levelall', LevelALL.as_view()), #jen pro testy
    path('clearlevels', ClearLevels.as_view()), #jen pro testy
    path('userinfo', UserInfo.as_view())
]
