import { useEffect, useState } from "react";
import { useCajeros } from "../hooks/useCajeros";
import { useBoxes } from "../hooks/useBoxes";
import axios from "axios";
import { Link } from "react-router-dom";
import LinkCustom from "../components/Link";

export default function Home() {

    //const URL = "localhost:5000";
    const URL = "192.168.8.193:5000";

    //spinner
    const [loading, setLoading] = useState(false);

    /*********** CAJEROS **********/
    const { cajeros, loadingCajeros, errorCajeros, fetchCajeros } = useCajeros();

    /*********** BOXES **********/
    const { boxes, loadingBoxes, errorBoxes, fetchBoxes } = useBoxes();

    const [cajeroAct, setCajeroAct] = useState(localStorage.getItem("id"));
    const [cajeroSeleccionado, setCajeroSeleccionado] = useState("");
    const [boxSeleccionado, setBoxSeleccionado] = useState("");
    const [userRol, setUserRol] = useState(localStorage.getItem("id_tipo_usuario"));

    const cajeroActual = cajeros.find(c => c.id === cajeroSeleccionado);
    const boxActual = boxes.find(b => b.id === boxSeleccionado);

    //useEffect(() => {
    //    localStorage.setItem("box_actual", boxSeleccionado);
    //}, [boxSeleccionado]);

    useEffect(() => {
        fetchCajeros();
        fetchBoxes();

        const interval = setInterval(() => {
            fetchBoxes();
        }, 5000); // cada 5 segundos

        return () => clearInterval(interval);
    }, []);


    const handleSeleccion = async (value) => {
        //aqui actualizo el estado a la DB
        setBoxSeleccionado(value);
    };

    const [confirm, setConfirm] = useState(false);


    //------- CONFIRMAR OPCION -----------
    const handleSubmit = async (e) => {

        let box = '';

        if (!boxSeleccionado && !localStorage.getItem('box_actual')) {
            alert("Debe seleccionar un Box !");
            return;
        } else {
            box = boxSeleccionado ? boxSeleccionado : localStorage.getItem('box_actual')
        };

        e.preventDefault();

        setLoading(true);

        try {

            axios.put(`http://${URL}/api/boxes/${box}/estado`, {
                activo: "1",
                cajero_actual: cajeroAct
            });

            localStorage.setItem("box_actual", boxSeleccionado);

            setConfirm(true);
        } catch (error) {
            console.error("Error al enviar datos:", error);
        } finally {
            setLoading(false); // 👈 apaga spinner
        }
    };


    //------- QUITAR OPCION -----------
    const handleSubmitRemove = async (e) => {

        let box = "";

        if (!boxSeleccionado && !localStorage.getItem('box_actual')) {
            alert("Debe seleccionar un Box !");
            return;
        } else {
            box = boxSeleccionado ? boxSeleccionado : localStorage.getItem('box_actual')
        };

        e.preventDefault();

        setLoading(true);

        try {

            axios.put(`http://${URL}/api/boxes/${box}/estado`, {
                activo: "0",
                cajero_actual: 0
            });

            localStorage.removeItem("box_actual");
            localStorage.setItem('volver',false);

        } catch (error) {
            console.error("Error al enviar datos:", error);
        } finally {
            setLoading(false); // 👈 apaga spinner
            setConfirm(false);
        }
    };


    //------- MODIFICAR ESTADO a INACTIVO -----------
    const handleLinkClick = () => {

        //Borrar el estado en BOX a INACTIVO
        if (boxSeleccionado !== '') {
            axios.put(`http://${URL}/api/boxes/${boxSeleccionado}/estado`, {
                activo: "0",
                cajero_actual: 0
            });
        }

        localStorage.clear();
    };

    const [selected, setSelected] = useState(1);

    const styleSelected = {
        fontFamily: "Inter, sans-serif",
        marginTop: '10px',
        backgroundColor: 'rgb(222, 59, 33)',
        color: "white",
        borderRadius: '5px',
        border: 'solid',
        borderColor: 'rgb(222, 59, 33)',
        paddingBottom: '12px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '12px',
        textDecoration: 'none'
    };

    const style = {
        fontFamily: "Inter, sans-serif",
        marginTop: '10px',
        color: 'rgb(60, 60, 60)',
        display: "inline-block",
        border: "1px solid rgb(222, 59, 33)",
        borderRadius: '5px',
        marginBottom: '10px',
        paddingBottom: '12px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '12px',
        textDecoration: 'none'
    };


    const handleClick = () => {
        if (selected === 1 && boxSeleccionado !== "") {
            setSelected(0);
        } else {
            setSelected(1);
        }
    };


    return (
        <>
            <div className="container mt-5">
                <div style={{ fontFamily: "Inter, sans-serif" }} className="row justify-content-center">

                    <div className="col-md-6">

                        <div className="card shadow">
                            <div className="card-header text-center" style={{ color: 'black', backgroundColor: 'rgb(247, 224, 23)' }}>
                                <h5 className="mb-0 " style={{ fontSize: "14px" }}>Asignación de Atención</h5>
                            </div>

                            <div className="card-body">

                                {/* listado BOXES */}
                                <div className="mb-3">
                                    <label className="form-label">Box</label>
                                    <select
                                        disabled={(confirm === true) || localStorage.getItem('volver') === "true" }
                                        style={{
                                            borderColor: 'rgb(231, 231, 233)',
                                            maxWidth: "100%",
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '600px'
                                        }}
                                        className="form-select"
                                        value={boxSeleccionado}
                                        onChange={(e) => handleSeleccion(e.target.value)}
                                    >
                                        {
                                            localStorage.getItem('box_actual') ?
                                                <option value="">Box {localStorage.getItem('box_actual')}🟢Activo</option>
                                                :
                                                <option value="">Seleccionar box</option>
                                        }
                                        {boxes.map((b) => (
                                            b.id == localStorage.getItem('box_actual') ?
                                                null
                                                :
                                                <option
                                                    key={b.id}
                                                    value={b.id}
                                                    disabled={b.activo === 1}
                                                >
                                                    Box {b.numero}
                                                    {b.activo === 1 ? "🟢 Activo" : "🔴 Inactivo"}
                                                </option>
                                        ))}
                                    </select>
                                </div>

                                {/* RESUMEN */}
                                <div className="alert alert-info">
                                    <h6>Selección actual:</h6>

                                    <p className="mb-0">
                                        <strong>Box:</strong>{" "}
                                        {boxSeleccionado
                                            ? `Box ${boxSeleccionado}`
                                            : "No seleccionado"
                                        }
                                    </p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <form onSubmit={handleSubmit}>
                                        <button
                                            disabled={localStorage.getItem('box_actual')}
                                            className="btn"
                                            type="submit"
                                            style={{
                                                borderBottoLeftRadius: '8px',
                                                borderBottomRightRadius: '8px',
                                                borderBottomStyle: 'none',
                                                borderBottomWidth: '0px',
                                                maxWidth: "298px",
                                                backgroundColor: 'rgb(247, 224, 23)',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: '600px',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            Confirmar eleccion
                                        </button>
                                        {loading && <h1>Cargando...</h1>}
                                    </form>

                                    <form onSubmit={handleSubmitRemove}>
                                        <button
                                            disabled={confirm === false && localStorage.getItem('volver') !== 'true'}
                                            className="btn"
                                            type="submit"
                                            style={{
                                                borderBottoLeftRadius: '8px',
                                                borderBottomRightRadius: '8px',
                                                borderBottomStyle: 'none',
                                                borderBottomWidth: '0px',
                                                maxWidth: "298px",
                                                backgroundColor: 'rgb(222, 59, 33)',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: '600px',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            Quitar eleccion
                                        </button>
                                    </form>
                                </div>

                                <Link to="/cajero"
                                    onClick={(e) => {
                                        handleClick()
                                        if (!confirm) {
                                            e.preventDefault();
                                            alert("Debe confirmar eleccion!");
                                        }
                                    }}
                                    style={selected === 0 ? styleSelected : style}
                                >
                                    👤 Ir a atencion
                                </Link>
                                {
                                    (userRol === "1") ?
                                        <Link to="/admin"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                                textDecoration: 'none',
                                                marginLeft: '100px',
                                                color: 'rgb(60, 60, 60)',
                                                display: "inline-block",
                                                border: "1px solid rgb(222, 59, 33)",
                                                borderRadius: '5px',
                                                paddingBottom: '12px',
                                                paddingLeft: '20px',
                                                paddingRight: '20px',
                                                paddingTop: '12px'
                                            }}
                                        >
                                            Admin
                                        </Link>
                                        :
                                        null
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div >
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <LinkCustom
                    onClick={handleLinkClick}
                    route="/Login"
                    title="Cerrar Sesión"
                    backgroundColor="rgb(247, 224, 23)"
                    color='black'
                    marginTop='20px'
                    marginRight='5px'
                    marginBottom='10px'
                    marginLeft='5px'
                />
            </div>
        </>
    );
}