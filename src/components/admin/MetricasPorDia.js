const MetricasPorDia = (props) => {

    {/*
    if (loadingMetricasPorDia) {
        return <p>Cargando métricas...</p>;
    }
    if (error) {
        return <p>Error cargando métricas</p>;
    }
    */}

    function segundosAHumano(segundos) {

        const minutos = Math.floor(segundos / 60);
        const seg = segundos % 60;

        return `${minutos}m ${seg}s`;
    };

    return (
        <div className="card">
            <div className="card-body">

                <h2 style={{ fontFamily: "Inter, sans-serif" }} >Métricas por día</h2>

                <table cellPadding="10"
                    style={{ borderRadius: '10px', fontFamily: "Inter, sans-serif", fontSize: '13px', border: 'solid', borderWidth: '1px' }}>

                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Total Turnos</th>
                            <th>Promedio Espera</th>
                            <th>Promedio Atención</th>
                            <th>Lead Time</th>
                        </tr>
                    </thead>

                    <tbody>

                        {props.metricasPorDia.map((item) => (

                            <tr key={item.fecha}>

                                <td>{item.fecha}</td>

                                <td>{item.total_turnos}</td>

                                <td>
                                    {/*Math.round(item.promedio_espera)} seg */}
                                    {segundosAHumano(Math.round(item.promedio_espera))}
                                </td>

                                <td>
                                    {/*{Math.round(item.promedio_atencion)} seg*/}
                                    {segundosAHumano(Math.round(item.promedio_atencion))}
                                </td>

                                <td>
                                    {/*{Math.round(item.promedio_lead_time)} seg*/}
                                    {segundosAHumano(Math.round(item.promedio_lead_time))}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

                <h2 style={{ fontFamily: "Inter, sans-serif", marginTop: '30px' }} >
                    Turnos del día
                </h2>
                <table className="table" style={{ fontFamily: "Inter, sans-serif", fontSize: '13px' }}>
                    <thead>
                        <tr>
                            <th>tipo_id</th>
                            <th>llamado_en</th>
                            <th>id</th>
                            <th>finalizado_en</th>
                            <th>estado</th>
                            <th>duracion_minutos</th>
                            <th>duracion_espera</th>
                            <th>derivado</th>
                            <th>creado_en</th>
                            <th>codigo</th>
                            <th>cajero</th>
                            <th>box_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.turnosDia.length != 0 ?

                            props.turnosDia.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.tipo_id}</td>
                                    {/*<td>{item.llamado_en.replace("T", "-").replace(".000Z", "")}</td>*/}
                                    <td>{item.llamado_en ?item.llamado_en.replace("T", "-").replace(".000Z", "") : null}</td>
                                    <td>{item.llamado_en}</td>
                                    <td>{item.id}</td>
                                    {/*<td>{item.finalizado_en.replace("T", "-").replace(".000Z", "")}</td>*/}
                                    <td>{item.finalizado_en ? item.finalizado_en.replace("T", "-").replace(".000Z", "") : null}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.duracion_minutos}</td>
                                    <td>{item.duracion_espera}</td>
                                    <td>{item.derivado ? item.creado_en.replace("T", "-").replace(".000Z", "") : null}</td>
                                    {/*<td>{item.creado_en.replace("T", "-").replace(".000Z", "")}</td>*/}
                                    <td>{item.creado_en}</td>
                                    <td>{item.codigo}</td>
                                    <td>{item.cajero_nombre}</td>
                                    <td>{item.box_id}</td>
                                </tr>
                            ))

                            :
                            null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MetricasPorDia;