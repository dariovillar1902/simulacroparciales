import React, { useCallback, useEffect, useRef, useState } from 'react';
import "../styles/styles.scss";
import bancoPreguntasFinalAE2 from '../data/bancoPreguntasFinalAE2.json';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faStepBackward, faStepForward, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export const AE2FinalScreen = () => {
    const cantidadPreguntas = useRef(0);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    const [speechState, setSpeechState] = useState({
        isPlaying: false,
        currentIndex: 0,
        rate: 1.0,
        isPaused: false
    });

    const utteranceRef = useRef(null);

    const seleccionPregunta = useCallback(
        (id) => {
            let filtroActivas = bancoPreguntasFinalAE2.filter(pregunta => pregunta.activa === 0);
            // eslint-disable-next-line no-restricted-globals
            filtroActivas.length === 0 && location.reload();

            // If ID is provided, select specifically (rarely used in this logic but kept for compatibility)
            // Otherwise random selection
            let nuevaPregunta;
            if (id !== undefined) {
                nuevaPregunta = bancoPreguntasFinalAE2.find(p => p.id === id);
            } else {
                let indicePregunta = Math.floor(Math.random() * filtroActivas.length);
                nuevaPregunta = filtroActivas[indicePregunta];
            }

            if (nuevaPregunta) {
                // Mark as active if needed, or just select
                // Note: The original logic marked as active=1, effectively removing it from the pool.
                // kept this logic.
                nuevaPregunta.activa = 1;
                setPreguntaSeleccionada(nuevaPregunta);
                setMostrarRespuesta(false);
                cantidadPreguntas.current++;
            }
        },
        [],
    );

    // Initial load
    useEffect(() => {
        seleccionPregunta();
    }, [seleccionPregunta]);

    const stopSpeech = () => {
        if (utteranceRef.current) {
            utteranceRef.current.onend = null;
        }
        window.speechSynthesis.cancel();
        setSpeechState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    };

    const playQuestion = useCallback((index, rate) => {
        if (utteranceRef.current) {
            utteranceRef.current.onend = null;
        }
        window.speechSynthesis.cancel();

        if (index < 0 || index >= bancoPreguntasFinalAE2.length) {
            setSpeechState(prev => ({ ...prev, isPlaying: false }));
            return;
        }

        const item = bancoPreguntasFinalAE2[index];
        const textToRead = `Pregunta número ${item.id + 1}. ${item.pregunta}. Respuesta: ${item.respuesta}`;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-ES';
        utterance.rate = rate;

        utterance.onend = () => {
            setSpeechState(prev => {
                if (prev.isPlaying) {
                    const nextIndex = prev.currentIndex + 1;
                    if (nextIndex < bancoPreguntasFinalAE2.length) {
                        return { ...prev, currentIndex: nextIndex };
                    } else {
                        return { ...prev, isPlaying: false };
                    }
                }
                return prev;
            });
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, []);

    // Effect to handle playback when index, rate or playing state changes (but NOT pause state)
    useEffect(() => {
        if (speechState.isPlaying) {
            playQuestion(speechState.currentIndex, speechState.rate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speechState.currentIndex, speechState.isPlaying, speechState.rate, playQuestion]);

    const handlePlayPause = () => {
        if (speechState.isPlaying) {
            if (speechState.isPaused) {
                window.speechSynthesis.resume();
                setSpeechState(prev => ({ ...prev, isPaused: false }));
            } else {
                window.speechSynthesis.pause();
                setSpeechState(prev => ({ ...prev, isPaused: true }));
            }
        } else {
            setSpeechState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
        }
    };

    const handleStop = () => {
        stopSpeech();
        setSpeechState(prev => ({ ...prev, currentIndex: 0 }));
    };

    const handleNext = () => {
        setSpeechState(prev => ({
            ...prev,
            currentIndex: Math.min(prev.currentIndex + 1, bancoPreguntasFinalAE2.length - 1),
            isPlaying: true, // Force play on skip
            isPaused: false
        }));
    };

    const handlePrev = () => {
        setSpeechState(prev => ({
            ...prev,
            currentIndex: Math.max(prev.currentIndex - 1, 0),
            isPlaying: true, // Force play on skip
            isPaused: false
        }));
    };

    const handleSpeedChange = (e) => {
        setSpeechState(prev => ({ ...prev, rate: parseFloat(e.target.value) }));
    };


    return (
        <Container fluid className="p-4" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
                        {/* Audio Player Section */}
                        <div className="audio-player-container">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="m-0 font-weight-bold">
                                    <FontAwesomeIcon icon={faVolumeUp} className="mr-2" />
                                    Repaso de Audio
                                </h5>
                                <div className="d-flex align-items-center">
                                    <span className="mr-2 small text-uppercase font-weight-bold" style={{ opacity: 0.8 }}>Velocidad</span>
                                    <select
                                        className="speed-control"
                                        value={speechState.rate}
                                        onChange={handleSpeedChange}
                                    >
                                        <option value="0.75">0.75x</option>
                                        <option value="1">1x</option>
                                        <option value="1.25">1.25x</option>
                                        <option value="1.5">1.5x</option>
                                        <option value="2">2x</option>
                                    </select>
                                </div>
                            </div>

                            <div className="text-center mb-2">
                                <span className="badge badge-light px-3 py-2" style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                                    Pregunta {speechState.currentIndex + 1} / {bancoPreguntasFinalAE2.length}
                                </span>
                            </div>

                            <div className="player-controls">
                                <button className="control-btn" onClick={handlePrev} disabled={speechState.currentIndex === 0} title="Anterior">
                                    <FontAwesomeIcon icon={faStepBackward} />
                                </button>
                                <button className="control-btn play-pause-btn" onClick={handlePlayPause} title={speechState.isPlaying && !speechState.isPaused ? "Pausar" : "Reproducir"}>
                                    <FontAwesomeIcon icon={speechState.isPlaying && !speechState.isPaused ? faPause : faPlay} />
                                </button>
                                <button className="control-btn" onClick={handleStop} title="Detener">
                                    <FontAwesomeIcon icon={faStop} />
                                </button>
                                <button className="control-btn" onClick={handleNext} disabled={speechState.currentIndex === bancoPreguntasFinalAE2.length - 1} title="Siguiente">
                                    <FontAwesomeIcon icon={faStepForward} />
                                </button>
                            </div>
                        </div>

                        {/* Question Content Section */}
                        <div className="question-card-body">
                            <h6 className="text-uppercase text-muted letter-spacing-2 mb-3 font-weight-bold display-6" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
                                Pregunta de Examen
                            </h6>

                            <div className="question-text">
                                {preguntaSeleccionada && preguntaSeleccionada.pregunta}
                            </div>

                            <div className="d-flex justify-content-center gap-3 mt-4 mb-3">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setMostrarRespuesta(!mostrarRespuesta)}
                                    className="action-btn mx-2"
                                >
                                    {mostrarRespuesta ? "Ocultar Respuesta" : "Mostrar Respuesta"}
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => seleccionPregunta()}
                                    className="action-btn mx-2"
                                    style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', border: 'none' }}
                                >
                                    Siguiente Pregunta
                                </Button>
                            </div>

                            {mostrarRespuesta && (
                                <div className="answer-text animate__animated animate__fadeIn">
                                    <strong>Respuesta: </strong>
                                    {preguntaSeleccionada && preguntaSeleccionada.respuesta}
                                </div>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
