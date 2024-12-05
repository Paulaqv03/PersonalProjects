import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import CameraComponent from './components/CameraComponent';
import FormComponent from './components/FormComponent';
import '../src/components/WelcomePage.css';

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Router>
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/entrada' element={<CameraComponent mode="entrada"/>} />
      <Route path='/salida' element={<CameraComponent mode="salida" />} />
      <Route path='registrar' element={<FormComponent />}/>
    </Routes>
  </Router>
  //</StrictMode>,
)
