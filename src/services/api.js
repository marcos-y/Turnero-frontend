import axios from "axios";
const API_URL = "https://fenixapi.uniber.com.ar:61625/getcmp/";

export const obtenerFacturas = async (factura) => {
    try {

        const response = await axios.post(API_URL, {
            un: "SUPERMAT",
            letra_factura: factura.letra,
            prefijo_factura: factura.prefijo,
            numero_factura: factura.numero,
            suc: 7,
        },
            {
                headers: {
                    //Authorization: `Bearer ${token}`,
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwidXNlcklkIjo2LCJ1c2VyTWFpbCI6InlvbGRpbWFyY29zQGdtYWlsLmNvbSIsIm1vZHVsZXMiOlsidHVybmVybyJdLCJpYXQiOjE3Nzg4MDM1NzV9.LUnFgR1KgHgfhcK2Q-1Z3ztFJ869kuQ8tHVP30kh58w",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Error al obtener usuarios");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};