import React from 'react';
import "../styles/styles.scss";
import { EjercicioHF } from './EjercicioHF';
import { VoFConstituyentes } from './VoFConstituyentes';
import { VoFHE } from './VoFHE';
import { VoFHF } from './VoFHF';

export const Hormigon1PScreen = () => {
    return <div className='container mt-5'>
        <h1> Tecnología del Hormigón - 1° Parcial </h1>
        <hr />
        <h3> Hormigón Fresco - Ejercicio </h3>
        <hr />
        <EjercicioHF />
        <h3> Hormigón Fresco </h3>
        <hr />
        <VoFHF />
        <h3> Hormigón Endurecido </h3>
        <hr />
        <VoFHE />
        <h3> Materiales Constituyentes </h3>
        <hr />
        <VoFConstituyentes />
    </div>;
};