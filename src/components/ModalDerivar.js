export default function ModalDerivar(props) {
    return (
        <>
            {props.showModal2 && <div className="modal fade show" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="false"
                style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 style={{ float: 'left' }}>Derivar Turno : {props.actual ? props.actual.codigo : null}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={props.handleCloseModal2}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card shadow-lg border-0 rounded-4">

                                {/* Header */}
                                <div className="card-header bg-primary text-white rounded-top-4">
                                    <h2 className="mb-0">
                                        Elegir un Box
                                    </h2>
                                    {/* BOXES */}
                                    <div className="mb-3">
                                        <label className="form-label">Box</label>
                                        <select
                                            style={{
                                                borderColor: 'rgb(231, 231, 233)',
                                                maxWidth: "100%",
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: '600px'
                                            }}
                                            className="form-select"
                                            //value={props.boxSeleccionado}
                                            onChange={(e) => props.handleSeleccion(e.target.value)}
                                        >
                                            <option value="">Seleccionar box</option>

                                            {props.boxes.map((b) => (
                                                //muestros ACTIVOS y todos menos el usuario LOGUEADO
                                                (b.activo) === 1 && (props.usuario.replace(/"/g, "") !== b.usuario) ?
                                                    (
                                                        <>
                                                        <option
                                                            key={b.box_id}
                                                            value={b.box_id + ' - ' + b.id}
                                                            disabled={b.activo === 0}
                                                        >
                                                            Box {b.numero}
                                                            {((b.activo === 1)) ? (`🟢 Activo - ${b.usuario}`) : (`🔴 Inactivo`)}
                                                            {/*idsTurnos.map((id, index) => (b["tipo_turno_" + id] != null ? (b["tipo_turno_" + id] + " | ") : ''))*/}
                                                        </option>
                                                        </>
                                                    )
                                                    :
                                                    null
                                            ))}

                                            <option value={null}>
                                                Sin box
                                            </option>

                                        </select>

                                        {/* Checkbox si no es NULL EL BOX*/}
                                        {props.boxes.map((b) => (
                                            ((props.boxSeleccionado == b.box_id) && (b.activo) === 1 && (props.usuario.replace(/"/g, "") !== b.usuario)) ?
                                                (<>
                                                    <label className="form-label" style={{ marginTop: '5px' }}>Elija un tipo de turno</label>
                                                    <div>

                                                        {props.idsTurnos.map((id, index) => (b["tipo_turno_" + id] != null) ?
                                                            (
                                                                <>
                                                                    <div className="form-check mt-2">
                                                                        <input
                                                                            style={{
                                                                                border: "1px solid black",
                                                                                borderRadius: "5px"
                                                                            }}
                                                                            checked={props.tipoSelected === b["tipo_turno_" + id]}
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name={b["tipo_turno_" + id]}
                                                                            value={b["tipo_turno_" + id]}
                                                                            onChange={() => props.handleChangeTipo(b["tipo_turno_" + id])}
                                                                            id={b["tipo_turno_" + id]}
                                                                        />
                                                                        <label
                                                                            className="form-check-label"
                                                                            htmlFor="tipoTurno"
                                                                        >
                                                                            {props.tiposTurnos.find(t => t.id === id)?.descripcion}
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            )
                                                            :
                                                            ''
                                                        )}
                                                    </div>
                                                </>)
                                                :
                                                null
                                        ))}

                                        {/* Checkbox si es NULL EL BOX*/}
                                        {(props.boxSeleccionado === "Sin box") ?
                                            (<>
                                                <label className="form-label" style={{ marginTop: '5px' }}>Elija un tipo de turno</label>
                                                <div>
                                                    {props.tiposTurnos.map((turno, index) =>
                                                    (
                                                        <>
                                                            {
                                                                turno.estado === 1 ?
                                                                    <div className="form-check mt-2">
                                                                        <input
                                                                            style={{
                                                                                border: "1px solid black",
                                                                                borderRadius: "5px"
                                                                            }}
                                                                            checked={props.tipoSelected === turno.id}
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name={turno.id}
                                                                            value={turno.id}
                                                                            onChange={() => props.handleChangeTipo(turno.id)}
                                                                            id={turno.id}
                                                                        />
                                                                        <label
                                                                            className="form-check-label"
                                                                            htmlFor="tipoTurno"
                                                                        >
                                                                            {turno.descripcion}
                                                                        </label>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </>
                                                    )
                                                    )}
                                                </div>
                                            </>)
                                            :
                                            null
                                        }
                                    </div>

                                    <button
                                        onClick={() => props.handleDerivarEndpoint(props.actual)}
                                        className="btn btn-warning px-4 py-2 fw-bold"
                                        style={{ borderRadius: "12px", fontFamily: "Inter" }}
                                    >
                                        ➡️ Derivar opcion seleccionada
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>)
};
