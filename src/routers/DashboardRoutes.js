import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Hormigon1PScreen } from '../components/Hormigon1PScreen';
import { Hormigon2PScreen } from '../components/Hormigon2PScreen';
import { HormigonColoquioScreen } from '../components/HormigonColoquioScreen';
import { Navbar } from '../components/NavBar';

export const DashboardRoutes = () => {
  return <>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path="/" element={<Hormigon1PScreen />} />
        <Route path="/tdh/1P" element={<Hormigon1PScreen />} />
        <Route path="/tdh/2P" element={<Hormigon2PScreen />} />
        <Route path="/tdh/Coloquio" element={<HormigonColoquioScreen />} />
      </Routes>
    </div>
  </>;
};
