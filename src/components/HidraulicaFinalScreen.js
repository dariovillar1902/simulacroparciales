import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/styles.scss";
import bancoPreguntasFinalHidraulica from "../data/bancoPreguntasFinalHidraulica.json";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faForward, faX } from "@fortawesome/free-solid-svg-icons";

export const HidraulicaFinalScreen = () => {
  const [unidades, setUnidades] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const cantidadPreguntas = useRef(0);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
  const cantidadCorrectas = useRef(0);
  const cantidadIncorrectas = useRef(0);
  const cantidadSkipeadas = useRef(0);
  const correctasPorUnidad = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const incorrectasPorUnidad = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const skipeadasPorUnidad = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const seleccionPregunta = (preguntasActivas) => {
    let filtroActivas = preguntasActivas.filter(
      (pregunta) => pregunta.activa === 0
    );
    // eslint-disable-next-line no-restricted-globals
    filtroActivas.length === 0 && location.reload();
    let indicePregunta = Math.floor(Math.random() * filtroActivas.length);
    setPreguntaSeleccionada(filtroActivas[indicePregunta]);
    cantidadPreguntas.current++;
  };

  const marcarPreguntaInactiva = (id, valor, unidad) => {
    switch (valor) {
      case 0:
        cantidadCorrectas.current++;
        correctasPorUnidad.current[unidad - 1]++;
        break;

      case 1:
        cantidadIncorrectas.current++;
        incorrectasPorUnidad.current[unidad - 1]++;
        break;

      case 2:
        cantidadSkipeadas.current++;
        skipeadasPorUnidad.current[unidad - 1]++;
        break;

      default:
        break;
    }
    let preguntasActivas = bancoPreguntasFinalHidraulica.filter((pregunta) =>
      unidades.includes(pregunta.unidad)
    );
    let pregunta = preguntasActivas.find((pregunta) => pregunta.id === id);
    if (pregunta) pregunta.activa = 1;
    seleccionPregunta(preguntasActivas);
  };

  const checkUnidades = useCallback((unidades) => {
    let preguntasActivas = bancoPreguntasFinalHidraulica.filter((pregunta) =>
      unidades.includes(pregunta.unidad)
    );
    seleccionPregunta(preguntasActivas);
  }, []);

  useEffect(() => {
    const unidades = JSON.parse(localStorage.getItem("Unidades"));
    if (unidades) {
      setUnidades(unidades);
      checkUnidades(unidades);
    } else {
      setUnidades([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      checkUnidades([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
    localStorage.removeItem("Unidades");
    return () => {
      setUnidades([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    };
  }, [checkUnidades]);

  useEffect(() => {
    let unidadesSorted = unidades.sort(compareNumbers);
    localStorage.setItem("Unidades", JSON.stringify(unidadesSorted));
    if (unidades.length === 0) {
      setUnidades([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
  }, [unidades]);

  function compareNumbers(a, b) {
    return a - b;
  }

  return (
    <>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          <Card
            bg={"primary"}
            key={"Primary"}
            text={"white"}
            className="mb-2 mt-2"
          >
            <Card.Header>
              {preguntaSeleccionada &&
                preguntaSeleccionada.id +
                  " - Unidad " +
                  preguntaSeleccionada.unidad}
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {preguntaSeleccionada && preguntaSeleccionada.pregunta}{" "}
              </Card.Title>
              <Button
                variant="success"
                onClick={() =>
                  marcarPreguntaInactiva(
                    preguntaSeleccionada.id,
                    0,
                    preguntaSeleccionada.unidad
                  )
                }
                className="botonPregunta"
              >
                {" "}
                <FontAwesomeIcon icon={faCheck} /> Correcta{" "}
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  marcarPreguntaInactiva(
                    preguntaSeleccionada.id,
                    1,
                    preguntaSeleccionada.unidad
                  )
                }
                className="botonPregunta"
              >
                {" "}
                <FontAwesomeIcon icon={faX} /> Incorrecta{" "}
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  marcarPreguntaInactiva(
                    preguntaSeleccionada.id,
                    2,
                    preguntaSeleccionada.unidad
                  )
                }
                className="botonPregunta"
              >
                {" "}
                <FontAwesomeIcon icon={faForward} /> Siguiente pregunta{" "}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          <Form className="formUnidades">
            <Row className="mb-2 mt-2">
              <Col
                md={3}
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label> Incluir unidades: </Form.Label>
              </Col>
              <Col
                md={9}
                className="d-flex justify-content-center align-items-center"
              >
                {["checkbox"].map((type) => (
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 1)
                          );
                        } else {
                          setUnidades([...unidades, 1]);
                        }
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 2)
                          );
                        } else {
                          setUnidades([...unidades, 2]);
                        }
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 3)
                          );
                        } else {
                          setUnidades([...unidades, 3]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 4)
                          );
                        } else {
                          setUnidades([...unidades, 4]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 5)
                          );
                        } else {
                          setUnidades([...unidades, 5]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 6)
                          );
                        } else {
                          setUnidades([...unidades, 6]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 7)
                          );
                        } else {
                          setUnidades([...unidades, 7]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 8)
                          );
                        } else {
                          setUnidades([...unidades, 8]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 9)
                          );
                        } else {
                          setUnidades([...unidades, 9]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 10)
                          );
                        } else {
                          setUnidades([...unidades, 10]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 11)
                          );
                        } else {
                          setUnidades([...unidades, 11]);
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
                          setUnidades(
                            unidades.filter((unidad) => unidad !== 12)
                          );
                        } else {
                          setUnidades([...unidades, 12]);
                        }
                      }}
                    />
                  </div>
                ))}
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row className="mb-2 mt-2">
        <Col md={1}></Col>
        <Col md={10} className="d-flex justify-content-around">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#3cc34c", marginRight: "10px" }}
                />{" "}
                {" Correctas: " +
                  cantidadCorrectas.current +
                  "/" +
                  (cantidadPreguntas.current - 1)}
              </Accordion.Header>
              <Accordion.Body>
                {unidades.map((unidad) => {
                  return (
                    <>
                      <p>
                        {" "}
                        Unidad {unidad}:{" "}
                        {correctasPorUnidad.current[unidad - 1]}{" "}
                      </p>
                      <hr />
                    </>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <FontAwesomeIcon
                  icon={faX}
                  style={{ color: "#c33c3c", marginRight: "10px" }}
                />{" "}
                {" Incorrectas: " +
                  cantidadIncorrectas.current +
                  "/" +
                  (cantidadPreguntas.current - 1)}
              </Accordion.Header>
              <Accordion.Body>
                {unidades.map((unidad) => {
                  return (
                    <>
                      <p>
                        {" "}
                        Unidad {unidad}:{" "}
                        {incorrectasPorUnidad.current[unidad - 1]}{" "}
                      </p>
                      <hr />
                    </>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                {" "}
                <FontAwesomeIcon
                  icon={faForward}
                  style={{ color: "#3e3cc3", marginRight: "10px" }}
                />{" "}
                {" Salteadas: " +
                  cantidadSkipeadas.current +
                  "/" +
                  (cantidadPreguntas.current - 1)}
              </Accordion.Header>
              <Accordion.Body>
                {unidades.map((unidad) => {
                  return (
                    <>
                      <p>
                        {" "}
                        Unidad {unidad}:{" "}
                        {skipeadasPorUnidad.current[unidad - 1]}{" "}
                      </p>
                      <hr />
                    </>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={1}></Col>
      </Row>
    </>
  );
};
