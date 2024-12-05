import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = () => {
  // Estado inicial para los campos del formulario
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    documento: "",
    huella: null,
    codigoqr: null,
    rf: null,
  });

  // Manejador de cambios para los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador para archivos (huella, código QR, RF)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Guardar el archivo seleccionado
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div>
        <div className="title-container">
        <img src= "https://ww1.aulavirtualuniversitariadecolombia.co/pluginfile.php/1/theme_klassroom/logo/1732826367/thumbnail_logo-universidad_balnco40px.png" alt='logo'></img>
        <h1 className="main-title">Registro usuario</h1>
    </div>
    <div className='container-form'>
      <form onSubmit={handleSubmit}>
      <div className='container-label'>
        <label className='form-label'> Nombres: 
          <input className="form-input" type="text" name="nombres" value={formData.nombres} onChange={handleChange} /> 
        </label>
      </div>
      <div className='container-label'>
        <label className='form-label'> Apellidos:
          <input className="form-input" type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} />
        </label>
      </div>
      <div className='container-label'>
        <label className='form-label'> Documento:
          <input className="form-input" type="text" name="documento" value={formData.documento} onChange={handleChange} />
        </label>
      </div>
      <div className='container-label'>
        <label className='form-label'> Huella:
          <input className="form-input" type="file" name="huella" onChange={handleFileChange} />
        </label>
      </div>
      <div className='container-label'>
        <label className='form-label'> CódigoQR:
          <input className="form-input" type="file" name="codigoqr" onChange={handleFileChange} />
        </label>
      </div>
      <div className='container-label'>
        <label className='form-label'> RF:
          <input className="form-input" type="file" name="rf" onChange={handleFileChange} />
        </label>
      </div>
      <button className="form-button" type="submit">Enviar</button>
    </form>
    </div>
    </div>
  );
};

export default FormComponent;
