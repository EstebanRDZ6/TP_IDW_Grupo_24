/**
 * VETERINARIA LA MARY
 * Funcionalidad opcional: comprobante de turno en PDF.
 *
 * Requiere que la librería jsPDF esté cargada en la página
 * (ver CDN incluido en pages/turnos.html) antes de este script:
 *
 *   <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
 */

/**
 * Genera y descarga un comprobante en PDF para un turno.
 *
 * @param {Object} turno objeto turno con idTurno, fechaHora, mascota, veterinario.
 * @param {Object} mascota objeto mascota asociado al turno.
 * @param {Object} veterinario objeto veterinario asociado al turno.
 */
function generarComprobantePDF(turno, mascota, veterinario) {
  if (typeof window.jspdf === "undefined") {
    mostrarAlerta(
      "No se pudo generar el PDF: falta cargar la librería jsPDF.",
      "danger",
    );
    return;
  }

  const { jsPDF } = window.jspdf;
  const documento = new jsPDF();

  documento.setFontSize(16);
  documento.text("Veterinaria La Mary", 20, 20);

  documento.setFontSize(12);
  documento.text("Comprobante de turno", 20, 30);

  documento.setFontSize(10);
  documento.text(`N° de turno: ${turno.idTurno}`, 20, 45);
  documento.text(`Fecha y hora: ${formatearFecha(turno.fechaHora)}`, 20, 52);
  documento.text(`Mascota: ${mascota ? mascota.nombreMascota : "-"}`, 20, 59);
  documento.text(`Dueño: ${mascota ? mascota.nombreDuenio : "-"}`, 20, 66);
  documento.text(
    `Veterinario: ${veterinario ? veterinario.nombre : "-"}`,
    20,
    73,
  );
  documento.text(
    `Especialización: ${veterinario ? veterinario.especializacion : "-"}`,
    20,
    80,
  );
  documento.text(
    `Valor de consulta: ${
      veterinario ? formatearMoneda(veterinario.valorConsulta) : "-"
    }`,
    20,
    87,
  );

  documento.save(`comprobante-turno-${turno.idTurno}.pdf`);
}
