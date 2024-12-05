from django.urls import path
from .views import registrar_entrada, registrar_salida, registrar_estudiante_view

urlpatterns = [
    path('registrar-entrada/', registrar_entrada, name='registrar_entrada'),
    path('registrar-salida/', registrar_salida, name='registrar_salida'),
    path('registrar-estudiante/', registrar_estudiante_view, name='registrar_estudiante'),
]
