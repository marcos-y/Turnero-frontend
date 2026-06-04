import { Link } from "react-router-dom";

export default function LinkCustom(props) {
    return (
        <>
            <Link to={props.route}
                onClick={props.onClick ? () => props.onClick() : null} 
                style={{
                    borderBottoLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    borderBottomStyle: 'none',
                    borderBottomWidth: '0px',
                    borderRadius: "6px",
                    padding: "10px 16px",
                    maxWidth: "298px",
                    backgroundColor: props.backgroundColor,
                    fontfamily: props.fontfamily,
                    fontSize: '11px',
                    fontStyle: 'normal',
                    fontWeight: '600px',
                    color: props.color,
                    textDecoration: "none",
                    marginTop: props.marginTop,
                    marginBottom: props.marginBottom,
                    marginRight: props.marginRight,
                    marginLeft: props.marginLeft,
                    margin: props.margin,
                    float: props.float
                }}
            >
                {props.title}
            </Link>
        </>
)};
