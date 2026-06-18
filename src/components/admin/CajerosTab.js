import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import UserTypeSelect from '../UserTypeSelect';

export default function CajerosTab(props) {

    const URL = "localhost:5000";
    //const URL = "192.168.8.193:5000";

    //cambiar indices por ID  - son todos los tipos de TURNOS - tengo que agregarle la descripcion
    //const idsTurnos = props.tiposTurnos.map((t, index) => t.id);

    const idsTurnos = props.tiposTurnos.map(turno => ({
        id: turno.id,
        descripcion: turno.descripcion,
        estado: turno.estado
    }));

    const [refreshPage, setRefreshPage] = useState(false);

    const [form, setForm] = useState({
        nombre: "",
        usuario: "",
        password: "".match
    });

    useEffect(() => {
        props.fetchCajeros();
    }, [refreshPage]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);

    const handleClickAssignType = async (props) => {

        await axios.put(`http://${URL}/api/cajeros/${props.c.id}/asignarTipoTurno`, {
            tipoId: props.item.id
        });

        if (refreshPage === false) {
            setRefreshPage(true)
        } else {
            setRefreshPage(false)
        }
    };

    const handleClickRemoveType = async (props) => {

        await axios.put(`http://${URL}/api/cajeros/${props.c.id}/removerTipoTurno`, {
            tipoId: props.turnoId
        });

        if (refreshPage === false) {
            setRefreshPage(true)
        } else {
            setRefreshPage(false)
        }
    };

    const [activo, setActivo] = useState(true);
    const cambiarEstado = () => {
        setActivo(!activo);
    };

    const [loggedUserType, setLoggedUserType] = useState(localStorage.getItem("id_tipo_usuario"));
    const [loggedUser, setLoggedUser] = useState(localStorage.getItem("usuario"));

    const [userType, setUserType] = useState("");
    const handleUserTypeChange = async (id,value) => {
        
        await axios.put(`http://${URL}/api/cajeros/${id}/tipo`, {
            tipo: value
        });

        props.fetchCajeros();
    };

    return (
        <div>

            {/* FORM */}
            <div className="card mb-3">
                <div className="card-body" style={{ fontFamily: "Inter, sans-serif", fontSize: '13px' }} >

                    <div className="row g-2">

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
                                placeholder="Usuario"
                                name="usuario"
                                value={form.usuario}
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
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={() => props.createCajero(form)}>
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
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Contraseña</th>
                                <th>Rol</th>
                                <th>Cambiar Rol</th>
                                <th>Estado</th>
                                <th>Tipo Atención</th>
                                <th>Asignar Tipo Atención</th>
                                <th>Quitar Tipo Atención</th>
                                <th>Desactivar Usuario</th>
                                <th>Eliminar Usuario</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.cajeros.map(c => (
                                <tr key={c.id}>
                                    <td>{c.nombre}</td>
                                    <td>{c.usuario}</td>
                                    <td>
                                        {c.password}
                                        {/*<button
                                            className="btn btn-primary btn-sm"
                                            //onClick={() => props.destroyCajero(c.id)}
                                        >
                                            Cambiar
                                        </button>*/}
                                    </td>
                                     <td>{props.tiposUsuarios.find(t => t.id_tipo_usuario === c.id_tipo_usuario)?.nombre}</td>
                                    <th>
                                        <UserTypeSelect
                                            //key={c.id}
                                            idUser={c.id}
                                            array={props.tiposUsuarios}
                                            //value={userType}
                                            handleChange={handleUserTypeChange}
                                           />
                                    </th>
                                    <td>
                                        {c.activo === 1 ? "🟢 Activo" : "🔴 Inactivo"}
                                    </td>
                                    <td>
                                        {idsTurnos.map((turno, index) => (c["tipo_turno_" + turno.id] !== null ? ((turno.estado === 1) ? turno.descripcion + " | " : null) : ''))}
                                        {/*idsTurnos.map((id, descripcion, index) => ((c["tipo_turno_" + id] != null) ? ((descripcion)  +" | ") : ''))*/}
                                    </td>
                                    <td>
                                        {props.tiposTurnos.map((item, index) => (
                                            item.estado !== 0 ?
                                                <button
                                                    disabled={c["tipo_turno_" + item.id] !== null ? true : false}
                                                    onClick={() => handleClickAssignType({ c, item })}
                                                    className={`btn btn-sm`}
                                                    style={{
                                                        backgroundColor: item.color,
                                                        fontFamily: "Inter, sans-serif",
                                                        color: 'white',
                                                        marginLeft: '2px',
                                                        marginRight: '2px',
                                                    }}
                                                    key={index}>{item.codigo}
                                                </button>
                                                :
                                                ''
                                        ))}
                                    </td>
                                    <td>
                                        <div>
                                            {idsTurnos.map((turno, index) => (c["tipo_turno_" + turno.id] !== null ?
                                                (<>
                                                    {
                                                        turno.estado !== 0 ?
                                                            <>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id={`switch-turno-${index}`}
                                                                    label={`${turno.descripcion}`}
                                                                    onChange={() => handleClickRemoveType({ c, turnoId: turno.id })}
                                                                    checked={c["tipo_turno_" + turno.id] != null}
                                                                />  {''}
                                                            </>
                                                            :
                                                            ''
                                                    }
                                                </>)
                                                :
                                                ''))}
                                        </div>
                                    </td>

                                    <td>
                                        <button
                                            //className={`btn btn-sm ${c.activo == 1 ? "btn-warning" : "btn-success"}`}
                                            disabled={ (loggedUser === c.usuario && loggedUserType === "1") ? true : false}
                                            className={`btn btn-sm`}
                                            style={{
                                                backgroundColor: c.activo === 1 ? 'rgb(222, 59, 33)' : '#25D366',
                                                fontFamily: "Inter, sans-serif",
                                                color: 'white'
                                            }}
                                            onClick={() => props.toggleEstadoCajero(c)}
                                        >
                                            {c.activo === 1 ? "Desactivar" : "Activar"}
                                        </button>
                                    </td>
                                      <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => props.destroyCajero(c.id)}
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

        </div >
    );
}