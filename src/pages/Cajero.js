import React, { useState, useEffect } from "react";
import { useTiposTurnos } from "../hooks/useTiposTurnos";
import { obtenerFacturas } from "../services/api";
import axios from "axios";
import Link from "../components/Link";
import Navbar from "../components/Navbar";
import ModalFactura from "../components/ModalFactura";
import ModalDerivar from "../components/ModalDerivar";
import Badge from 'react-bootstrap/Badge';
import TiposTurnoTab from "../components/admin/TiposTurnoTab";

const Cajero = () => {

  //Cajero actual
  const [usuario] = useState(localStorage.getItem("usuario"));
  const [box_id] = useState(localStorage.getItem("box_actual"));
  const [cajero_id] = useState(localStorage.getItem("id"));

  //recorro todo el storage para encontrar los tipos de TURNOS del usuario (no NULL)
  var tiposTurnosCaj = [];

  for (let i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (key.includes("tipo_turno") && value != null) {

      //localStorage.getItem(key);
      let newKey = "id";

      tiposTurnosCaj.push({ id: (Number(JSON.parse(value))) })
    };
  };


  //Tipos Turnos Todos
  const [turnos, setTurnos] = useState([]);
  const fetchTurnosCajero = async (box_id, cajero_id) => {

    //TIPOS de turnos del USUARIO
    const tipo_id = (tiposTurnosCaj.length === 1 ? tiposTurnosCaj[0].id : tiposTurnosCaj.map(obj => obj.id).join(","));

    try {

      const res = await axios.get(`http://localhost:5000/api/turnos/tipo/${tipo_id}/${cajero_id}`);

      const derivados = res.data.filter(item => item.derivado === "si");

      const resto = res.data.filter(item => item.derivado !== "si");

      resto.splice(4, 0, ...derivados);

      setTurnos(resto);

    } catch (error) {
      console.error("Error cargando turnos", error);
    }
  };

  /* TIPOS TURNOS */
  const { tiposTurnos, loadingTiposTurnos, error, fetchTiposTurnos } = useTiposTurnos();

  //cambiar indices por IDS
  const idsTurnos = tiposTurnos.map((t, index) => t.id);

  //Todos los BOXES + CAJEROS
  const [boxes, setBoxes] = useState([]);
  const fetchBoxesCajero = async () => {
    const res = await axios.get("http://localhost:5000/api/boxes/boxesCajero");
    setBoxes(res.data);
  };


  useEffect(() => {

    //Tipos Turnos Todos
    fetchTiposTurnos();

    //Turnos asociados al CAJERO ACTUAL
    fetchTurnosCajero(box_id, cajero_id);

    //Todos los BOXES + CAJEROS
    fetchBoxesCajero();
    //fetchBoxes();

    const interval = setInterval(() => {
      fetchTurnosCajero(box_id, cajero_id);
      fetchBoxesCajero();
    }, 5000); // cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const [actual, setActual] = useState(null);

  const llamarSiguiente = async () => {

    if (actual) {

      alert('Debe Finalizar el turno actual')

    } else {

      //find" trae el primer elemento de la lista PENDIENTE y del TIPO DE ATENCION
      const siguiente = turnos.find((t) => t.estado === "pendiente");
      if (!siguiente) return;

      setTurnos((prev) =>
        prev.map((t) =>
          t.id === siguiente.id ? { ...t, estado: "en_atencion" } : t
        )
      );

      setActual({ ...siguiente, cajero: usuario });

      /*¨1- asigno BOX y CAJERO al ultimo turno en FRONTEND por ID */
      const assignBox = await axios.put(`http://localhost:5000/api/turnos/${siguiente.id}/asignar-box`, {
        box_id: box_id,
        cajero_id: cajero_id
      });

    }
  };

  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => {
    setShowModal2(false);
  };
  const handleDerivarTurno = () => {

    if (!actual) return alert('Primero Debe llamar el siguiente Turno');

    setShowModal2(true);
  };

  const finalizarTurno = async () => {

    if (!actual) return alert('Primero Debe llamar el siguiente Turno');

    setShowModal(true);

    setTurnos((prev) =>
      prev.map((t) =>
        t.id === actual.id ? { ...t, estado: "finalizado" } : t
      )
    );

    setActual(null);

    /*¨3- asigno ESTADO (en Atencion) por ID*/
    const finishTurn = await axios.put(`http://localhost:5000/api/turnos/${actual.id}/finalizar`);

  };

  var boxActual = useState(localStorage.getItem("box_actual"));

  const handleLinkClick = () => {

    //Borrar el estado en BOX a INACTIVO
    axios.put(`http://localhost:5000/api/boxes/${box_id}/estado`, {
      activo: "0",
      cajero_actual: 0
    });

    localStorage.clear(); // o sessionStorage.clear()
  };

  const [showModal, setShowModal] = useState(false);

  // Función para manejar el clic en el botón de la imagen
  const handleButtonClick = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //nueva factura
  const [factura, setFactura] = useState({
    prefijo: '',
    letra: '',
    numero: '',
    pedidoGrande: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFactura({
      ...factura,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  const [facturaData, setFacturaData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFactura = async (factura) => {
    try {
      setLoading(true);

      const facturas = await obtenerFacturas(factura);

      setFacturaData(facturas.data.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error("Error cargando facturas", error);
    }
  };

  const handleConsultar = () => {
    fetchFactura(factura)
  };

  //1_seleccion del BOX
  const [boxSeleccionado, setBoxSeleccionado] = useState("");
  const [cajeroSeleccionado, setCajeroSeleccionado] = useState("");

  const handleSeleccion = async (value) => {
    //aqui actualizo el estado a la DB
    const seleccion = value.split(" - ");

    setBoxSeleccionado(seleccion[0]);
    setCajeroSeleccionado(seleccion[1]);
  };


  //2_seleccion del TIPO turno
  const [tipoSelected, setTipoSelected] = useState(0);
  const handleChangeTipo = (turno) => {
    setTipoSelected(turno);
  };


  const handleDerivarEndpoint = async (actual) => {

    //id del turno ACTUAL
    let id = actual.id;

    if (!boxSeleccionado || !tipoSelected || !actual) return alert('Seleccione un Tipo de Turno');

    try {

      const res = axios.put(`http://localhost:5000/api/turnos/${id}/cambiar-box`, {
        tipo_id: tipoSelected,
        cajero_id: cajeroSeleccionado,
        box_id: (boxSeleccionado !== "Sin box") ? boxSeleccionado : null,
      });

      alert('Derivado Exitosamente');

      setShowModal2(false);
      setActual(null);

      console.log("Respuesta del servidor:", res.data);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }

  };

  //matcheo TURNOS con TIPO TURNOS (obtengo Color, Desc, etc.)
  function mergeById(array1, array2, key = "id") {
    const map = new Map(array2.map(item => [item[key], item]));
    return array1
      .filter(item1 => map.has(item1[key]))
      .map(item1 => ({
        ...item1,
        ...map.get(item1[key])
      }));
  };

  const resultado = mergeById(tiposTurnosCaj, tiposTurnos);

  return (
    <>
      <Navbar title="💼 Panel de Usuario" />
      <div className="vh-100 d-flex flex-column p-4" style={{ backgroundColor: "#f4f6f8" }}>

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4" style={{ fontFamily: "Inter" }}>

          <div className="px-3 py-2 rounded" style={{ fontSize: "14px", backgroundColor: 'rgb(247, 224, 23)' }}>
            Usuario: <strong>👤{usuario}</strong>
          </div>

          <div className="px-3 py-2 rounded" style={{ fontSize: "14px", backgroundColor: 'rgb(247, 224, 23)' }}>
            Box Actual: <strong>{box_id}</strong>
          </div>

          <div className="px-3 py-2 rounded" style={{ fontSize: "14px", backgroundColor: 'rgb(247, 224, 23)' }}>
            Tipo Atención:
            {
              resultado.map((t) =>
                <Badge key={t.index} pill style={{ backgroundColor: "#6f42c1", marginLeft: '5px' }}>
                  {t.descripcion}
                </Badge>
              )
            }
          </div>

          <div>
            <Link
              route="/Home"
              title="volver"
              backgroundColor="rgb(222, 59, 33)"
              color='white'
              marginTop='20px'
              marginRight='5px'
              marginBottom='10px'
              marginLeft='5px'
            />

            <Link
              onClick={handleLinkClick}
              route="/Login"
              title="🚪➡️ Cerrar Session"
              backgroundColor='rgb(247, 224, 23)'
              color='black'
              marginTop='none'
              marginRight='5px'
              marginBottom='10px'
              marginLeft='15px'
            />
          </div>
        </div>

        {/* TURNO ACTUAL */}
        <div
          className="card text-center mb-4 shadow-lg border-0"
          style={{
            background: "#fff",
            color: "#333",
            borderBottom: "1px solid #eee"
          }}
        >
          <div className="card-body py-5">

            <h5 className="mb-3">Turno actual</h5>

            {actual ? (
              <>
                <h1 className="display-3 fw-bold mb-3"
                  style={{ fontFamily: "Inter" }}>
                  {actual.codigo}
                </h1>

                <span
                  className="px-3 py-2 rounded"
                  style={{ fontFamily: "Inter" }}
                >
                  {actual.derivado === 'si' ? "Derivado" : null}
                </span>

                <span
                  className="px-3 py-2 rounded"
                  style={{ fontFamily: "Inter" }}
                >
                  {actual.derivado ? <button
                    className="btn btn-warning px-4 py-2 fw-bold"
                    style={{ borderRadius: "12px", fontFamily: "Inter" }}
                    onClick={handleButtonClick}
                  >
                    Ver Factura
                  </button> : null}
                </span>

                <span
                  className="px-3 py-2 rounded text-white"
                  style={{ fontFamily: "Inter" }}
                >
                  {actual.descripcion}
                </span>

                <div className="mt-3 text-muted"
                  style={{ fontFamily: "Inter" }}>
                  Atendido por: <strong>{actual.cajero}</strong>
                </div>
              </>
            ) : (
              <h4 className="fw-bold">Sin turno asignado</h4>
            )}
          </div>
        </div>

        {/* BOTONES */}
        <div className="d-flex justify-content-center gap-3 mb-4">

          <button
            className="btn btn-success px-4 py-2 fw-bold"
            style={{ borderRadius: "12px", fontFamily: "Inter" }}
            onClick={llamarSiguiente}
          >
            ▶ Llamar siguiente
          </button>

          <button
            className="btn btn-danger px-4 py-2 fw-bold"
            style={{ borderRadius: "12px", fontFamily: "Inter" }}
            onClick={finalizarTurno}
          >
            ❌ Finalizar
          </button>

          <button
            className="btn btn-warning px-4 py-2 fw-bold"
            style={{ borderRadius: "12px", fontFamily: "Inter" }}
            onClick={handleDerivarTurno}
          >
            ➡️ Derivar
          </button>
        </div>

        {/* LISTA */}
        <div
          className="card shadow-lg border-0 flex-grow-1"
          style={{
            fontFamily: "Inter",
            background: "#1a1a1a",
            borderRadius: "16px",
            overflow: "hidden"
          }}
        >
          <div className="card-header bg-dark border-0 fw-bold">
            Turnos en espera
          </div>

          <ul className="list-group list-group-flush">
            {turnos
              .filter((t) => t.estado === "pendiente")
              .map((t) => (
                <li
                  key={t.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    background: "#222",
                    color: "white",
                    border: "none"
                  }}
                >
                  <span className="fw-bold">{t.codigo}</span>
                  <span className="fw-bold">{t.estado}</span>
                  <span className="fw-bold">
                    Tipo Atención:
                    <span
                      className="px-3 py-1 rounded text-white fw-bold"
                      style={{ backgroundColor: t.color, marginLeft: '5px' }}
                    >
                      {t.descripcion}
                    </span>
                  </span>
                  <span className="fw-bold">
                    {t.derivado === 'si' ? 'Derivado' : null}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Modal Factura*/}
      {
        <ModalFactura
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          factura={factura}
          handleChange={handleChange}
          handleConsultar={handleConsultar}
          facturaData={facturaData}
          loading={loading}
        />
      }
      {/* Modal Derivar*/}
      {
        <ModalDerivar
          showModal2={showModal2}
          usuario={usuario}
          actual={actual}
          handleCloseModal2={handleCloseModal2}
          handleSeleccion={handleSeleccion}
          handleChangeTipo={handleChangeTipo}
          boxSeleccionado={boxSeleccionado}
          boxes={boxes}
          idsTurnos={idsTurnos}
          tiposTurnos={tiposTurnos}
          handleDerivarEndpoint={handleDerivarEndpoint}
        />
      }
    </>
  )
}

export default Cajero;