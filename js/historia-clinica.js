/**
 * VETERINARIA LA MARY
 * Módulo de Historia Clínica.
 *
 * Alta de entradas, visualización del historial completo de una mascota
 * (filtro) y eliminación. Al registrar una entrada se actualiza el peso
 * actual de la mascota, manteniendo el peso histórico de cada visita
 * dentro de la entrada.
 *
 * Campos de cada entrada: idHistoriaClinica, mascota, veterinario,
 * fechaHora, peso, temperatura, proximoControl, observaciones.
 *
 * Página que usa este archivo: pages/historia-clinica.html
 */

/**
 * Completa un <select> con opciones a partir de una colección.
 * Reutiliza completarSelect definida en js/turnos.js si está cargada;
 * si no, se define aquí una versión local.
 */
if (typeof completarSelect !== "function") {
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
}

function completarSelectsHistoria() {
  completarSelect(
    document.getElementById("mascotaHistoria"),
    obtenerMascotas(),
    "idMascota",
    (m) => `${m.nombreMascota} (${m.nombreDuenio})`,
    "Seleccionar mascota...",
  );

  completarSelect(
    document.getElementById("veterinarioHistoria"),
    obtenerVeterinarios(),
    "idVeterinario",
    (v) => `${v.nombre} - ${v.especializacion}`,
    "Seleccionar veterinario...",
  );
}

function completarFiltroMascota() {
  completarSelect(
    document.getElementById("filtroMascotaHistoria"),
    obtenerMascotas(),
    "idMascota",
    (m) => `${m.nombreMascota} (${m.nombreDuenio})`,
    "Todas las mascotas",
  );
}

function renderizarTablaHistorias() {
  const filtroMascota = document.getElementById("filtroMascotaHistoria").value;
  const tabla = document.getElementById("tablaHistorias");

  let historias = obtenerHistoriasClinicas();

  if (filtroMascota) {
    historias = historias.filter(
      (historia) => historia.mascota === filtroMascota,
    );
  }

  historias.sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));

  tabla.replaceChildren();

  if (historias.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.colSpan = 8;
    celda.className = "text-center text-muted";
    celda.textContent = "No hay historias clínicas registradas.";
    fila.append(celda);
    tabla.append(fila);
    return;
  }

  historias.forEach((historia) => {
    const mascota = buscarMascotaPorId(historia.mascota);
    const veterinario = buscarVeterinarioPorId(historia.veterinario);

    const fila = document.createElement("tr");

    const celdas = [
      formatearFecha(historia.fechaHora),
      mascota ? mascota.nombreMascota : "Mascota eliminada",
      veterinario ? veterinario.nombre : "Veterinario eliminado",
      `${historia.peso} kg`,
      `${historia.temperatura} °C`,
      historia.proximoControl
        ? new Intl.DateTimeFormat("es-AR").format(
            new Date(`${historia.proximoControl}T00:00:00`),
          )
        : "-",
      historia.observaciones || "-",
    ];

    celdas.forEach((texto) => {
      const celda = document.createElement("td");
      celda.textContent = texto;
      fila.append(celda);
    });

    const accionesCelda = document.createElement("td");
    const botonEliminar = document.createElement("button");

    accionesCelda.className = "text-end";
    botonEliminar.type = "button";
    botonEliminar.className = "btn btn-sm btn-outline-danger";
    botonEliminar.dataset.idHistoria = historia.idHistoriaClinica;
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i> Eliminar';

    accionesCelda.append(botonEliminar);
    fila.append(accionesCelda);
    tabla.append(fila);
  });
}

function eliminarHistoriaUI(idHistoriaClinica) {
  if (!confirmarAccion("¿Está seguro de eliminar esta entrada?")) {
    return;
  }

  eliminarHistoriaClinica(idHistoriaClinica);
  renderizarTablaHistorias();
  mostrarAlerta("Entrada eliminada correctamente.", "success");
}

function prepararNuevaHistoria() {
  document.getElementById("formHistoria").reset();
  completarSelectsHistoria();
}

/**
 * Actualiza el peso actual de la mascota con el peso registrado
 * en la nueva entrada de historia clínica.
 */
function actualizarPesoActualMascota(idMascota, peso) {
  const mascotas = obtenerMascotas();
  const mascota = mascotas.find((m) => m.idMascota === idMascota);

  if (!mascota) {
    return;
  }

  mascota.peso = peso;
  guardarMascotas(mascotas);
}

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formHistoria");
  const tabla = document.getElementById("tablaHistorias");
  const botonNuevaHistoria = document.getElementById("btnNuevaHistoria");
  const filtroMascota = document.getElementById("filtroMascotaHistoria");

  botonNuevaHistoria.addEventListener("click", prepararNuevaHistoria);

  filtroMascota.addEventListener("change", renderizarTablaHistorias);

  tabla.addEventListener("click", function (event) {
    const boton = event.target.closest("button[data-id-historia]");

    if (!boton) {
      return;
    }

    eliminarHistoriaUI(boton.dataset.idHistoria);
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const idMascota = document.getElementById("mascotaHistoria").value;
    const idVeterinario = document.getElementById("veterinarioHistoria").value;
    const fechaHora = document.getElementById("fechaHoraHistoria").value;
    const peso = Number(document.getElementById("pesoHistoria").value);
    const temperatura = Number(
      document.getElementById("temperaturaHistoria").value,
    );
    const proximoControl = document.getElementById(
      "proximoControlHistoria",
    ).value;
    const observaciones = document.getElementById("observaciones").value.trim();

    if (!idMascota || !idVeterinario || !fechaHora) {
      mostrarAlerta("Completá mascota, veterinario y fecha.", "danger");
      return;
    }

    if (Number.isNaN(new Date(fechaHora).getTime())) {
      mostrarAlerta("La fecha y hora no son válidas.", "danger");
      return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
      mostrarAlerta("El peso debe ser un número decimal positivo.", "danger");
      return;
    }

    if (!Number.isFinite(temperatura) || temperatura < 30 || temperatura > 45) {
      mostrarAlerta(
        "La temperatura debe estar entre 30 y 45 grados.",
        "danger",
      );
      return;
    }

    const historias = obtenerHistoriasClinicas();

    historias.push({
      idHistoriaClinica: generarUID(),
      mascota: idMascota,
      veterinario: idVeterinario,
      fechaHora,
      peso,
      temperatura,
      proximoControl: proximoControl || null,
      observaciones,
    });

    guardarHistoriasClinicas(historias);
    actualizarPesoActualMascota(idMascota, peso);
    renderizarTablaHistorias();
    prepararNuevaHistoria();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalHistoria"),
    );

    if (modal) {
      modal.hide();
    }

    mostrarAlerta("Historia clínica registrada correctamente.", "success");
  });

  completarFiltroMascota();
  renderizarTablaHistorias();
});
