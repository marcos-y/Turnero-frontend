import React from "react";

const Button = (props) => {
    return (
        <button
            className={`nav-link ${props.tab === props.option ? "active" : ""}`}
            style={props.selected === 0 ? props.styleSelected : props.style}
            onClick={() => props.handleClick({ opcion: props.option })}
        >
            {props.title}
        </button>
    );
};

export default Button;