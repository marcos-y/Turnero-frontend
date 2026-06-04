import React, { useEffect, useRef } from "react";
import { useTurnos } from "../hooks/useTurnos";
//import { useTurnosVisor } from "../hooks/useTurnosVisor";

const VerTurnos = () => {

    /*********** TURNOS **********/
    const { turnos, turnosPosterior, fetchTurnos, fetchTurnosPosterior } = useTurnos();
    //const { turnosVisor, turnosPosterior, fetchTurnosVisor, fetchTurnosPosterior } = useTurnosVisor();

    const prevA = useRef([]);
    const prevB = useRef([]);

    const getColor = (tipo) => {

        // 🔴 si es el turno activo
        if (tipo.estado === 'en_atencion') {
            return {
                bg: "bg-danger"
                //shadow: "0 0 20px rgba(220,53,69,0.6)"
            };
        }

    };

    useEffect(() => {
        //fetchTurnosVisor();
        fetchTurnos();
        fetchTurnosPosterior();

        const interval1 = setInterval(() => {
            //fetchTurnosVisor();
            fetchTurnos();
        }, 5000); // cada 5 segundos

        const interval2 = setInterval(() => {
            fetchTurnosPosterior();
        }, 7000); // cada 7 segundos

        return () => clearInterval(interval1)
        return () => clearInterval(interval2)
    }, []);

    
    useEffect(() => {

        const huboCambioA = turnos.some(a => {
            const old = prevA.current.find(p => p.id === a.id);
            return old && old.estado !== a.estado;
        });

        const huboCambioB = turnosPosterior.some(b => {
            const old = prevB.current.find(p => p.id === b.id);
            return old && old.estado !== b.estado;
        });

        if (huboCambioB) {
            const audio = new Audio("/audio/sound.mp3");
            audio.play().catch(() => { });
        }

        // actualizar referencias
        prevA.current = turnos;
        prevB.current = turnosPosterior;

    }, [turnos, turnosPosterior]);

    return (
        <>
            <div
                className="bg-dark text-white d-flex flex-column justify-content-start"
                style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
            >

                {/* CONTENIDO PRINCIPAL */}
                <div className="flex-grow-1 d-flex flex-column justify-content-start">
                    <div className="row m-0 h-100">

                        {/* 🧾 LADO IZQUIERDO - TURNOS */}
                        {/*<div className="col-md-6 d-flex flex-column">*/}
                        <div className="d-flex flex-column">           
                            <div className="row text-center fw-bold border-bottom pb-3 mb-4 fs-3"
                                style={{
                                    backgroundColor: 'rgb(247, 224, 23)',
                                    fontFamily: "Inter",
                                    color: 'black',
                                    fontSize:'14px'
                                }}>
                                <div className="col-4">Box</div>
                                <div className="col-4">Turno</div>
                                <div className="col-4">Tipo</div>
                            </div>

                            {turnos.map((t, index) => {

                                const color = getColor(t);
                                const esActivo = t.estado === 'en_atencion';

                                return (
                                    <div key={index} className="row text-center mb-4">

                                        {/* BOX */}
                                        <div className="col-4">
                                            <div
                                                className="border border-dark rounded d-flex align-items-center justify-content-center fw-bold text-black"
                                                style={{
                                                    backgroundColor: 'rgb(247, 224, 23)',
                                                    height: (turnos.length === 1 || turnos.length === 2) ? "40vh" : (turnos.length === 3) ? "25vh" : ((turnos.length === 4) ? "20vh" : "16vh"),
                                                    fontFamily: "Inter",
                                                    fontSize: "2.5rem"
                                                }}
                                            >
                                                {t.box_id === null ? 'sin Box' : t.box_id}
                                            </div>
                                        </div>

                                        {/* TURNO */}
                                        <div className="col-4">
                                            <div
                                                className="rounded d-flex align-items-center justify-content-center fw-bold text-white"
                                                style={{
                                                    height: (turnos.length === 1 || turnos.length === 2) ? "40vh" : (turnos.length === 3) ? "25vh" : ((turnos.length === 4) ? "20vh" : "16vh"),
                                                    fontSize: "3rem",
                                                    letterSpacing: "3px",
                                                    backgroundColor: esActivo ? "rgb(222, 59, 33)" : "#0dcaf0",
                                                    boxShadow: esActivo
                                                        ? "0 0 25px rgba(220,53,69,0.8)"
                                                        : "0 0 20px rgba(13,202,240,0.5)",
                                                    transition: "all 0.3s ease"
                                                }}
                                            >
                                                {t.codigo}
                                            </div>
                                        </div>

                                        {/* TIPO TURNO */}
                                        <div className="col-4">
                                            <div
                                                className={`${t.estado === 'en_atencion' ? color.bg : ''} rounded d-flex align-items-center justify-content-center fw-bold text-white`}
                                                style={{
                                                    height: (turnos.length === 1 || turnos.length === 2) ? "40vh" : (turnos.length === 3) ? "25vh" : ((turnos.length === 4) ? "20vh" : "16vh"),
                                                    fontFamily: "Inter",
                                                    fontSize: "3rem",
                                                    //boxShadow: color.shadow,
                                                    transition: "all 0.3s ease",
                                                    backgroundColor: t.color
                                                }}
                                            >
                                                {t.descripcion === null ? 'sin Tipo' : t.descripcion}
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                        {/* 🎥 LADO DERECHO - VIDEO */}
                        {/*
                        <div className="col-md-6 d-flex align-items-center justify-content-center bg-black">
                            <div className="w-100 h-100 p-2">
                                <video
                                    className="w-100 h-100 rounded shadow"
                                    style={{ objectFit: "cover" }}
                                    autoPlay
                                    loop
                                    muted
                                >
                                    <source src="/publicidad_2.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                        */}

                    </div>
                </div>

            </div>
            {/* 📢 BARRA INFERIOR */}
            <div className="text-dark py-2" style={{ backgroundColor: 'rgb(247, 224, 23)', fontFamily: "Inter" }}>
                <div className="overflow-hidden">
                    <div className="scroll-text fw-bold fs-5">
                        🔔 Descuentos especiales hoy | 20% OFF en servicios seleccionados | Consulte en caja 🔔
                    </div>
                </div>
            </div>

            {/* ANIMACIÓN CSS */}
            <style>
                {`
          .scroll-text {
            display: inline-block;
            white-space: nowrap;
            animation: scroll-left 15s linear infinite;
          }

          @keyframes scroll-left {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
            </style>
        </>
    );
};

export default VerTurnos;