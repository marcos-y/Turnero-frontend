import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditar from '../ModalEditar';

export default function TiposTurnoTab(props) {

    const [form, setForm] = useState({
        codigo: "",
        descripcion: "",
        pref: "",
        color: "#0dcaf0"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);

    const [id,setId] = useState("")

    //----------------- MODAL editar-----------------
    const [showModal, setShowModal] = useState(false);

    // Función para abrir Modal
    const handleButtonClick = (t) => {
        setShowModal(true);
        setId(t.id)
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <>
            <div>
                {/* FORM */}
                <div className="card mb-3">
                    <div className="card-body">

                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: '13px' }} className="row g-2">

                            <div className="col">
                                <input
                                    onFocus={(e) => {
                                        setFocus(true);
                                        e.target.style.outline = "none";
                                    }}
                                    onBlur={(e) => {
                                        setFocus(false);
                                        e.target.style.outline = "";
                                    }}
                                    style={{
                                        border: "1px solid",
                                        borderColor: focus ? "rgb(247, 224, 23)" : "rgb(175, 175, 175)",
                                        padding: "8px",
                                        outline: "none",
                                        borderRadius: '5px',
                                        width: '100%'
                                    }}
                                    placeholder="Código"
                                    name="codigo"
                                    value={form.codigo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col">
                                <input
                                    onFocus={(e) => {
                                        setFocus2(true);
                                        e.target.style.outline = "none";
                                    }}
                                    onBlur={(e) => {
                                        setFocus2(false);
                                        e.target.style.outline = "";
                                    }}
                                    style={{
                                        border: "1px solid",
                                        borderColor: focus2 ? "rgb(247, 224, 23)" : "rgb(175, 175, 175)",
                                        padding: "8px",
                                        outline: "none",
                                        borderRadius: '5px',
                                        width: '100%'
                                    }}
                                    placeholder="Descripción"
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col">
                                <input
                                    onFocus={(e) => {
                                        setFocus3(true);
                                        e.target.style.outline = "none";
                                    }}
                                    onBlur={(e) => {
                                        setFocus3(false);
                                        e.target.style.outline = "";
                                    }}
                                    style={{
                                        border: "1px solid",
                                        borderColor: focus3 ? "rgb(247, 224, 23)" : "rgb(175, 175, 175)",
                                        padding: "8px",
                                        outline: "none",
                                        borderRadius: '5px',
                                        width: '100%'
                                    }}
                                    placeholder="Prefijo"
                                    name="prefijo"
                                    value={form.prefijo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col">
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    name="color"
                                    value={form.color}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-auto">
                                <button
                                    className="btn btn-primary"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                    onClick={() => props.createTipo(form, setForm)}>
                                    Agregar
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

                {/* LISTA */}
                <div className="card">
                    <div className="card-body">

                        <table style={{ fontFamily: "Inter, sans-serif", fontSize: '13px' }} className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Color</th>
                                    <th>Prefijo</th>
                                    <th>Estado</th>
                                    <th>Editar</th>
                                    <th>Activar/Desactivar</th>
                                    {/*<th>Eliminar</th>*/}
                                </tr>
                            </thead>

                            <tbody>
                                {props.tiposTurnos.map(t => (
                                    <tr key={t.id}>
                                        <td>{t.codigo}</td>
                                        <td>{t.descripcion}</td>
                                        <td>
                                            <span
                                                style={{
                                                    backgroundColor: t.color,
                                                    padding: "5px 10px",
                                                    borderRadius: "5px",
                                                    color: "#fff"
                                                }}
                                            >
                                                {t.color}
                                            </span>
                                        </td>
                                        <td>{t.prefijo}</td>
                                        <td>{t.estado === 1 ? "🟢 Activo" : "🔴 Inactivo"}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleButtonClick(t)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm"
                                                style={{
                                                    backgroundColor: t.estado === 1 ? 'rgb(222, 59, 33)' : '#25D366',
                                                    fontFamily: "Inter, sans-serif",
                                                    color: 'white'
                                                }}
                                                onClick={() => props.updateState(t)}
                                            >
                                                {t.estado === 1 ? "Desactivar" : "Activar"}
                                            </button>
                                        </td>

                                        {/*
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => props.deleteTipo(t.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    */}

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                </div>

            </div>

            <ModalEditar
                id={id}
                setShowModal={setShowModal}
                showModal={showModal}
                fetchTiposTurnos={props.fetchTiposTurnos}
                handleCloseModal={handleCloseModal}
            />
        </>
    );
}