import { useEffect, useRef } from 'react';
import axios from 'axios';

const CameraComponent = ({ mode }) => {
  const videoRef = useRef(null); // Referencia al video

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      } catch (error) {
        console.error('Error accessing the camera', error);
      }
    };

    startCamera();
  }, []);

  const handleCapture = async () => {
    console.log("Capturando Imagen...")
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const image = canvas.toDataURL('image/png'); // Convertir a base64
    
    try {
      const response = await axios.post(
        mode === 'entrada' ? 'http://localhost:8000/acceso/registrar-entrada/' : 'http://localhost:8000/acceso/registrar-salida/',
        { image }, // Enviar la imagen al servidor
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      alert(response.data.status); // Ver el resultado del servidor
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <div>
      <h2>{mode === 'entrada' ? 'Registro de Entrada' : 'Registro de Salida'}</h2>
      <video ref={videoRef} style={{ width: '100%', maxHeight: '300px' }}></video>
      <button onClick={handleCapture}>Registrar {mode === 'entrada' ? 'Entrada' : 'Salida'}</button>
    </div>
  );
};

export default CameraComponent;
