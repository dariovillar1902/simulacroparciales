import React, { useCallback, useEffect, useRef, useState } from 'react';
import "../styles/styles.scss";
import bancoEjercicios from '../data/bancoEjerciciosFinalOrganizacionObra.json';
import { Button, Card, Badge } from 'react-bootstrap';

export const OrganizacionObraPracticaScreen = () => {
    const cantidadEjercicios = useRef(0);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState({});
    const [mostrarResolucion, setMostrarResolucion] = useState(false);

    const seleccionEjercicio = useCallback(
        () => {
            // Pick a random exercise
            let indice = Math.floor(Math.random() * bancoEjercicios.length);
            setEjercicioSeleccionado(bancoEjercicios[indice]);
            setMostrarResolucion(false);
            cantidadEjercicios.current++;
        },
        [],
    );

    useEffect(() => {
        seleccionEjercicio();
    }, [seleccionEjercicio]);

    return (
        <div className='row'>
            <div className='col-md-1'></div>
            <div className='col-md-10'>
                <h2 className="text-center mt-3 mb-3">Práctica - Organización y Conducción de Obras</h2>
                <Card
                    bg={'light'}
                    key={'Light'}
                    text={'dark'}
                    className="mb-2 mt-2 shadow-sm"
                >
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <span>Ejercicio #{ejercicioSeleccionado && ejercicioSeleccionado.id}</span>
                        {ejercicioSeleccionado && ejercicioSeleccionado.tema && (
                            <Badge bg="secondary">{ejercicioSeleccionado.tema}</Badge>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="mb-4">{ejercicioSeleccionado && ejercicioSeleccionado.consigna}</Card.Title>

                        <div className="d-grid gap-2 d-md-block">
                            <Button variant="primary" onClick={seleccionEjercicio} className="me-2">
                                Siguiente Ejercicio
                            </Button>
                            <Button variant="success" onClick={() => setMostrarResolucion(!mostrarResolucion)}>
                                {mostrarResolucion ? 'Ocultar Resolución' : 'Mostrar Resolución'}
                            </Button>
                        </div>

                        {mostrarResolucion && (
                            <div className="mt-4 p-3 border rounded bg-white">
                                <h5>Resolución:</h5>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{ejercicioSeleccionado && ejercicioSeleccionado.resolucion}</p>
                                {ejercicioSeleccionado.respuesta_final && (
                                    <div className="alert alert-success mt-3">
                                        <strong>Respuesta Final: </strong> {ejercicioSeleccionado.respuesta_final}
                                    </div>
                                )}
                            </div>
                        )}
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        Origen: {ejercicioSeleccionado && ejercicioSeleccionado.origen}
                    </Card.Footer>
                </Card>
            </div>
            <div className='col-md-1'></div>
        </div>
    );
};
