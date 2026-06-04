import { jsPDF } from "jspdf";

export const generarPDF = (turno) => {

    const ahora = new Date();
    const fechaActual = ahora.toLocaleDateString();
    const horaActual = ahora.toLocaleTimeString();

    const doc = new jsPDF();

    doc.text([
        "----------------------------------",
        "UNIBER",
        " ----------------------------------",
        `TURNO N°: ${turno}`,
        "SECTOR: CAJA",
        "TRÁMITE: PAGOS",
        `Fecha: ${fechaActual} `,
        `Hora: ${horaActual}`,
        "----------------------------------",
        "Por favor espere a ser llamado",
        "en pantalla o por altavoz.",
        "----------------------------------",
        "Gracias por su visita",
        "----------------------------------",
    ], 70, 30);

    /*doc.text("Hola, este es tu PDF generado desde React", 10, 10);*/

    doc.output("dataurlnewwindow");
};

