import React, { useCallback, useEffect, useRef, useState } from 'react';
import "../styles/styles.scss";
import bancoPreguntasColoquio from '../data/bancoPreguntasColoquio.json'
import { Button, Card } from 'react-bootstrap';

export const HormigonColoquioScreen = () => {
    const cantidadPreguntas = useRef(0);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
    const seleccionPregunta = useCallback(
        (id) => {
            let pregunta = bancoPreguntasColoquio.find(pregunta => pregunta.id === id);
            if (pregunta) pregunta.activa = 1;
            let filtroActivas = bancoPreguntasColoquio.filter(pregunta => pregunta.activa === 0);
            // eslint-disable-next-line no-restricted-globals
            filtroActivas.length === 0 && location.reload();
            let indicePregunta = Math.floor(Math.random() * filtroActivas.length);
            setPreguntaSeleccionada(filtroActivas[indicePregunta]);
            cantidadPreguntas.current++;
        },
        [],
    )

    useEffect(() => {
        seleccionPregunta()
    }, [seleccionPregunta])

    return <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
            <Card
                bg={'primary'}
                key={'Primary'}
                text={'white'}
                className="mb-2 mt-2"
            >
                <Card.Header>{preguntaSeleccionada && preguntaSeleccionada.id}</Card.Header>
                <Card.Body>
                    <Card.Title>{preguntaSeleccionada && preguntaSeleccionada.pregunta} </Card.Title>
                    <Button variant="success" onClick={() => seleccionPregunta(preguntaSeleccionada.id)} className="botonPregunta"> Siguiente pregunta </Button>
                </Card.Body>
            </
            Card>
        </div>
        <div className='col-md-1'></div>
    </div>
};