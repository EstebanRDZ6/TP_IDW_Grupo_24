/**
 * VETERINARIA LA MARY
 * Módulo de Veterinarios.
 *
 * Listado público de profesionales (index.html) y CRUD administrativo
 * (pages/veterinarios.html).
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

  const inputBusqueda = document.getElementById("buscarVeterinario");
  const textoBusqueda = inputBusqueda
    ? inputBusqueda.value.trim().toLowerCase()
    : "";
  const veterinarios = obtenerVeterinarios().filter((veterinario) =>
    [
      veterinario.matricula,
      veterinario.nombre,
      veterinario.especializacion,
    ].some((dato) => String(dato).toLowerCase().includes(textoBusqueda)),
  );

  if (veterinarios.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 5;
    celda.className = "text-center text-muted";
    celda.textContent = textoBusqueda
      ? "No se encontraron veterinarios."
      : "No hay veterinarios registrados.";
    fila.append(celda);
    tabla.replaceChildren(fila);
    return;
  }

  const filas = veterinarios.map((veterinario) => {
    const fila = document.createElement("tr");
    const matriculaCelda = document.createElement("td");
    const nombreCelda = document.createElement("td");
    const especializacionCelda = document.createElement("td");
    const valorCelda = document.createElement("td");
    const accionesCelda = document.createElement("td");
    const editar = document.createElement("button");
    const eliminar = document.createElement("button");
    const iconoEditar = document.createElement("i");
    const iconoEliminar = document.createElement("i");

    matriculaCelda.textContent = String(veterinario.matricula);
    nombreCelda.textContent = veterinario.nombre;
    especializacionCelda.textContent = veterinario.especializacion;
    valorCelda.textContent = formatearMoneda(veterinario.valorConsulta);

    editar.type = "button";
    editar.className = "btn btn-sm btn-outline-primary me-1";
    editar.dataset.accion = "editar";
    editar.dataset.idVeterinario = veterinario.idVeterinario;
    iconoEditar.className = "bi bi-pencil me-1";
    iconoEditar.setAttribute("aria-hidden", "true");
    editar.append(iconoEditar, document.createTextNode("Editar"));

    eliminar.type = "button";
    eliminar.className = "btn btn-sm btn-outline-danger";
    eliminar.dataset.accion = "eliminar";
    eliminar.dataset.idVeterinario = veterinario.idVeterinario;
    iconoEliminar.className = "bi bi-trash me-1";
    iconoEliminar.setAttribute("aria-hidden", "true");
    eliminar.append(iconoEliminar, document.createTextNode("Eliminar"));

    accionesCelda.className = "text-end";
    accionesCelda.append(editar, eliminar);
    fila.append(
      matriculaCelda,
      nombreCelda,
      especializacionCelda,
      valorCelda,
      accionesCelda,
    );

    return fila;
  });

  tabla.replaceChildren(...filas);
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

  const inputBusqueda =
    document.getElementById("buscarVeterinario");

  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", renderizarTablaVeterinarios);
  }

  /* Listado administrativo */
  if (tablaVeterinarios) {
    renderizarTablaVeterinarios();

    tablaVeterinarios.addEventListener("click", function (event) {
      const objetivo = event.target;

      if (!(objetivo instanceof Element)) {
        return;
      }

      const boton = objetivo.closest("button[data-accion]");

      if (!boton) {
        return;
      }

      if (boton.dataset.accion === "editar") {
        editarVeterinario(boton.dataset.idVeterinario);
      }

      if (boton.dataset.accion === "eliminar") {
        eliminarVeterinarioUI(boton.dataset.idVeterinario);
      }
    });
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

        if (!Number.isInteger(matricula) || matricula <= 0) {
          mostrarAlerta(
            "La matrícula debe ser un número entero positivo.",
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