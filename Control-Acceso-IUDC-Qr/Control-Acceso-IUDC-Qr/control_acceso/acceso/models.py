from django.db import models

class Estudiante(models.Model):
  nombre = models.CharField(max_length = 100)
  cedula = models.CharField(max_length = 20, unique = True, default = 'N/A')
  rostro_codificado = models.TextField()
  
  def __str__(self):
    return f"{self.nombre} - {self.cedula}"
  
class RegistroAcceso(models.Model):
  estudiante = models.ForeignKey(Estudiante, on_delete = models.CASCADE)
  fecha_entrada = models.DateTimeField(null = True, blank = True)
  fecha_salida = models.DateTimeField(null = True, blank = True)
  
  def __str__(self):
    return f"Registro de entrada {self.estudiante.nombre} - Entrada: {self.fecha_entrada}, Salida: {self.fecha_salida}"