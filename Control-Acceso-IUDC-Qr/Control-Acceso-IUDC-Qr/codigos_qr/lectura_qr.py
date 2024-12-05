import cv2
import zxing

reader = zxing.BarCodeReader()

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    if not ret:
        print("No se pudo acceder a la cámara.")
        break

    cv2.imwrite("frame_temp.png", frame)
    barcode = reader.decode("frame_temp.png")

    if barcode:
        print(f"Datos del QR: {barcode.parsed}")

    cv2.imshow("Frame", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
