import React, { useState, useEffect } from 'react';
import CameraComponent from './CameraComponent';
import FormComponent from './FormComponent';
import './WelcomePage.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const WelcomePage = () => {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/registro')
      .then(({ data }) => {
        console.log('Datos recibidos:', data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  const renderMode = () => {
    switch (mode) {
      case 'entrada':
      case 'salida':
        return <CameraComponent mode={mode} />;
      case 'registrar':
        return <FormComponent onBack={() => setMode(null)} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="title-container">
        <img src= "https://ww1.aulavirtualuniversitariadecolombia.co/pluginfile.php/1/theme_klassroom/logo/1732826367/thumbnail_logo-universidad_balnco40px.png" alt='logo'></img>
        <h1 className="main-title">IUDC Sistema de Control de Acceso</h1>
      </div>

      <div className="card-container">
        {!mode ? (
          <div className="card">
            <h1 className="card-title">Estudiante</h1>
            <p className="card-subtitle">Registro de alumnos</p>
            <div className="card-actions">
              <Link to='/entrada'>
                <button className="card-button" > Registro de Entrada </button>
              </Link>
              <Link to='/salida'>
                <button className="card-button" > Registro de Salida </button>
              </Link>
              <Link to='/registrar'>
                <button className="register-button" > Registrar </button>
              </Link>
            </div>
          </div>
        ) : (
          renderMode()
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
