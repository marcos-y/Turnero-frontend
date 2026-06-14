import React from "react";
import LinkCustom from "./Link";

const Navbar = (props) => {


  {/*CERRAR SESION*/ }
  const handleLinkClick = () => {

    //Borrar el estado en BOX a INACTIVO
    //if (boxSeleccionado !== '') {
    //    axios.delete(`http://localhost:5000/api/boxes/${boxSeleccionado}`)
    //}

    localStorage.clear();
  };

  return (
    <nav className="navbar" style={{ backgroundColor: 'rgb(247, 224, 23)' }}>
      <div className="container-fluid space-around">

        {props.title === "🗂️ Panel de Administracion" ?
          <LinkCustom
            //onClick={handleLinkClick}
            route="/Home"
            title="Volver"
            backgroundColor="rgb(222, 59, 33)"
            color='white'
            marginTop='20px'
            marginRight='5px'
            marginBottom='10px'
            float="right"
          />
          :
          ""
        }

        <span
          className="navbar-brand mb-0 text-center fw-bold"
          style={{ fontSize: "18px", letterSpacing: "2px", fontFamily: "Inter, sans-serif" }}
        >
          {props.title}
        </span>

        {props.title === "🗂️ Panel de Administracion" ?
          <LinkCustom
            onClick={handleLinkClick}
            route="/Login"
            title="Cerrar Sesión"
            backgroundColor="rgb(222, 59, 33)"
            color='white'
            marginTop='20px'
            marginRight='5px'
            marginBottom='10px'
            float="right"
          />
          :
          ""
           }
      </div>

    </nav>
  );
};

export default Navbar;