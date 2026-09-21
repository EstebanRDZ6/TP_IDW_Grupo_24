/**
 * VETERINARIA LA MARY
 * Módulo de Turnos.
 *
 * Alta y baja de turnos, filtrado por veterinario y fecha, generación
 * de comprobante en PDF (js/reportes.js) y verificación de feriados
 * argentinos consumiendo la API REST pública Nager.Date (js/api.js).
 *
 * Página que usa este archivo: pages/turnos.html
 */

/**
 * Completa un <select> con opciones a partir de una colección.
 *
 * @param {HTMLSelectElement} select
 * @param {Array} coleccion
 * @param {string} claveId
 * @param {(item: Object) => string} textoOpcion
 * @param {string} textoPlaceholder
 */
function completarSelect(
  select,
  coleccion,
  claveId,
  textoOpcion,
  textoPlaceholder,
) {
  select.replaceChildren();

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = textoPlaceholder;
  select.append(placeholder);

  coleccion.forEach((item) => {
    const opcion = document.createElement("option");
    opcion.value = item[claveId];
    opcion.textContent = textoOpcion(item);
    select.append(opcion);
  });
}

function completarSelectsTurno() {
  completarSelect(
    document.getElementById("mascotaTurno"),
    obtenerMascotas(),
    "idMascota",
    (m) => `${m.nombreMascota} (${m.nombreDuenio})`,
    "Seleccionar mascota...",
  );

  completarSelect(
    document.getElementById("veterinarioTurno"),
    obtenerVeterinarios(),
    "idVeterinario",
    (v) => `${v.nombre} - ${v.especializacion}`,
    "Seleccionar veterinario...",
  );
}

function completarFiltroVeterinario() {
  completarSelect(
    document.getElementById("filtroVeterinarioTurno"),
    obtenerVeterinarios(),
    "idVeterinario",
    (v) => v.nombre,
    "Todos los veterinarios",
  );
}

function renderizarTablaTurnos() {
  const filtroVeterinario = document.getElementById(
    "filtroVeterinarioTurno",
  ).value;
  const filtroFecha = document.getElementById("filtroFechaTurno").value;
  const tabla = document.getElementById("tablaTurnos");

  let turnos = obtenerTurnos();

  if (filtroVeterinario) {
    turnos = turnos.filter((turno) => turno.veterinario === filtroVeterinario);
  }

  if (filtroFecha) {
    turnos = turnos.filter((turno) => turno.fechaHora.startsWith(filtroFecha));
  }

  turnos.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));

  tabla.replaceChildren();

  if (turnos.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.colSpan = 5;
    celda.className = "text-center text-muted";
    celda.textContent = "No hay turnos registrados.";
    fila.append(celda);
    tabla.append(fila);
    return;
  }

  turnos.forEach((turno) => {
    const mascota = buscarMascotaPorId(turno.mascota);
    const veterinario = buscarVeterinarioPorId(turno.veterinario);

    const fila = document.createElement("tr");

    const fechaCelda = document.createElement("td");
    const mascotaCelda = document.createElement("td");
    const veterinarioCelda = document.createElement("td");
    const valorCelda = document.createElement("td");
    const accionesCelda = document.createElement("td");
    const botonPDF = document.createElement("button");
    const botonEliminar = document.createElement("button");

    fechaCelda.textContent = formatearFecha(turno.fechaHora);
    mascotaCelda.textContent = mascota
      ? `${mascota.nombreMascota} (${mascota.nombreDuenio})`
      : "Mascota eliminada";
    veterinarioCelda.textContent = veterinario
      ? veterinario.nombre
      : "Veterinario eliminado";
    valorCelda.textContent = veterinario
      ? formatearMoneda(veterinario.valorConsulta)
      : "-";
    accionesCelda.className = "text-end";

    botonPDF.type = "button";
    botonPDF.className = "btn btn-sm btn-outline-primary me-1";
    botonPDF.dataset.accion = "pdf";
    botonPDF.dataset.idTurno = turno.idTurno;
    botonPDF.innerHTML = '<i class="bi bi-file-pdf"></i> Comprobante';

    botonEliminar.type = "button";
    botonEliminar.className = "btn btn-sm btn-outline-danger";
    botonEliminar.dataset.accion = "eliminar";
    botonEliminar.dataset.idTurno = turno.idTurno;
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i> Eliminar';

    accionesCelda.append(botonPDF, botonEliminar);
    fila.append(
      fechaCelda,
      mascotaCelda,
      veterinarioCelda,
      valorCelda,
      accionesCelda,
    );
    tabla.append(fila);
  });
}

