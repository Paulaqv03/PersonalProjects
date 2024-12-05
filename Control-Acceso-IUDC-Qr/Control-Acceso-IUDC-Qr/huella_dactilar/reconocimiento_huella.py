import ctypes

# Carga la librería del SDK de SecuGen (asegúrate de tener la ruta correcta)
secugen = ctypes.CDLL(
    "C:\\Users\\ADMIN\\Downloads\\FDx SDK Pro for Windows v4.3.1_J1.12\\FDx SDK Pro for Windows v4.3.1_J1.12\\FDx SDK Pro for Windows v4.3.1\\DotNET\\Bin\\x64\\SecuGen.FDxSDKPro.DotNet.Windows.dll"
)

# Inicializa el dispositivo
ret = secugen.SGFDxInit(0)
if ret != 0:
    print("Error al inicializar el dispositivo")
    exit()


# Captura una huella dactilar
def capture_fingerprint():
    # Define un buffer para la imagen capturada
    buffer = ctypes.create_string_buffer(50000)  # Tamaño del buffer puede variar
    ret = secugen.SGFDxGetImage(buffer)
    if ret != 0:
        print("Error al capturar la huella")
        return None
    return buffer.raw


# Función para comparar la huella capturada con la plantilla registrada
def compare_fingerprints(template1, template2):
    # Llama a la función del SDK que compara dos huellas
    match = ctypes.c_int(0)
    ret = secugen.SGFDxMatchTemplate(template1, template2, ctypes.byref(match))
    if ret != 0:
        print("Error al comparar las huellas")
        return False
    return match.value == 1


# Ejemplo de uso
captured_fingerprint = capture_fingerprint()
if captured_fingerprint:
    # Simula la plantilla registrada (esto debería cargarse desde tu base de datos)
    registered_template = b"..."  # Aquí debes tener la plantilla almacenada

    if compare_fingerprints(captured_fingerprint, registered_template):
        print("Huella coincidente, acceso permitido.")
    else:
        print("Huella no coincide, acceso denegado.")

# Finaliza el dispositivo
secugen.SGFDxCloseDevice()
