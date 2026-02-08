import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Hormigon1PScreen } from '../components/Hormigon1PScreen';
import { Hormigon2PScreen } from '../components/Hormigon2PScreen';
import { HormigonColoquioScreen } from '../components/HormigonColoquioScreen';
import { Navbar } from '../components/NavBar';
import { HidraulicaFinalScreen } from '../components/HidraulicaFinalScreen';
import { Puertos1PScreen } from '../components/Puertos1PScreen';
import { MetalicasFinalScreen } from '../components/MetalicasFinalScreen';
import { FerrocarrilesFinalScreen } from '../components/FerrocarrilesFinalScreen';
import { Puertos2PScreen } from '../components/Puertos2PScreen';
import { AE2FinalScreen } from '../components/AE2FinalScreen';
import { PuertosFinalScreen } from '../components/PuertosFinalScreen';
import { OrganizacionObraFinalScreen } from '../components/OrganizacionObraFinalScreen';
import { OrganizacionObraPracticaScreen } from '../components/OrganizacionObraPracticaScreen';

export const DashboardRoutes = () => {
  return <>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path="/" element={<Hormigon1PScreen />} />
        <Route path="/tdh/1P" element={<Hormigon1PScreen />} />
        <Route path="/tdh/2P" element={<Hormigon2PScreen />} />
        <Route path="/tdh/Coloquio" element={<HormigonColoquioScreen />} />
        <Route path="/hidraulica/final" element={<HidraulicaFinalScreen />} />
        <Route path='/pyvn/1P' element={<Puertos1PScreen />} />
        <Route path='/pyvn/2P' element={<Puertos2PScreen />} />
        <Route path='/pyvn/final' element={<PuertosFinalScreen />} />
        <Route path='/metalicas/final' element={<MetalicasFinalScreen />} />
        <Route path='/ferrocarriles/final' element={<FerrocarrilesFinalScreen />} />
        <Route path='/ae2/final' element={<AE2FinalScreen />} />
        <Route path='/organizacion-obras/final-teoria' element={<OrganizacionObraFinalScreen />} />
        <Route path='/organizacion-obras/final-practica' element={<OrganizacionObraPracticaScreen />} />
      </Routes>
    </div>
  </>;
};
