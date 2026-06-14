import { useState } from "react";
import { useTiposTurnos } from "../../hooks/useTiposTurnos";
import { useTiposUsuarios } from "../../hooks/useTiposUsuarios";
import { useBoxes } from "../../hooks/useBoxes";
import { useCajeros } from "../../hooks/useCajeros";
import { getTipos } from "../../api/tiposTurno.api";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeTab from "../../components/admin/HomeTab";
import CajerosTab from "../../components/admin/CajerosTab";
import BoxesTab from "../../components/admin/BoxesTab";
import TiposTurnoTab from "../../components/admin/TiposTurnoTab";
import ReportesTab from "../../components/admin/ReportesTab";
import FacturasTab from "../../components/admin/FacturasTab";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import TiposUsuariosTab from "../../components/admin/TiposUsuariosTab";

export default function AdminPanel() {

    const [tab, setTab] = useState("cajeros");
    const [selected0, setSelected0] = useState(1);
    const [selected, setSelected] = useState(1);
    const [selected2, setSelected2] = useState(1);
    const [selected3, setSelected3] = useState(1);
    const [selected4, setSelected4] = useState(1);
    const [selected5, setSelected5] = useState(1);

    /*Hover Selected*/
    const styleSelected0 = {
        fontFamily: "Inter, sans-serif",
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const styleSelected = {
        fontFamily: "Inter, sans-serif",
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px',
        marginLeft: '8px'
    };

    const styleSelected2 = {
        fontFamily: "Inter, sans-serif",
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        marginLeft: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const styleSelected3 = {
        fontFamily: "Inter, sans-serif",
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        marginLeft: '5px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const styleSelected4 = {
        fontFamily: "Inter, sans-serif",
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        marginLeft: '5px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const styleSelected5 = {
        fontFamily: "Inter, sans-serif",
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        marginLeft: '5px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const styleSelected6 = {
        fontFamily: "Inter, sans-serif",
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        marginLeft: '5px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };


    const style0 = {
        fontFamily: "Inter, sans-serif",
        borderColor: 'rgb(222, 59, 33)',
        //color: 'rgb(175, 175, 175)',
        color: 'rgb(60, 60, 60)',
        borderRadius: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const style = {
        fontFamily: "Inter, sans-serif",
        borderColor: 'rgb(222, 59, 33)',
        //color: 'rgb(175, 175, 175)',
        color: 'rgb(60, 60, 60)',
        borderRadius: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px',
        marginLeft: '8px'
    };

    const style2 = {
        fontFamily: "Inter, sans-serif",
        borderColor: 'rgb(222, 59, 33)',
        color: 'rgb(60, 60, 60)',
        borderRadius: '5px',
        marginLeft: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const style3 = {
        fontFamily: "Inter, sans-serif",
        borderColor: 'rgb(222, 59, 33)',
        color: 'rgb(60, 60, 60)',
        borderRadius: '5px',
        marginLeft: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const style4 = {
        fontFamily: "Inter, sans-serif",
        borderColor: 'rgb(222, 59, 33)',
        color: 'rgb(60, 60, 60)',
        borderRadius: '5px',
        marginLeft: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const style5 = {
        fontFamily: "Inter, sans-serif",
        borderColor: 'rgb(222, 59, 33)',
        color: 'rgb(60, 60, 60)',
        borderRadius: '5px',
        marginLeft: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const style6 = {
        fontFamily: "Inter, sans-serif",
        borderColor: 'rgb(222, 59, 33)',
        color: 'rgb(60, 60, 60)',
        borderRadius: '5px',
        marginLeft: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '8px'
    };

    const handleClick = (props) => {

        setTab(props.opcion)

        if (props.opcion === 'home') {
            if (selected0 === 1) {
                setSelected0(0);
                setSelected(1);
                setSelected2(1);
                setSelected3(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected0(1);
            }
        }
        else if (props.opcion === 'cajeros') {
            if (selected === 1) {
                setSelected(0);
                setSelected0(1);
                setSelected2(1);
                setSelected3(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected(1);
            }
        } else if (props.opcion === 'boxes') {
            if (selected2 === 1) {
                setSelected2(0);
                setSelected0(1);
                setSelected(1);
                setSelected3(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected2(1);
            }
        } else if (props.opcion === 'tipos') {
            if (selected3 === 1) {
                setSelected3(0);
                setSelected0(1);
                setSelected(1);
                setSelected2(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected3(1);
            }
        }
        else if (props.opcion === 'reportes') {
            if (selected4 === 1) {
                setSelected4(0);
                setSelected0(1);
                setSelected(1);
                setSelected2(1);
                setSelected3(1);
                setSelected5(1);
            } else {
                setSelected4(1);
            }
        } else {
            if (selected5 === 1) {
                setSelected5(0);
                setSelected0(1);
                setSelected(1);
                setSelected2(1);
                setSelected3(1);
                setSelected4(1);
            } else {
                setSelected5(1);
            }
        }
    };

    /******** TIPOS TURNOS **********/
    const { tiposTurnos, loading, error, fetchTiposTurnos } = useTiposTurnos();

    const createTipo = async (form) => {

        if (!form.codigo || !form.descripcion || !form.prefijo) {
            return alert("Completá los campos");
        }

        await axios.post("http://localhost:5000/api/tipos-turno/", form);

        //setForm({ codigo: "", descripcion: "", color: "#0dcaf0", prefijo: "" });        

        fetchTiposTurnos();
    };


    const deleteTipo = async (id) => {
        await axios.delete(`http://localhost:5000/api/tipos-turno/${id}`);

        fetchTiposTurnos();
    };


    let estado = 0;

    const updateState = async (t) => {

        estado = ((t.estado === 0) ? 1 : 0);

        await axios.put(`http://localhost:5000/api/tipos-turno/${t.id}/estado`, {
            estado: estado,
        });

        fetchTiposTurnos();
    };


    /******** TIPOS USUARIOS **********/
    const { tiposUsuarios, fetchTiposUsuarios } = useTiposUsuarios();

    const createTipoUsuario = async (form) => {

        if (!form.nombre || !form.descripcion) {
            return alert("Completá los campos");
        }

        await axios.post("http://localhost:5000/api/tipos-usuarios/", form);

        fetchTiposUsuarios();
    };

    const updateStateTipoUsuario = async (t) => {

        estado = ((t.activo === 0) ? 1 : 0);

        await axios.put(`http://localhost:5000/api/tipos-usuarios/${t.id_tipo_usuario}/estado`, {
            estado: estado,
        });

        fetchTiposUsuarios();
    };

    const deleteTipoUsuario = async (id) => {
        await axios.delete(`http://localhost:5000/api/tipos-usuarios/${id}`);

        fetchTiposUsuarios();
    };


    /*********** BOXES **********/
    const { boxes, loadingBoxes, errorBoxes, fetchBoxes } = useBoxes();

    const createBox = async (form) => {

        if (!form.numero) return alert("Número requerido");
        if (!form.descripcion) return alert("Descripción requerida");

        await axios.post("http://localhost:5000/api/boxes/", form);
        //setForm({ numero: "", descripcion: "" });

        fetchBoxes();
    };

    const deleteBox = async (id) => {

        await axios.delete(`http://localhost:5000/api/boxes/${id}`);
        
        fetchBoxes();
    };

    const toggleEstado = async (box) => {

        const nuevoEstado = box.activo === 1 ? 0 : 1;
        await axios.put(`http://localhost:5000/api/boxes/${box.id}/estado`, {
            activo: nuevoEstado
        });

        fetchBoxes();
    };

    /*********** CAJEROS **********/
    const { cajeros, loadingCajeros, errorCajeros, fetchCajeros } = useCajeros();

    const createCajero = async (form) => {

        if (!form.nombre) return alert("Nombre requerido");
        if (!form.usuario) return alert("Usuario requerido");
        if (!form.password) return alert("Contraseña requerida");

        await axios.post("http://localhost:5000/api/cajeros/", form);

        //setForm({ nombre: "", usuario: "", password: "" });
        fetchCajeros();
    };

    const deleteCajero = async (id) => {
        await axios.delete(`http://localhost:5000/api/cajeros/${id}`);

        fetchCajeros();
    };

    const destroyCajero = async (id) => {
        await axios.delete(`http://localhost:5000/api/cajeros/${id}/delete`);

        fetchCajeros();
    };


    const toggleEstadoCajero = async (cajero) => {

        const nuevoEstado = cajero.activo === 1 ? 0 : 1;

        await axios.put(`http://localhost:5000/api/cajeros/${cajero.id}/estado`, {
            activo: nuevoEstado
        });

        fetchCajeros();
    };

    return (
        <>
            <Navbar title="🗂️ Panel de Administracion" />

            <div className="container mt-4">

                {/* TABS */}
                <ul className="nav nav-tabs mb-3">

                    {/* 
                    <li className="nav-item">
                        <Button
                            title="Home"
                            option="home"
                            tab={tab}
                            styleSelected={styleSelected0}
                            style={style0}
                            selected={selected0}
                            handleClick={handleClick}
                        />
                    </li>
                    */}

                    <li className="nav-item">
                        <Button
                            title="👤 USUARIOS"
                            option="cajeros"
                            tab={tab}
                            styleSelected={styleSelected}
                            style={style}
                            selected={selected}
                            handleClick={handleClick}
                        />
                    </li>

                    <li className="nav-item">
                        <Button
                            title="📦 BOXES"
                            option="boxes"
                            tab={tab}
                            styleSelected={styleSelected2}
                            style={style2}
                            selected={selected2}
                            handleClick={handleClick}
                        />
                    </li>

                    <li className="nav-item">
                        <Button
                            title=" 🏢 TIPOS DE TURNO"
                            option="tipos"
                            tab={tab}
                            styleSelected={styleSelected3}
                            style={style3}
                            selected={selected3}
                            handleClick={handleClick}
                        />
                    </li>

                    <li className="nav-item">
                        <Button
                            title="REPORTES"
                            option="reportes"
                            tab={tab}
                            styleSelected={styleSelected4}
                            style={style4}
                            selected={selected4}
                            handleClick={handleClick}
                        />
                    </li>

                    <li className="nav-item">
                        <Button
                            title="TIPOS DE USUARIOS"
                            option="tipos_usuarios"
                            tab={tab}
                            styleSelected={styleSelected5}
                            style={style5}
                            selected={selected5}
                            handleClick={handleClick}
                        />
                    </li>
                </ul>

                {/* CONTENIDO */}
                {/*tab === "home" && <HomeTab />*/}
                {tab === "cajeros" && <CajerosTab
                    fetchCajeros={fetchCajeros}
                    cajeros={cajeros}
                    createCajero={createCajero}
                    deleteCajero={deleteCajero}
                    destroyCajero={destroyCajero}
                    toggleEstadoCajero={toggleEstadoCajero}
                    tiposUsuarios={tiposUsuarios}
                    tiposTurnos={tiposTurnos}
                    fetchTiposUsuarios={fetchTiposUsuarios} />}
                {tab === "tipos_usuarios" && <TiposUsuariosTab
                    tiposUsuarios={tiposUsuarios}
                    createTipoUsuario={createTipoUsuario}
                    updateStateTipoUsuario={updateStateTipoUsuario}
                    deleteTipoUsuario={deleteTipoUsuario}
                />}
                {tab === "boxes" && <BoxesTab
                    boxes={boxes}
                    createBox={createBox}
                    deleteBox={deleteBox}
                    toggleEstado={toggleEstado}
                    cajeros={cajeros}
                />}
                {tab === "tipos" && <TiposTurnoTab
                    tiposTurnos={tiposTurnos}
                    createTipo={createTipo}
                    deleteTipo={deleteTipo}
                    updateState={updateState} />}
                {tab === "reportes" && <ReportesTab />}
            </div>
        </>
    );
}