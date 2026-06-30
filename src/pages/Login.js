import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

    //const URL = "localhost:5000";
    const URL = "192.168.8.193:5000";

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        if (!usuario || !password) {
            setError("Completá usuario y contraseña");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`http://${URL}/api/auth/login`, {
                usuario,
                password
            });

            // 👉 acá luego guardás token:
            // localStorage.setItem("token", res.data.token);
            localStorage.setItem("nombre", JSON.stringify(res.data.cajero.nombre));
            localStorage.setItem("usuario", JSON.stringify(res.data.cajero.usuario));
            localStorage.setItem("id", JSON.stringify(res.data.cajero.id));
            localStorage.setItem("id_tipo_usuario", JSON.stringify(res.data.cajero.id_tipo_usuario));

            //tipos de turno
            for (let key in res.data.cajero) {
                if (key.includes("tipo_turno") && res.data.cajero[key] != null) {
                    localStorage.setItem(key, JSON.stringify(res.data.cajero[key]));
                }
            };

            navigate('/Home');

        } catch (err) {
            console.error(err);
            setError("Credenciales inválidas");
        } finally {
            setLoading(false);
        }
    };

    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-4">

                <div className="card shadow" style={{ fontFamily: "Inter" }}>
                    <div className="card-header text-black text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/*<div className="card-header bg-dark text-white text-center"> */}
                        <h5 className="mb-0" style={{ fontFamily: "Inter, sans-serif", fontSize: '18px' }}>Login Usuarios</h5>
                        <img
                            src="data:image/svg+xml;utf8,
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                                <circle cx='12' cy='8' r='4'/>
                                <path d='M4 20c0-4 4-6 8-6s8 2 8 6'/>
                                </svg>"
                            alt="Usuario"
                            width="40"
                            height="40"
                        />
                    </div>

                    <div className="card-body">

                        {/* ERROR */}
                        {error && (
                            <div className="alert alert-danger py-2">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>

                            {/* USUARIO */}
                            <div
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '600px'
                                }}
                                className="mb-3">
                                <label
                                    style={{
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '600px'
                                    }}
                                    className="form-label">
                                    Usuario
                                </label>
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
                                        fontFamily: "Inter, sans-serif",
                                        border: "1px solid",
                                        borderColor: focus ? "rgb(247, 224, 23)" : "rgb(175, 175, 175)",
                                        padding: "8px",
                                        outline: "none",
                                        borderRadius: '5px',
                                        width: '100%'
                                    }}
                                    type="text"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    placeholder="Ingrese usuario"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '600px'
                                }}
                                className="mb-3">
                                <label className="form-label">Contraseña</label>
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
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingrese contraseña"
                                />
                            </div>

                            {/* BOTÓN */}
                            <div className="d-grid">
                                <button
                                    className="btn"
                                    type="submit"
                                    style={{
                                        borderBottoLeftRadius: '8px',
                                        borderBottomRightRadius: '8px',
                                        borderBottomStyle: 'none',
                                        borderBottomWidth: '0px',
                                        maxWidth: "100%",
                                        backgroundColor: 'rgb(247, 224, 23)',
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '600px'
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? "Ingresando..." : "Ingresar"}
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
}