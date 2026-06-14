import React, { useState, useEffect } from "react";
//import { useTurnos } from "../hooks/useLastTurnos";
import Navbar from "../components/Navbar";
import axios from "axios";
import { generarPDF } from "../utils/GeneratePdf";

const GenerarTurno = () => {

    const [turno, setTurno] = useState(null);
    const [tiposTurnos, setTiposTurnos] = useState([]);
    const [lastTurnos, setLastTurnos] = useState([]);

    //0_**** Necesito saber los TIPOS TURNOS ACTIVOS (GRI,CER,OTRO, etc.) _****
    useEffect(() => {

        const fetchTiposTurnos = async () => {

            try {
                const response = await axios.get("http://localhost:5000/api/tipos-turno/activos");
                setTiposTurnos(response.data);
            } catch (error) {
                console.error("Error al traer tipos:", error);
            }
        };

        // primera carga
        fetchTiposTurnos();

        // polling
        const interval = setInterval(fetchTiposTurnos, 2000);

        return () => clearInterval(interval);

    }, []);

    /******** LAST TURNOS **********/
    //const { lastTurnos, loadingLastTurnos, fetchlastTurnos, fetchTurnos } = useTurnos();


    //2_**** Necesito saber los ULTIMOS TURNOS (pendiente, finalizado, etc) de CADA TIPO (GRI,CER,OTRO, etc.) _****
    useEffect(() => {

        if (!tiposTurnos || tiposTurnos.length === 0) return;

        const fetchLastTurnos = async () => {

            try {
                const results = await Promise.all(
                    tiposTurnos.map(t =>
                        axios.get(`http://localhost:5000/api/turnos/${t.prefijo}/ultimosPrefijo`)
                    )
                );

                setLastTurnos(results.map(r => r.data));

            } catch (error) {
                console.error("Error al traer últimos turnos:", error);
            }
        };

        // primera ejecución cuando llegan los tipos
        fetchLastTurnos();  

        // polling
        const interval = setInterval(fetchLastTurnos, 4000);

        return () => clearInterval(interval);

    }, [tiposTurnos]);


    //3_**** Necesito  SUMAR un TURNO a los UTLTIMOS TURNOS del tipo q corresponda (GRI,CER,OTRO, etc.) _****
    const handleGenerarTurno = async (tipo) => {

        let j = 0;

        //recorro los distintos tipos de ultimos turnos (5 en mi caso) - esto es caso de que HAYAN TURNOS PREVIOS
        for (let i = 0; i < lastTurnos.length; i++) {

            // solo suma para el tipo de turno que haga MATCH
            if ((lastTurnos[i].data.length !== 0) && (lastTurnos[i].data[0].codigo.includes(tipo.prefijo))) 
            {
                //- guardo cod ACTUAL
                let codigoActual = '';
                codigoActual = lastTurnos[i].data[0].codigo;

                //separo cod y nro ACTUAL
                const [prefijo, numStr] = codigoActual.split("-");
                let nuevoNumero = 0;
                let nuevoCodigo = '';
                nuevoNumero = String(parseInt(numStr, 10) + 1).padStart(3, "0");
                nuevoCodigo = `${prefijo}-${nuevoNumero}`;

                //envio a guardar turno
                setTurno({
                    codigo: nuevoCodigo,
                    tipo_id: tipo.id
                });

                const res = await axios.post("http://localhost:5000/api/turnos/", {
                    codigo: nuevoCodigo,
                    tipo_id: tipo.id
                });

                alert("Su turno es: " + nuevoCodigo);

                //imprimir TURNO
                await generarPDF(nuevoCodigo);

            } else {

                //Cuento los sin match DE ESTE TIPO
                j = j + 1;
            }
        }

        //Si ninguno matchea es uno NUEVO
        if (j === lastTurnos.length) 
        {
            //iniciar de cero el contador/es
            let nuevoCodigo = '';
            nuevoCodigo = `${tipo.prefijo}-001`;

            //envio a guardar turno
            setTurno({
                codigo: nuevoCodigo,
                tipo_id: tipo.id
            });

            const res = await axios.post("http://localhost:5000/api/turnos/", {
                codigo: nuevoCodigo,
                tipo_id: tipo.id
            });

            alert("Su turno es: " + nuevoCodigo);

            //imprimir TURNO
            await generarPDF(nuevoCodigo);
        }
    };

    const CardTipo = (item) => (
        <div
            onClick={() => handleGenerarTurno(item)}
            className="card text-white shadow mb-3"
            style={{
                cursor: "pointer",
                backgroundColor: item.color,
                height: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
                borderRadius: "12px",
                transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            {item.titulo}
        </div>
    );


    return (
        <>
            <Navbar title="Turnero Digital" />
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">

                <div className="text-center" style={{ width: "400px" }}>

                    {/* 🟡 MENSAJE DE BIENVENIDA */}
                    <h2 className="mb-2 fw-bold">Bienvenido</h2>
                    <p className="mb-4 fs-5">
                        Por favor, saque su turno
                    </p>

                    {/* 🟦 OPCIONES */}
                    {tiposTurnos.map((item) => (
                        <CardTipo
                            key={item.id}
                            id={item.id}
                            titulo={item.descripcion}
                            tipo={item.codigo}
                            color={item.color}
                            prefijo={item.prefijo}
                        //onClick={() => handleGenerarTurno(item)}
                        />
                    ))}

                    {/* 🎟️ RESULTADO */}
                    {turno && (
                        <div className="alert alert-success mt-4">
                            <h1 className="display-5 fw-bold">{turno.numero}</h1>
                            <p className="mb-0">
                                Tipo: <strong>{turno.tipo_id}</strong>
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default GenerarTurno;