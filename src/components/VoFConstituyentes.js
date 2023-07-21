import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import bancoPreguntas from '../data/bancoPreguntas.json'
import Swal from 'sweetalert2';
import "../styles/styles.scss";

export const VoFConstituyentes = () => {
    const cantidadPreguntas = useRef(0);
    const cantidadCorrectas = useRef(0);
    const cantidadIncorrectas = useRef(0);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
    const [respuestasIncorrectas, setRespuestasIncorrectas] = useState([]);
    let timerInterval;

    const seleccionPregunta = useCallback(
        () => {
            let filtroConstituyentes = bancoPreguntas.filter(pregunta => pregunta.unidad === 'Materiales Constituyentes');
            let indicePregunta = Math.floor(Math.random() * filtroConstituyentes.length);
            setPreguntaSeleccionada(filtroConstituyentes[indicePregunta]);
        },
        [],
    )

    useEffect(() => {
        seleccionPregunta()
    }, [seleccionPregunta])


    function checkPregunta(preguntaSeleccionada, valor) {
        (preguntaSeleccionada && preguntaSeleccionada.respuesta === valor)
            ? Swal.fire({
                icon: 'success',
                title: 'Respuesta correcta!',
                html: 'Próxima pregunta en <b></b> segundo(s).',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Math.round(Swal.getTimerLeft() / 1000);
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                cantidadPreguntas.current++
                cantidadCorrectas.current++
                seleccionPregunta()
            })
            : Swal.fire({
                icon: 'error',
                title: 'Respuesta incorrecta',
                html: 'Próxima pregunta en <b></b> segundo(s).',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Math.round(Swal.getTimerLeft() / 1000);
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                cantidadPreguntas.current++
                cantidadIncorrectas.current++
                seleccionPregunta()
                agregarIncorrecta(preguntaSeleccionada)
            })
    }

    function agregarIncorrecta(pregunta) {
        respuestasIncorrectas.push(pregunta);
    }

    return <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-5'>
            <Card
                bg={'warning'}
                key={'Warning'}
                text={'white'}
                style={{ width: '20rem' }}
                className="mb-2"
            >
                <Card.Header>{preguntaSeleccionada && preguntaSeleccionada.unidad}</Card.Header>
                <Card.Body>
                    <Card.Title>{preguntaSeleccionada && preguntaSeleccionada.pregunta} </Card.Title>
                    <Button variant="success" onClick={() => checkPregunta(preguntaSeleccionada, "V")} className="botonPregunta"> Verdadero </Button>
                    <Button variant="danger" onClick={() => checkPregunta(preguntaSeleccionada, "F")} className="botonPregunta"> Falso </Button>
                </Card.Body>
            </Card>
        </div>
        <div className='col-md-5'>
            <h5> Correctas: {cantidadCorrectas.current} / {cantidadPreguntas.current} </h5>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b> Ver respuestas incorrectas </b></Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            {respuestasIncorrectas.map(pregunta => {
                                return <li key={pregunta.id}> {pregunta.pregunta}: {pregunta.respuesta === 'V' ? <p className='text-success'>VERDADERO</p> : <p className='text-danger'>FALSO</p>} </li>
                            })}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
        <div className='col-md-1'></div>
    </div>
}