import { useState } from "react";
import axios from "axios";

export default function ModalFactura(props) {

    //const URL = "localhost:5000";
    const URL = "192.168.8.193:5000";

    const [form, setForm] = useState({
        descripcion: "",
        color: "#0dcaf0",
        prefijo: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (id) => {

        if (!form.descripcion || !form.prefijo) {
            alert("complete todos los campos para guardar !");
            return;
        };

        try {
            await axios.put(`http://${URL}/api/tipos-turno/${id}`, {
                descripcion: form.descripcion,
                color: form.color,
                prefijo: form.prefijo
            });

            props.fetchTiposTurnos();

        } catch (error) {
            console.error("Error guardando factura", error);
        }

        props.setShowModal(false);
    };

    return (
        <>
            {props.showModal && <div className="modal fade show" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="false"
                style={{ display: 'block' }}>
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 style={{ float: 'left' }}>Tipo de turno</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.handleCloseModal}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card shadow-lg border-0 rounded-4">

                                {/* Header */}
                                <div className="card-header bg-primary text-white rounded-top-4">
                                    <h2 className="mb-0">
                                        ✏️ Editar
                                    </h2>
                                </div>

                                {/* Body */}
                                <div className="card-body">
                                    <div className="row">

                                        {/*DESCIPCION*/}
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Descripcion
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="descripcion"
                                                placeholder="Ingrese descripcion"
                                                value={form.descripcion}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/*COLOR*/}
                                        <div className="col">
                                            <label className="form-label">
                                                Color
                                            </label>
                                            <input
                                                type="color"
                                                className="form-control form-control-color"
                                                name="color"
                                                value={form.color}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/*PREFIJO*/}
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Prefijo
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="prefijo"
                                                placeholder="Ingrese prefijo"
                                                value={form.prefijo}
                                                onChange={handleChange}
                                            />
                                        </div>


                                    </div>


                                    {/* Botón */}
                                    <div className="d-grid mt-4">
                                        <button
                                            onClick={() => handleSave(props.id)}
                                            className="btn btn-primary btn-lg">
                                            Guardar cambios
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>)
};
