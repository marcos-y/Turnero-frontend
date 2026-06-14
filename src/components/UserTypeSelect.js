import React from "react";

function UserTypeSelect(props) {
  return (
      <select
        style={{fontFamily: "Inter, sans-serif"}}
        id="userType"
        className="form-select shadow-sm"
        //value={value}
        onChange={(e) => props.handleChange(props.idUser, e.target.value)}
      >
        <option value="">Seleccione un Rol</option>

        {props.array.map((type) => (
          type.activo === 1 ? 
          <option 
            key={type.id_tipo_usuario} 
            value={type.id_tipo_usuario}>
              {type.nombre}
          </option>
          :
          null
        ))}
      </select>
  );
}

export default UserTypeSelect;