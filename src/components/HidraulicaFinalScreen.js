import React, { useCallback, useEffect, useRef, useState } from 'react';
import "../styles/styles.scss";
import bancoPreguntasFinalHidraulica from '../data/bancoPreguntasFinalHidraulica.json'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

export const HidraulicaFinalScreen = () => {
    const [unidades, setUnidades] = useState([]);
    const cantidadPreguntas = useRef(0);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
    const seleccionPregunta = useCallback(
        (id) => {
            let pregunta = bancoPreguntasFinalHidraulica.find(pregunta => pregunta.id === id);
            if (pregunta) pregunta.activa = 1;
            let filtroActivas = bancoPreguntasFinalHidraulica.filter(pregunta => pregunta.activa === 0);
            console.log(filtroActivas);
            console.log(unidades);
            let filtroUnidades = filtroActivas.filter(pregunta => unidades.includes(pregunta.unidad));
            console.log(filtroUnidades);
            // eslint-disable-next-line no-restricted-globals
            filtroActivas.length === 0 && location.reload();
            let indicePregunta = Math.floor(Math.random() * filtroActivas.length);
            setPreguntaSeleccionada(filtroActivas[indicePregunta]);
            cantidadPreguntas.current++;
        },
        [],
    )

    useEffect(() => {
        const unidades = JSON.parse(localStorage.getItem('Unidades'));
        if (unidades) {
            setUnidades(unidades);
            seleccionPregunta();
        } else {
            setUnidades([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
            seleccionPregunta();
        }
        localStorage.removeItem("Unidades");
    }, [seleccionPregunta])

    useEffect(() => {
        localStorage.setItem('Unidades', JSON.stringify(unidades));
    }, [unidades]);

    return (
        <>
            <Row>
                <Col md={1}>
                </Col>
                <Col md={10}>
                    <Card
                        bg={'primary'}
                        key={'Primary'}
                        text={'white'}
                        className="mb-2 mt-2"
                    >
                        <Card.Header>{preguntaSeleccionada && preguntaSeleccionada.id + ' - Unidad ' + preguntaSeleccionada.unidad}</Card.Header>
                        <Card.Body>
                            <Card.Title>{preguntaSeleccionada && preguntaSeleccionada.pregunta} </Card.Title>
                            <Button variant="success" onClick={() => seleccionPregunta(preguntaSeleccionada.id)}> Correcta </Button>
                            <Button variant="danger" onClick={() => seleccionPregunta(preguntaSeleccionada.id)}> Incorrecta </Button>
                            <Button variant="secondary" onClick={() => seleccionPregunta(preguntaSeleccionada.id)}> Siguiente pregunta </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <Form className="formUnidades">
                        <Row className='mb-2 mt-2'>
                            <Col md={2} className='d-flex justify-content-center align-items-center'>
                                <Form.Label> Incluir unidades: </Form.Label>
                            </Col>
                            <Col md={7} className='d-flex justify-content-center align-items-center'>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                            checked={unidades.includes(1)}
                                            onChange={() => {
                                                if (unidades.includes(1)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 1))
                                                } else {
                                                    setUnidades([...unidades, 1])
                                                }
                                                console.log(unidades);
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            checked={unidades.includes(2)}
                                            onChange={() => {
                                                if (unidades.includes(2)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 2))
                                                } else {
                                                    setUnidades([...unidades, 2])
                                                }
                                                console.log(unidades);
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(3)}
                                            onChange={() => {
                                                if (unidades.includes(3)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 3))
                                                } else {
                                                    setUnidades([...unidades, 3])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="4"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(4)}
                                            onChange={() => {
                                                if (unidades.includes(4)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 4))
                                                } else {
                                                    setUnidades([...unidades, 4])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="5"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(5)}
                                            onChange={() => {
                                                if (unidades.includes(5)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 5))
                                                } else {
                                                    setUnidades([...unidades, 5])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="6"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(6)}
                                            onChange={() => {
                                                if (unidades.includes(6)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 6))
                                                } else {
                                                    setUnidades([...unidades, 6])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="7"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(7)}
                                            onChange={() => {
                                                if (unidades.includes(7)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 7))
                                                } else {
                                                    setUnidades([...unidades, 7])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="8"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(8)}
                                            onChange={() => {
                                                if (unidades.includes(8)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 8))
                                                } else {
                                                    setUnidades([...unidades, 8])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="9"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(9)}
                                            onChange={() => {
                                                if (unidades.includes(9)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 9))
                                                } else {
                                                    setUnidades([...unidades, 9])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="10"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(10)}
                                            onChange={() => {
                                                if (unidades.includes(10)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 10))
                                                } else {
                                                    setUnidades([...unidades, 10])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="11"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(11)}
                                            onChange={() => {
                                                if (unidades.includes(11)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 11))
                                                } else {
                                                    setUnidades([...unidades, 11])
                                                }
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="12"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={unidades.includes(12)}
                                            onChange={() => {
                                                if (unidades.includes(12)) {
                                                    setUnidades(unidades.filter(unidad => unidad !== 12))
                                                } else {
                                                    setUnidades([...unidades, 12])
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                            </Col>
                            <Col md={3} className='d-flex justify-content-center align-items-center'>
                                <Button variant="primary" type="submit">
                                    Guardar
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Col>
                <Col md={1}></Col>
            </Row>
        </>
    )
};