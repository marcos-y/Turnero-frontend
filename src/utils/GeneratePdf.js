import { jsPDF } from "jspdf";

export const generarPDF = (turno) => {

    /*
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
    //doc.output("dataurlnewwindow");*/

    //const contenido = document.getElementById("print-area").innerHTML;

    const ahora = new Date();
    const fechaActual = ahora.toLocaleDateString();
    const horaActual = ahora.toLocaleTimeString();

    const win = window.open("", "_blank");

    /*
    win.document.write(`
    <html>
      <body onload="window.print(); window.close();">
        <h2>🧾 IMPRESIÓN DE PRUEBA</h2>
        <p>Este es un test de impresión</p>
        <p>Fecha: ${new Date().toLocaleString()}</p>
      </body>
    </html>
    `);*/

    win.document.write(`
    <html>
      <body onload="window.print(); window.close();">
        <h2>UNIBER</h2>
        <p>----------------------------------</p>
        <p>TURNO N°: ${turno}</p>
        <p>SECTOR: CAJA</p>
        <p>TRÁMITE: PAGOS</p>
        <p>Fecha: ${fechaActual}</p>
        <p>Hora: ${horaActual}</p>
        <p>----------------------------------</p>
        <p>Por favor espere a ser llamado</p>
        <p>en pantalla o por altavoz.</p>
        <p>----------------------------------</p>
        <p>Gracias por su visita</p>
      </body>
    </html>`);

    win.document.close();
};

