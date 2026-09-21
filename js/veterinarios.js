/**
 * VETERINARIA LA MARY
 * Módulo de Veterinarios.
 *
 * A cargo de: Oscar Godoy
 *
 * Depende de storage.js (obtenerVeterinarios/guardarVeterinarios/
 * buscarVeterinarioPorId/eliminarVeterinario), utils.js (generarUID,
 * mostrarAlerta, confirmarAccion, esNumeroPositivo, formatearMoneda,
 * escaparHTML) y exportaciones.js (ya resuelto, no tocar).
 *
 * Páginas que usan este archivo:
 *  - index.html            -> listado público (#listadoProfesionales)
 *  - pages/veterinarios.html -> CRUD administrativo
 *
 * Oscar 1: Listado público en la portada.
 * Implementar renderizarListadoPublicoVeterinarios(): debe leer
 * obtenerVeterinarios() e insertar tarjetas (nombre, especializacion,
 * valorConsulta formateado con formatearMoneda) dentro de
 * #listadoProfesionales. Llamarla en un DOMContentLoaded solo si ese
 * elemento existe en la página (para no romper el resto de páginas
 * que también incluyen este script).
 *
 * Oscar 2: Tabla administrativa.
 * Implementar renderizarTablaVeterinarios(): debe leer
 * obtenerVeterinarios() e insertar filas <tr> dentro de
 * #tablaVeterinarios (ver pages/veterinarios.html), con columnas
 * matrícula, nombre, especialización, valor de consulta y botones de
 * Editar/Eliminar.
 *
 * Oscar 3: Alta y edición.
 * El formulario #formVeterinario ya existe en el modal #modalVeterinario
 * con los campos: idVeterinario (hidden), matricula, nombreVeterinario,
 * especializacion, valorConsulta. Escuchar su evento "submit", armar el
 * objeto veterinario (usar generarUID() si es alta), guardarlo con
 * guardarVeterinarios() y volver a renderizar la tabla.
 *
 * Oscar 4: Editar/Eliminar desde la tabla.
 * Implementar editarVeterinario(idVeterinario) (precarga el formulario y
 * abre el modal) y eliminarVeterinarioUI(idVeterinario) (pedir
 * confirmarAccion() antes de llamar a eliminarVeterinario() y volver a
 * renderizar).
 *
 * Oscar 5: Inicialización.
 * En un DOMContentLoaded, llamar a renderizarTablaVeterinarios() si
 * existe #tablaVeterinarios, y a renderizarListadoPublicoVeterinarios()
 * si existe #listadoProfesionales.
 */

/**
 * VETERINARIA LA MARY
 * Módulo de Veterinarios.
 *
 * A cargo de: Oscar Godoy
 */

/* =========================================================
   LISTADO PÚBLICO
   ========================================================= */

function renderizarListadoPublicoVeterinarios() {
  const contenedor = document.getElementById("listadoProfesionales");

  if (!contenedor) {
    return;
  }

  const veterinarios = obtenerVeterinarios();

  if (veterinarios.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <p class="text-center text-muted">
          No hay profesionales disponibles.
        </p>
      </div>
    `;

    return;
  }

  contenedor.innerHTML = veterinarios
  .map(
    (veterinario) => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm rounded-4">
          <div class="card-body text-center p-4">

            <div
              class="d-inline-flex align-items-center justify-content-center
                     rounded-circle bg-primary-subtle text-primary mb-3"
              style="width: 70px; height: 70px;"
            >
              <i class="bi bi-person-badge fs-1"></i>
            </div>

            <h3 class="h4 fw-semibold mb-2">
              ${escaparHTML(veterinario.nombre)}
            </h3>

            <p class="text-muted mb-3">
              ${escaparHTML(veterinario.especializacion)}
            </p>

            <hr>

            <p class="mb-0">
              <span class="text-muted">Valor de consulta</span>
              <br>
              <span class="fs-5 fw-bold text-primary">
                ${formatearMoneda(veterinario.valorConsulta)}
              </span>
            </p>

          </div>
        </div>
      </div>
    `,
  )
  .join("");
}

/* =========================================================
   TABLA ADMINISTRATIVA
   ========================================================= */

