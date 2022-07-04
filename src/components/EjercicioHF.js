import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import "../styles/styles.scss";
import bancoEjercicios from '../data/bancoEjercicios.json'
import { useForm } from '../hooks/useForm';


export const EjercicioHF = () => {
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState({});

    const [volumenPaston, setVolumenPaston] = useState();
    const [relacionAguaCemento, setRelacionAguaCemento] = useState();
    const [contenidoAire, setContenidoAire] = useState();
    const [dosificacionReal, setDosificacionReal] = useState();

    const [PUVTeorico, setPUVTeorico] = useState();
    const [rendimiento, setRendimiento] = useState();
    const [volumenTeorico, setVolumenTeorico] = useState();

    const [formValues, handleInputChange] = useForm();

    let timerInterval;

    const seleccionEjercicio = useCallback(() => {
        let indiceEjercicio = Math.floor(Math.random() * bancoEjercicios.length);
        let ejercicio = bancoEjercicios.filter(ejercicio => ejercicio.id === indiceEjercicio);
        setEjercicioSeleccionado(ejercicio[0]);

        ejercicio[0].kgDeCementoPaston && setVolumenPaston((ejercicio[0].kgDeCementoPaston * 1000 / ejercicio[0].cemento.pesoSSS).toFixed(2));

        if (!ejercicio[0].kgDeCementoPaston) {
            setRelacionAguaCemento(
                ((ejercicio[0].litrosAguaNoUtilizada ?
                    (ejercicio[0].dm3Paston * ejercicio[0].agua.pesoSSS / 1000) - ejercicio[0].litrosAguaNoUtilizada
                    : (ejercicio[0].dm3Paston * ejercicio[0].agua.pesoSSS / 1000))
                    / (ejercicio[0].dm3Paston * ejercicio[0].cemento.pesoSSS / 1000)).toFixed(2));

            setPUVTeorico(
                ((ejercicio[0].litrosAguaNoUtilizada ?
                    (ejercicio[0].dm3Paston * ejercicio[0].agua.pesoSSS / 1000) - ejercicio[0].litrosAguaNoUtilizada
                    : (ejercicio[0].dm3Paston * ejercicio[0].agua.pesoSSS / 1000))
                    + (ejercicio[0].dm3Paston * ejercicio[0].cemento.pesoSSS / 1000)
                    + ejercicio[0].dm3Paston * ejercicio[0].arenaFina.pesoSSS / 1000
                    + ejercicio[0].dm3Paston * ejercicio[0].arenaGruesa.pesoSSS / 1000
                    + ejercicio[0].dm3Paston * ejercicio[0].agregadoGrueso.pesoSSS / 1000).toFixed(2));

            setVolumenTeorico(
                ((ejercicio[0].litrosAguaNoUtilizada ?
                    (ejercicio[0].dm3Paston * ejercicio[0].agua.pesoSSS / 1000) - ejercicio[0].litrosAguaNoUtilizada
                    : (ejercicio[0].dm3Paston * ejercicio[0].agua.pesoSSS / 1000)) / ejercicio[0].agua.densidad
                    + (ejercicio[0].dm3Paston * ejercicio[0].cemento.pesoSSS / 1000) / ejercicio[0].cemento.densidad
                    + (ejercicio[0].dm3Paston * ejercicio[0].arenaFina.pesoSSS / 1000) / ejercicio[0].arenaFina.densidad
                    + (ejercicio[0].dm3Paston * ejercicio[0].arenaGruesa.pesoSSS / 1000) / ejercicio[0].arenaGruesa.densidad
                    + (ejercicio[0].dm3Paston * ejercicio[0].agregadoGrueso.pesoSSS / 1000) / ejercicio[0].agregadoGrueso.densidad).toFixed(2));

            PUVTeorico && setRendimiento(PUVTeorico / ejercicio[0].kgm3PUV)

            rendimiento && volumenTeorico && setContenidoAire(((rendimiento - volumenTeorico / 1000) * 100 / rendimiento).toFixed(2));
        } else {
            setValuesVT(ejercicio, (ejercicio[0].kgDeCementoPaston * 1000 / ejercicio[0].cemento.pesoSSS).toFixed(2));

        }

    },
        [PUVTeorico, rendimiento, volumenTeorico],
    )

    function setValuesVT(ejercicio, volumenPaston) {
        setRelacionAguaCemento(
            ((ejercicio[0].litrosAguaNoUtilizada ?
                (volumenPaston * ejercicio[0].agua.pesoSSS / 1000) - ejercicio[0].litrosAguaNoUtilizada
                : (volumenPaston * ejercicio[0].agua.pesoSSS / 1000))
                / (volumenPaston * ejercicio[0].cemento.pesoSSS / 1000)).toFixed(2));

        setPUVTeorico(
            ((ejercicio[0].litrosAguaNoUtilizada ?
                (volumenPaston * ejercicio[0].agua.pesoSSS / 1000) - ejercicio[0].litrosAguaNoUtilizada
                : (volumenPaston * ejercicio[0].agua.pesoSSS / 1000))
                + (volumenPaston * ejercicio[0].cemento.pesoSSS / 1000)
                + volumenPaston * ejercicio[0].arenaFina.pesoSSS / 1000
                + volumenPaston * ejercicio[0].arenaGruesa.pesoSSS / 1000
                + volumenPaston * ejercicio[0].agregadoGrueso.pesoSSS / 1000).toFixed(2));

        setVolumenTeorico(
            ((ejercicio[0].litrosAguaNoUtilizada ?
                (volumenPaston * ejercicio[0].agua.pesoSSS / 1000) - ejercicio[0].litrosAguaNoUtilizada
                : (volumenPaston * ejercicio[0].agua.pesoSSS / 1000)) / ejercicio[0].agua.densidad
                + (volumenPaston * ejercicio[0].cemento.pesoSSS / 1000) / ejercicio[0].cemento.densidad
                + (volumenPaston * ejercicio[0].arenaFina.pesoSSS / 1000) / ejercicio[0].arenaFina.densidad
                + (volumenPaston * ejercicio[0].arenaGruesa.pesoSSS / 1000) / ejercicio[0].arenaGruesa.densidad
                + (volumenPaston * ejercicio[0].agregadoGrueso.pesoSSS / 1000) / ejercicio[0].agregadoGrueso.densidad).toFixed(2));

        PUVTeorico && setRendimiento((PUVTeorico / ejercicio[0].kgm3PUV).toFixed(2));

        rendimiento && volumenTeorico && setContenidoAire(((rendimiento - volumenTeorico / 1000) * 100 / rendimiento).toFixed(2));

        console.log(volumenTeorico, ejercicio[0].kgm3PUV, rendimiento, contenidoAire);
    }

    useEffect(() => {
        seleccionEjercicio()
    }, [])

    function checkDato(ejercicioSeleccionado, dato, valor) {
        valor = parseFloat(valor);
        switch (dato) {
            case "volumenPaston":
                console.log(volumenPaston);
                return (ejercicioSeleccionado && volumenPaston === valor.toFixed(2)) ? true : false;
            case "contenidoAire":
                console.log(contenidoAire);
                return (ejercicioSeleccionado && contenidoAire === valor.toFixed(2)) ? true : false;
            case "dosificacionReal":
                console.log(dosificacionReal);
                return (ejercicioSeleccionado && dosificacionReal === valor.toFixed(2)) ? true : false;
            case "relacionAguaCemento":
                console.log(relacionAguaCemento);
                return (ejercicioSeleccionado && relacionAguaCemento === valor.toFixed(2)) ? true : false;
            default:
                break;
        }
    }

    function mostrarRespuesta(valor) {
        valor ? Swal.fire({
            icon: 'success',
            title: 'Respuesta correcta!',
            html: 'El ejercicio vuelve en <b></b> segundo(s).',
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
        })
            : Swal.fire({
                icon: 'error',
                title: 'Respuesta incorrecta',
                html: 'El ejercicio vuelve en <b></b> segundo(s).',
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
            })
    }

    return <div className='row'>
        <div className='col-md-6'>
            {ejercicioSeleccionado &&
                <div className='textoCondiciones'>
                    <h5> Pastón de {ejercicioSeleccionado.dm3Paston} dm3 nominales </h5>
                    {ejercicioSeleccionado.kgDeCementoPaston && <h5> para {ejercicioSeleccionado.kgDeCementoPaston} kg de cemento </h5>}
                    <h5> PUV = {ejercicioSeleccionado.kgm3PUV} kg/m3 </h5>
                    {ejercicioSeleccionado.litrosAguaNoUtilizada && <h5> No se utilizaron {ejercicioSeleccionado.litrosAguaNoUtilizada} l del agua teórica </h5>}
                </div>
            }

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Peso sss [kg/m3]</th>
                        <th>Densidad [kg/dm3]</th>
                        <th>Absorción [%]</th>
                        <th>Humedad [%]</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Cemento</td>
                        <td> {ejercicioSeleccionado.cemento && ejercicioSeleccionado.cemento.pesoSSS}</td>
                        <td>{ejercicioSeleccionado.cemento && ejercicioSeleccionado.cemento.densidad}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Agua</td>
                        <td>{ejercicioSeleccionado.agua && ejercicioSeleccionado.agua.pesoSSS}</td>
                        <td>{ejercicioSeleccionado.agua && ejercicioSeleccionado.agua.densidad}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    {ejercicioSeleccionado.arenaFina && <tr>
                        <td>Arena Fina</td>
                        <td>{ejercicioSeleccionado.arenaFina.pesoSSS}</td>
                        <td>{ejercicioSeleccionado.arenaFina.densidad}</td>
                        <td>{ejercicioSeleccionado.arenaFina.absorcion}</td>
                        <td>{ejercicioSeleccionado.arenaFina.humedad}</td>
                    </tr>}
                    {ejercicioSeleccionado.arenaGruesa && <tr>
                        <td>Arena Gruesa</td>
                        <td>{ejercicioSeleccionado.arenaGruesa.pesoSSS}</td>
                        <td>{ejercicioSeleccionado.arenaGruesa.densidad}</td>
                        <td>{ejercicioSeleccionado.arenaGruesa.absorcion}</td>
                        <td>{ejercicioSeleccionado.arenaGruesa.humedad}</td>
                    </tr>}
                    {ejercicioSeleccionado.agregadoGrueso && <tr>
                        <td>Agregado Grueso</td>
                        <td>{ejercicioSeleccionado.agregadoGrueso.pesoSSS}</td>
                        <td>{ejercicioSeleccionado.agregadoGrueso.densidad}</td>
                        <td>{ejercicioSeleccionado.agregadoGrueso.absorcion}</td>
                        <td>{ejercicioSeleccionado.agregadoGrueso.humedad}</td>
                    </tr>}
                    <tr>
                        <td> Aire </td>
                        <td>{ejercicioSeleccionado.aire && ejercicioSeleccionado.aire.porcentaje} </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
        <div className='col-md-6'>
            {ejercicioSeleccionado &&
                ejercicioSeleccionado.kgDeCementoPaston &&
                <div className='volumenPaston'>
                    <h5> Volumen del pastón: </h5>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder='Volumen del pastón (en dm3)'
                        name='volumenPaston'
                        value={formValues[volumenPaston]}
                        onChange={handleInputChange} />
                    <Button
                        variant='primary'
                        onClick={() => mostrarRespuesta(checkDato(ejercicioSeleccionado, "volumenPaston", formValues.volumenPaston))}
                    > Chequear respuesta </Button>
                </div>}
            <div className='relacionAguaCemento'>
                <h5> Relación agua / cemento: </h5>
                <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder='Relación agua/cemento efectiva'
                    name='relacionAguaCemento'
                    value={formValues[relacionAguaCemento]}
                    onChange={handleInputChange} />
                <Button
                    variant='primary'
                    onClick={() => mostrarRespuesta(checkDato(ejercicioSeleccionado, "relacionAguaCemento", formValues.relacionAguaCemento))}
                > Chequear respuesta </Button>
            </div>
            <div className='contenidoAire'>
                <h5> Contenido de aire: </h5>
                <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder='Contenido de aire'
                    name='contenidoAire'
                    value={formValues[contenidoAire]}
                    onChange={handleInputChange} />
                <Button
                    variant='primary'
                    onClick={() => mostrarRespuesta(checkDato(ejercicioSeleccionado, "contenidoAire", formValues.contenidoAire))}
                > Chequear respuesta </Button>
            </div>
            <div className='dosificacionReal'>
                <h5> Dosificación real para 1 m3: </h5>
                <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder='Dosificación real'
                    name='dosificacionReal'
                    value={formValues[dosificacionReal]}
                    onChange={handleInputChange} />
                <Button
                    variant='primary'
                    onClick={() => mostrarRespuesta(checkDato(ejercicioSeleccionado, "dosificacionReal", formValues.dosificacionReal))}
                > Chequear respuesta </Button>
            </div>
        </div>
    </div>
}