function eliminarTurnoUI(idTurno) {
  if (!confirmarAccion("¿Está seguro de eliminar este turno?")) {
    return;
  }

  eliminarTurno(idTurno);
  renderizarTablaTurnos();
  mostrarAlerta("Turno eliminado correctamente.", "success");
}

function generarComprobanteUI(idTurno) {
  const turno = buscarTurnoPorId(idTurno);

  if (!turno) {
    mostrarAlerta("No se encontró el turno.", "danger");
    return;
  }

  const mascota = buscarMascotaPorId(turno.mascota);
  const veterinario = buscarVeterinarioPorId(turno.veterinario);

  if (!mascota || !veterinario) {
    mostrarAlerta(
      "No se puede generar el comprobante porque la mascota o el veterinario ya no existen.",
      "danger",
    );
    return;
  }

  generarComprobantePDF(turno, mascota, veterinario);
}

function prepararNuevoTurno() {
  document.getElementById("formTurno").reset();
  completarSelectsTurno();
}

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formTurno");
  const tabla = document.getElementById("tablaTurnos");
  const botonNuevoTurno = document.getElementById("btnNuevoTurno");
  const filtroVeterinario = document.getElementById("filtroVeterinarioTurno");
  const filtroFecha = document.getElementById("filtroFechaTurno");

  botonNuevoTurno.addEventListener("click", prepararNuevoTurno);

  filtroVeterinario.addEventListener("change", renderizarTablaTurnos);
  filtroFecha.addEventListener("change", renderizarTablaTurnos);

  tabla.addEventListener("click", function (event) {
    const boton = event.target.closest("button[data-accion]");

    if (!boton) {
      return;
    }

    if (boton.dataset.accion === "eliminar") {
      eliminarTurnoUI(boton.dataset.idTurno);
    }

    if (boton.dataset.accion === "pdf") {
      generarComprobanteUI(boton.dataset.idTurno);
    }
  });

  formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fechaHora = document.getElementById("fechaHoraTurno").value;
    const idMascota = document.getElementById("mascotaTurno").value;
    const idVeterinario = document.getElementById("veterinarioTurno").value;

    if (!fechaHora || !idMascota || !idVeterinario) {
      mostrarAlerta("Completá todos los campos del turno.", "danger");
      return;
    }

    const fechaTurno = new Date(fechaHora);

    if (Number.isNaN(fechaTurno.getTime())) {
      mostrarAlerta("La fecha y hora del turno no son válidas.", "danger");
      return;
    }

    if (fechaTurno < new Date()) {
      mostrarAlerta("No se puede agendar un turno en el pasado.", "danger");
      return;
    }

    const turnos = obtenerTurnos();
    const veterinarioOcupado = turnos.some(
      (turno) =>
        turno.veterinario === idVeterinario && turno.fechaHora === fechaHora,
    );

    if (veterinarioOcupado) {
      mostrarAlerta(
        "El veterinario ya tiene un turno agendado en esa fecha y hora.",
        "danger",
      );
      return;
    }

    // Dato externo: se consulta la API de feriados antes de confirmar.
    const feriado = await buscarFeriadoPorFecha(fechaHora.substring(0, 10));

    if (feriado) {
      const continuar = confirmarAccion(
        `La fecha seleccionada es feriado nacional (${feriado.localName}). ¿Desea agendar el turno de todas formas?`,
      );

      if (!continuar) {
        return;
      }
    }

    turnos.push({
      idTurno: generarUID(),
      fechaHora,
      mascota: idMascota,
      veterinario: idVeterinario,
    });

    guardarTurnos(turnos);
    renderizarTablaTurnos();
    prepararNuevoTurno();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalTurno"),
    );

    if (modal) {
      modal.hide();
    }

    mostrarAlerta("Turno registrado correctamente.", "success");
  });

  completarFiltroVeterinario();
  renderizarTablaTurnos();
});
