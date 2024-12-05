import os
import json
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import base64
from reconocimiento_facial import procesar_rostro
from .models import Estudiante

TEMP_DIR = os.path.join(settings.BASE_DIR, "temp")
os.makedirs(TEMP_DIR, exist_ok=True) 

image_filename = os.path.join(TEMP_DIR, "temp_image.png")

@csrf_exempt
def registrar_entrada(request):
    if request.method == "POST":
        print("Solicitud POST recibida")
        try:
            data = json.loads(request.body)
            image_data = data.get("image")

            if image_data:
                image_data = base64.b64decode(image_data.split(",")[1])

                with open(image_filename, "wb") as f:
                    f.write(image_data)

                resultado = procesar_rostro.procesar_imagen(image_filename, modo="entrada")
                return JsonResponse({"status": resultado})

        except Exception as e:
            return JsonResponse({"status": "Error al procesar la imagen", "error": str(e)})

    return JsonResponse({"status": "Error al registrar la entrada"})

@csrf_exempt
def registrar_salida(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            image_data = data.get("image")

            if image_data:
                image_data = base64.b64decode(image_data.split(",")[1])

                with open(image_filename, "wb") as f:
                    f.write(image_data)

                resultado = procesar_rostro.procesar_imagen(image_filename, modo="salida")

                return JsonResponse({"status": resultado})
        except Exception as e:
            return JsonResponse({"status": "Error al procesar la imagen", "error": str(e)})

    return JsonResponse({"status": "Error al registrar la salida"})


def convertir_imagen_a_base64(imagen_ruta):
    with open(imagen_ruta, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

def registrar_estudiante(nombre, cedula, imagen_ruta):
    ruta_completa = os.path.join(settings.BASE_DIR, imagen_ruta)
    
    print(f"Ruta completa de la imagen: {ruta_completa}")

    if not os.path.exists(ruta_completa):
        return f"La ruta de la imagen no existe: {ruta_completa}"

    img = procesar_rostro.load_image_file(ruta_completa)
    rostro_codificado = procesar_rostro.face_encodings(img)

    if len(rostro_codificado) > 0:
        rostro_codificado_str = ','.join(map(str, rostro_codificado[0]))
        estudiante = Estudiante(nombre=nombre, cedula=cedula, rostro_codificado=rostro_codificado_str)
        estudiante.save()
        return f"Estudiante {nombre} registrado con éxito"
    else:
        return "No se detectó ningún rostro en la imagen."


# Ruta para registrar estudiante vía API (automática)
@csrf_exempt
def registrar_estudiante_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        nombre = data.get("nombre")
        cedula = data.get("cedula")
        imagen_ruta = data.get("imagen_ruta")

        if not os.path.exists(imagen_ruta):
            return JsonResponse({"status": "Error", "message": "La ruta de la imagen no existe"})

        resultado = registrar_estudiante(nombre, cedula, imagen_ruta)
        return JsonResponse({"status": "Success", "message": resultado})
    
    return JsonResponse({"status": "Error", "message": "Método no permitido"})