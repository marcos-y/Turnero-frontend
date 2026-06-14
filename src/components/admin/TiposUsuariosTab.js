import { useEffect, useState } from "react";

export default function TiposUsuariosTab(props) {

    const [form, setForm] = useState({
        nombre: "",
        descripcion: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);

    return (
        <>
            <div className="card">
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
                                placeholder="Nombre"
                                name="nombre"
                                value={form.nombre}
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
                                placeholder="Descripcion"
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-auto">
                            <button
                                className="btn btn-primary"
                                style={{ fontFamily: "Inter, sans-serif" }}
                                onClick={()=> props.createTipoUsuario(form)}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                    <table style={{ fontFamily: "Inter, sans-serif, sans-serif", fontSize: '13px' }} className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                                <th>Cambiar Estado</th>
                                <th>Eliminar Tipo</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.tiposUsuarios.map(t => (
                                <tr key={t.id_tipo_usuario}>
                                    <td>{t.nombre}</td>
                                    <td>{t.descripcion}</td>
                                    <td>{t.activo === 1 ? "🟢 Activo" : "🔴 Inactivo"}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm"
                                            style={{
                                                backgroundColor: t.activo === 1 ? 'rgb(222, 59, 33)' : '#25D366',
                                                fontFamily: "Inter, sans-serif",
                                                color: 'white'
                                            }}
                                        onClick={() => props.updateStateTipoUsuario(t)}
                                        >
                                            {t.activo === 1 ? "Desactivar" : "Activar"}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => props.deleteTipoUsuario(t.id_tipo_usuario)}
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
        </>
    );
}