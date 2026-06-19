import { useState } from "react";

export default function BoxesTab(props) {

    const [form, setForm] = useState({
        numero: "",
        descripcion: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);

    return (
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
                                placeholder="Número"
                                name="numero"
                                value={form.numero}
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

                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={() => props.createBox(form, setForm)}>
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
                                <th>Número</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Usuario actual</th>
                                <th>Cambiar Estado</th>
                                <th>Eliminar Box</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.boxes.map(b => (
                                <tr key={b.id}>
                                    <td>{b.numero}</td>
                                    <td>{b.descripcion}</td>
                                    <td>
                                        {b.activo === 1 ? "🟢 Activo" : "🔴 Inactivo"}
                                    </td>
                                    <td>
                                        {props.cajeros.find((c) => Number(c.id) === b.cajero_actual)?.usuario}
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm`}
                                            style={{
                                                backgroundColor: b.activo === 1 ? 'rgb(222, 59, 33)' : '#25D366',
                                                fontFamily: "Inter, sans-serif",
                                                color: 'white'
                                            }}
                                            onClick={() => props.toggleEstado(b)}
                                        >
                                            {b.activo === 1 ? "Desactivar" : "Activar"}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => props.deleteBox(b.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    );
}