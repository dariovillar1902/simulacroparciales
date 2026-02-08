import React, { useCallback, useEffect, useRef, useState } from 'react';
import "../styles/styles.scss";
import bancoPreguntasFinalOrganizacionObra from '../data/bancoPreguntasFinalOrganizacionObra.json';
import { Button, Card } from 'react-bootstrap';

export const OrganizacionObraFinalScreen = () => {
    const cantidadPreguntas = useRef(0);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    const seleccionPregunta = useCallback(
        (id) => {
            let pregunta = bancoPreguntasFinalOrganizacionObra.find(pregunta => pregunta.id === id);
            if (pregunta) pregunta.activa = 1;
            let filtroActivas = bancoPreguntasFinalOrganizacionObra.filter(pregunta => pregunta.activa === 0);
            // eslint-disable-next-line no-restricted-globals
            if (filtroActivas.length === 0) {
                // Reset questions if all are used, or handle as needed. 
                // For now, reloading as per other screens (though a reset button or state reset is better UX)
                // location.reload(); 
                // Simple reset for now to avoid reload loop if only 1 question
                bancoPreguntasFinalOrganizacionObra.forEach(p => p.activa = 0);
                filtroActivas = bancoPreguntasFinalOrganizacionObra;
            }

            let indicePregunta = Math.floor(Math.random() * filtroActivas.length);
            setPreguntaSeleccionada(filtroActivas[indicePregunta]);
            setMostrarRespuesta(false);
            cantidadPreguntas.current++;
        },
        [],
    );

    useEffect(() => {
        seleccionPregunta();
    }, [seleccionPregunta]);

    return (
        <div className='row'>
            <div className='col-md-1'></div>
            <div className='col-md-10'>
                <Card
                    bg={'primary'}
                    key={'Primary'}
                    text={'white'}
                    className="mb-2 mt-2"
                >
                    <Card.Header>Pregunta #{preguntaSeleccionada && preguntaSeleccionada.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>{preguntaSeleccionada && preguntaSeleccionada.pregunta}</Card.Title>
                        <Button variant="success" onClick={() => seleccionPregunta(preguntaSeleccionada.id)} className="botonPregunta">
                            Siguiente pregunta
                        </Button>
                        <Button variant="info" onClick={() => setMostrarRespuesta(true)} className="ml-2">
                            Mostrar respuesta
                        </Button>
                        {mostrarRespuesta && (
                            <Card.Text className="mt-2">
                                {preguntaSeleccionada && preguntaSeleccionada.respuesta}
                            </Card.Text>
                        )}
                    </Card.Body>
                </Card>
            </div>
            <div className='col-md-1'></div>
        </div>
    );
};
