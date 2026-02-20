import React, { useCallback, useEffect, useRef, useState } from 'react';
import "../styles/styles.scss";
import bancoPreguntasFinalOrganizacionObra from '../data/bancoPreguntasFinalOrganizacionObra.json';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faStepBackward, faStepForward, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export const OrganizacionObraFinalScreen = () => {
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

    const [progress, setProgress] = useState(0);

    const updateProgress = useCallback(() => {
        const total = bancoPreguntasFinalOrganizacionObra.length;
        const active = bancoPreguntasFinalOrganizacionObra.filter(p => p.activa === 0).length;
        const mastered = total - active;
        setProgress((mastered / total) * 100);
    }, []);

    const seleccionPregunta = useCallback(
        (id) => {
            let filtroActivas = bancoPreguntasFinalOrganizacionObra.filter(pregunta => pregunta.activa === 0);

            if (filtroActivas.length === 0) {
                bancoPreguntasFinalOrganizacionObra.forEach(p => p.activa = 0);
                filtroActivas = bancoPreguntasFinalOrganizacionObra;
            }

            let nuevaPregunta;
            if (id !== undefined) {
                nuevaPregunta = bancoPreguntasFinalOrganizacionObra.find(p => p.id === id);
            } else {
                let indicePregunta = Math.floor(Math.random() * filtroActivas.length);
                nuevaPregunta = filtroActivas[indicePregunta];
            }

            if (nuevaPregunta) {
                // DO NOT automatically set activa=1. Wait for user feedback.
                setPreguntaSeleccionada(nuevaPregunta);
                setMostrarRespuesta(false);
                cantidadPreguntas.current++;
                updateProgress();
            }
        },
        [updateProgress],
    );

    // Initial load
    useEffect(() => {
        updateProgress();
        seleccionPregunta();
    }, [seleccionPregunta, updateProgress]);

    const handleDifficulty = (difficulty) => {
        const currentId = preguntaSeleccionada.id;
        const pregunta = bancoPreguntasFinalOrganizacionObra.find(p => p.id === currentId);

        if (pregunta) {
            if (difficulty === 'easy') {
                pregunta.activa = 1; // Mark as mastered
            } else {
                pregunta.activa = 0; // Keep in pool
            }
        }
        seleccionPregunta();
    };

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

        if (index < 0 || index >= bancoPreguntasFinalOrganizacionObra.length) {
            setSpeechState(prev => ({ ...prev, isPlaying: false }));
            return;
        }

        const item = bancoPreguntasFinalOrganizacionObra[index];
        const textToRead = `Pregunta número ${item.id}. ${item.pregunta}. Respuesta: ${item.respuesta}`;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-ES';
        utterance.rate = rate;

        utterance.onend = () => {
            setSpeechState(prev => {
                if (prev.isPlaying) {
                    const nextIndex = prev.currentIndex + 1;
                    if (nextIndex < bancoPreguntasFinalOrganizacionObra.length) {
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
            currentIndex: Math.min(prev.currentIndex + 1, bancoPreguntasFinalOrganizacionObra.length - 1),
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
                                    Pregunta {speechState.currentIndex + 1} / {bancoPreguntasFinalOrganizacionObra.length}
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
                                <button className="control-btn" onClick={handleNext} disabled={speechState.currentIndex === bancoPreguntasFinalOrganizacionObra.length - 1} title="Siguiente">
                                    <FontAwesomeIcon icon={faStepForward} />
                                </button>
                            </div>
                        </div>

                        {/* Question Content Section */}
                        <div className="question-card-body">
                            {/* Progress Bar */}
                            <div className="d-flex justify-content-between align-items-end mb-2">
                                <h6 className="text-uppercase text-muted letter-spacing-2 m-0 font-weight-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
                                    Pregunta de Examen
                                </h6>
                                <small className="text-muted font-weight-bold">Progreso: {Math.round(progress)}%</small>
                            </div>
                            <div className="progress-container mb-4">
                                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>

                            <div className="question-text" style={{ whiteSpace: 'pre-wrap' }}>
                                {preguntaSeleccionada && preguntaSeleccionada.pregunta}
                            </div>

                            <div className="d-flex justify-content-center gap-3 mt-4 mb-3 flex-wrap">
                                {!mostrarRespuesta ? (
                                    <>
                                        <Button
                                            variant="primary"
                                            onClick={() => setMostrarRespuesta(true)}
                                            className="action-btn px-5"
                                        >
                                            Mostrar Respuesta
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => handleDifficulty('hard')}
                                            className="action-btn"
                                            title="Pasar sin marcar como aprendida"
                                        >
                                            Saltar
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {/* Educational Enhancement: Self-Correction Buttons */}
                                        <Button
                                            className="confidence-btn btn-feedback-hard"
                                            onClick={() => handleDifficulty('hard')}
                                        >
                                            <span className="d-block h5 m-0 mb-1">🤔</span>
                                            Repasar
                                        </Button>
                                        <Button
                                            className="confidence-btn btn-feedback-easy"
                                            onClick={() => handleDifficulty('easy')}
                                        >
                                            <span className="d-block h5 m-0 mb-1">✅</span>
                                            Dominada
                                        </Button>
                                    </>
                                )}
                            </div>

                            {mostrarRespuesta && (
                                <div className="answer-text animate__animated animate__fadeIn" style={{ whiteSpace: 'pre-wrap' }}>
                                    <strong>Respuesta: </strong>
                                    {preguntaSeleccionada && "\n" + preguntaSeleccionada.respuesta}
                                </div>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
