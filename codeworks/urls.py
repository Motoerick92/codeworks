from django.urls import path, include
from django.views.generic import RedirectView

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # chatbot
    path("get-response/", views.get_response, name="get_response"),
    # email
    path('send-email/', views.send_email, name='send_email'),
]