function renderizarTablaVeterinarios() {
  const tabla = document.getElementById("tablaVeterinarios");

  if (!tabla) {
    return;
  }

  const veterinarios = obtenerVeterinarios();

  if (veterinarios.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">
          No hay veterinarios registrados.
        </td>
      </tr>
    `;

    return;
  }

  tabla.innerHTML = veterinarios
    .map(
      (veterinario) => `
        <tr>
          <td>${veterinario.matricula}</td>

          <td>
            ${escaparHTML(veterinario.nombre)}
          </td>

          <td>
            ${escaparHTML(veterinario.especializacion)}
          </td>

          <td>
            ${formatearMoneda(veterinario.valorConsulta)}
          </td>

          <td class="text-end">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary me-1"
              onclick="editarVeterinario('${veterinario.idVeterinario}')"
            >
              <i class="bi bi-pencil"></i>
              Editar
            </button>

            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              onclick="eliminarVeterinarioUI('${veterinario.idVeterinario}')"
            >
              <i class="bi bi-trash"></i>
              Eliminar
            </button>
          </td>
        </tr>
      `,
    )
    .join("");
}

/* =========================================================
   EDICIÓN
   ========================================================= */

function editarVeterinario(idVeterinario) {
  const veterinario = buscarVeterinarioPorId(idVeterinario);

  if (!veterinario) {
    mostrarAlerta("No se encontró el veterinario.", "danger");
    return;
  }

  document.getElementById("idVeterinario").value =
    veterinario.idVeterinario;

  document.getElementById("matricula").value =
    veterinario.matricula;

  document.getElementById("nombreVeterinario").value =
    veterinario.nombre;

  document.getElementById("especializacion").value =
    veterinario.especializacion;

  document.getElementById("valorConsulta").value =
    veterinario.valorConsulta;

  const modalElemento =
    document.getElementById("modalVeterinario");

  const modal =
    bootstrap.Modal.getOrCreateInstance(modalElemento);

  modal.show();
}

/* =========================================================
   ELIMINACIÓN
   ========================================================= */

function eliminarVeterinarioUI(idVeterinario) {
  const veterinario = buscarVeterinarioPorId(idVeterinario);

  if (!veterinario) {
    mostrarAlerta("No se encontró el veterinario.", "danger");
    return;
  }

  const confirmado = confirmarAccion(
    `¿Desea eliminar al veterinario ${veterinario.nombre}?`
  );

  if (!confirmado) {
    return;
  }

  eliminarVeterinario(idVeterinario);

  renderizarTablaVeterinarios();

  mostrarAlerta(
    "Veterinario eliminado correctamente.",
    "success"
  );
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const tablaVeterinarios =
    document.getElementById("tablaVeterinarios");

  const listadoProfesionales =
    document.getElementById("listadoProfesionales");

  const formVeterinario =
    document.getElementById("formVeterinario");

  const btnNuevoVeterinario =
    document.getElementById("btnNuevoVeterinario");

  /* Listado administrativo */
  if (tablaVeterinarios) {
    renderizarTablaVeterinarios();
  }

  /* Listado público */
  if (listadoProfesionales) {
    renderizarListadoPublicoVeterinarios();
  }

  /* =======================================================
     ALTA Y EDICIÓN
     ======================================================= */

  if (formVeterinario) {
    formVeterinario.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        const idVeterinario =
          document.getElementById("idVeterinario").value;

        const matricula = Number(
          document.getElementById("matricula").value
        );

        const nombre = document
          .getElementById("nombreVeterinario")
          .value
          .trim();

        const especializacion = document
          .getElementById("especializacion")
          .value
          .trim();

        const valorConsulta = Number(
          document.getElementById("valorConsulta").value
        );

        /* Validaciones */

        if (!esNumeroPositivo(matricula)) {
          mostrarAlerta(
            "La matrícula debe ser un número positivo.",
            "danger"
          );
          return;
        }

        if (!nombre || !especializacion) {
          mostrarAlerta(
            "Completá todos los campos obligatorios.",
            "danger"
          );
          return;
        }

        if (!esNumeroPositivo(valorConsulta)) {
          mostrarAlerta(
            "El valor de consulta debe ser un número positivo.",
            "danger"
          );
          return;
        }

        const veterinarios = obtenerVeterinarios();

        /* =================================================
           EDICIÓN
           ================================================= */

        if (idVeterinario) {
          const indice = veterinarios.findIndex(
            (veterinario) =>
              veterinario.idVeterinario === idVeterinario
          );

          if (indice === -1) {
            mostrarAlerta(
              "No se encontró el veterinario a editar.",
              "danger"
            );
            return;
          }

          veterinarios[indice] = {
            idVeterinario,
            matricula,
            nombre,
            especializacion,
            valorConsulta,
          };
        }

        /* =================================================
           ALTA
           ================================================= */

        else {
          const nuevoVeterinario = {
            idVeterinario: generarUID(),
            matricula,
            nombre,
            especializacion,
            valorConsulta,
          };

          veterinarios.push(nuevoVeterinario);
        }

        /* Guardar en LocalStorage */

        guardarVeterinarios(veterinarios);

        /* Actualizar tabla */

        renderizarTablaVeterinarios();

        /* Limpiar formulario */

        formVeterinario.reset();

        document.getElementById("idVeterinario").value = "";

        /* Cerrar modal */

        const modalElemento =
          document.getElementById("modalVeterinario");

        const modal =
          bootstrap.Modal.getInstance(modalElemento);

        if (modal) {
          modal.hide();
        }

        mostrarAlerta(
          "Veterinario guardado correctamente.",
          "success"
        );
      }
    );
  }

  /* =======================================================
     NUEVO VETERINARIO
     ======================================================= */

  if (btnNuevoVeterinario && formVeterinario) {
    btnNuevoVeterinario.addEventListener(
      "click",
      function () {
        formVeterinario.reset();

        document.getElementById("idVeterinario").value = "";
      }
    );
  }
});

window.addEventListener("pageshow", function () {
  if (document.getElementById("listadoProfesionales")) {
    renderizarListadoPublicoVeterinarios();
  }
});