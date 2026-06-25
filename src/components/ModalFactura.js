export default function ModalFactura(props) {
    return (
    <>
    {props.showModal &&<div className="modal fade show" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="false" 
    style={{ display: 'block' }}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 style={{ float: 'left' }}>Factura</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.handleCloseModal}>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="card shadow-lg border-0 rounded-4">

                        {/* Header */}
                        <div className="card-header bg-primary text-white rounded-top-4">
                            <h2 className="mb-0">
                                📄 Buscar Factura
                            </h2>
                        </div>

                        {/* Body */}
                        <div className="card-body p-4">
                            <div className="row g-3">

                                {/* PREFIJO*/}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Prefijo
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="prefijo"
                                        placeholder="Ingrese el prefijo factura"
                                        value={props.factura.prefjo}
                                        onChange={props.handleChange}
                                    />
                                </div>

                                {/*LETRA*/}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Letra
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="letra"
                                        placeholder="Ingrese letra factura"
                                        value={props.factura.letra}
                                        onChange={props.handleChange}
                                    />
                                </div>

                                {/*NUMERO*/}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Numero
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="numero"
                                        placeholder="Ingrese numero factura"
                                        value={props.factura.numero}
                                        onChange={props.handleChange}
                                    />
                                </div>
                            </div>

                            {/* Checkbox 
                            <div className="col-12">
                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="pedidoGrande"
                                        checked={props.factura.pedidoGrande}
                                        onChange={props.handleChange}
                                        id="pedidoGrande"
                                    />

                                    <label
                                        className="form-check-label"
                                        htmlFor="pedidoGrande"
                                    >
                                        Pedido grande
                                    </label>
                                </div>
                            </div>*/}

                            <button
                                onClick={props.handleConsultar}
                                className="btn btn-warning btn-sm">
                                Consultar
                            </button>

                            {props.loading && <p>Cargando...</p>}

                            <ul className="list-group list-group-flush">
                                {props.facturaData
                                    .map((f) => (
                                        <li
                                            key={f.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <span className="fw-bold">{f.ID}</span>
                                            <span className="fw-bold">{f.RAZON}</span>
                                            <span className="fw-bold">{f.LOCALIDAD}</span>
                                        </li>
                                    ))}
                            </ul>

                            {/* Botón */}
                            {/*<div className="d-grid mt-4">
                                <button className="btn btn-primary btn-lg">
                                    Guardar Factura
                                </button>
                            </div>*/}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>}
    </>)
};
