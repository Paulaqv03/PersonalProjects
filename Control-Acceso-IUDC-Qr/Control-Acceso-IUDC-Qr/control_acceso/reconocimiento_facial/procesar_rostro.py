import os
import face_recognition
from datetime import datetime

empleados_path = ".\\reconocimiento_facial\\empleados"

imagenes_empleados = []
nombres_empleados = []

for filename in os.listdir(empleados_path):
    img = face_recognition.load_image_file(f"{empleados_path}/{filename}")
    
    img_enc = face_recognition.face_encodings(img)
    
    if len(img_enc) > 0:
        imagenes_empleados.append(img_enc[0])
        nombre = os.path.splitext(filename)[0]
        nombres_empleados.append(nombre)
    else:
        print(f"No se detectó ningún rostro en {filename}")


def procesar_imagen(image_path, modo):
    img = face_recognition.load_image_file(image_path)
    rostros_ubicacion = face_recognition.face_locations(img)
    rostros_codificados = face_recognition.face_encodings(img, rostros_ubicacion)

    for rostro_codificado in rostros_codificados:
        coincidencias = face_recognition.compare_faces(imagenes_empleados, rostro_codificado)
        
        if True in coincidencias:
            index = coincidencias.index(True)
            nombre = nombres_empleados[index]

            with open(f"registro_{modo}.txt", "a") as archivo:
                archivo.write(f"{nombre} - {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
            
            return f"{modo.capitalize()} registrada para {nombre}"
    
    return "No se pudo reconocer el rostro"
