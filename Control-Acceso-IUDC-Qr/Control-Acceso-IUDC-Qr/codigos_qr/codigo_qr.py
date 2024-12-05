import qrcode

estudiante = "Daniel Bastidas"

qr = qrcode.QRCode(version=1, box_size=10, border=5)
qr.add_data(estudiante)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save(".\codigos_qr\codigos_generados\codigo_qr.png")
