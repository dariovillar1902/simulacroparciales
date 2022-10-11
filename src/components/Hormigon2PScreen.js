import React from 'react';
import "../styles/styles.scss";
import { VoFConstituyentes2 } from './VoFConstituyentes2';
import { VoFHE2 } from './VoFHE2';
import { VoFMD } from './VoFMD';

export const Hormigon2PScreen = () => {
    return <div className='container mt-5'>
        <h1> Tecnología del Hormigón - 2° Parcial </h1>
        <hr />
        <h3> Materiales Constituyentes </h3>
        <hr />
        <VoFConstituyentes2 />
        <h3> Módulo de Deformación </h3>
        <hr />
        <VoFMD />
        <h3> Hormigón Endurecido </h3>
        <hr />
        <VoFHE2 />
    </div>;
};