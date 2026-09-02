// ============================================================
// MASCOTAS
// ============================================================

// Variable para guardar temporalmente la imagen en Base64
let imagenBase64 = "";


// ============================================================
// Renderizar tabla de mascotas
// ============================================================

function renderizarTablaMascotas() {
  const mascotas = obtenerMascotas();
  const tabla = document.getElementById("tablaMascotas");

  if (mascotas.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted">
          No hay mascotas registradas.
        </td>
      </tr>
    `;

    return;
  }

  tabla.innerHTML = "";

  mascotas.forEach(function (mascota) {
    const foto = mascota.imagenMascota
      ? `<img src="${mascota.imagenMascota}" 
             alt="Foto de ${escaparHTML(mascota.nombreMascota)}"
             width="60"
             height="60"
             class="rounded-circle object-fit-cover">`
      : `<i class="bi bi-image fs-2 text-muted"></i>`;

    const fila = `
      <tr>
        <td>${foto}</td>

        <td>${escaparHTML(mascota.nombreMascota)}</td>

        <td>${escaparHTML(mascota.nombreDuenio)}</td>

        <td>${escaparHTML(mascota.color)}</td>

        <td>${mascota.edad}</td>

        <td>${mascota.peso} kg</td>

        <td class="text-end">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-1"
            onclick="editarMascota('${mascota.idMascota}')">
            <i class="bi bi-pencil"></i>
            Editar
          </button>

          <button
            type="button"
            class="btn btn-sm btn-outline-danger"
            onclick="eliminarMascotaUI('${mascota.idMascota}')">
            <i class="bi bi-trash"></i>
            Eliminar
          </button>
        </td>
      </tr>
    `;

    tabla.innerHTML += fila;
  });
}


// ============================================================
// Editar mascota
// ============================================================

function editarMascota(idMascota) {
  const mascota = buscarMascotaPorId(idMascota);

  if (!mascota) {
    mostrarAlerta("No se encontró la mascota.", "danger");
    return;
  }

  document.getElementById("idMascota").value = mascota.idMascota;
  document.getElementById("nombreMascota").value = mascota.nombreMascota;
  document.getElementById("nombreDuenio").value = mascota.nombreDuenio;
  document.getElementById("color").value = mascota.color;
  document.getElementById("edad").value = mascota.edad;
  document.getElementById("peso").value = mascota.peso;

  imagenBase64 = mascota.imagenMascota || "";

  const preview = document.getElementById("previewImagenMascota");

  if (mascota.imagenMascota) {
    preview.src = mascota.imagenMascota;
    preview.style.display = "block";
  } else {
    preview.src = "";
    preview.style.display = "none";
  }

  const modalElement = document.getElementById("modalMascota");

  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  modal.show();
}


// ============================================================
// Eliminar mascota
// ============================================================

function eliminarMascotaUI(idMascota) {
  if (!confirmarAccion("¿Está seguro de eliminar esta mascota?")) {
    return;
  }

  eliminarMascota(idMascota);

  renderizarTablaMascotas();

  mostrarAlerta("Mascota eliminada correctamente.", "success");
}


// ============================================================
// Inicialización
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // ==========================================================
  // Convertir imagen a Base64 - La implementación se encuentra dentro de DOMContentLoaded.
  // ==========================================================

  document
    .getElementById("imagenMascota")
    .addEventListener("change", function (event) {
      const archivo = event.target.files[0];
      const preview = document.getElementById("previewImagenMascota");

      if (!archivo) {
        imagenBase64 = "";
        preview.src = "";
        preview.style.display = "none";
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        imagenBase64 = e.target.result;

        preview.src = imagenBase64;
        preview.style.display = "block";
      };

      reader.readAsDataURL(archivo);
    });


  // ==========================================================
  // Alta y edición de mascotas
  // ==========================================================

  document
    .getElementById("formMascota")
    .addEventListener("submit", function (event) {

      event.preventDefault();

      const idMascota = document.getElementById("idMascota").value;
      const nombreMascota =
        document.getElementById("nombreMascota").value.trim();
      const nombreDuenio =
        document.getElementById("nombreDuenio").value.trim();
      const color =
        document.getElementById("color").value.trim();
      const edad =
        Number(document.getElementById("edad").value);
      const peso =
        Number(document.getElementById("peso").value);

      if (!nombreMascota || !nombreDuenio || !color) {
        mostrarAlerta(
          "Completá todos los campos obligatorios.",
          "danger"
        );
        return;
      }

      if (!esNumeroPositivo(edad) && edad !== 0) {
        mostrarAlerta(
          "La edad debe ser un número válido.",
          "danger"
        );
        return;
      }

      if (!esNumeroPositivo(peso)) {
        mostrarAlerta(
          "El peso debe ser un número positivo.",
          "danger"
        );
        return;
      }

      const mascotas = obtenerMascotas();


      // ========================================================
      // EDICIÓN
      // ========================================================

      if (idMascota) {

        const indice = mascotas.findIndex(
          (mascota) => mascota.idMascota === idMascota
        );

        if (indice === -1) {
          mostrarAlerta(
            "No se encontró la mascota.",
            "danger"
          );
          return;
        }

        mascotas[indice].nombreMascota = nombreMascota;
        mascotas[indice].nombreDuenio = nombreDuenio;
        mascotas[indice].color = color;
        mascotas[indice].edad = edad;
        mascotas[indice].peso = peso;

        if (imagenBase64) {
          mascotas[indice].imagenMascota = imagenBase64;
        }

        guardarMascotas(mascotas);

        mostrarAlerta(
          "Mascota modificada correctamente.",
          "success"
        );
      }


      // ========================================================
      // ALTA
      // ========================================================

      else {

        const nuevaMascota = {
          idMascota: generarUID(),
          nombreMascota: nombreMascota,
          nombreDuenio: nombreDuenio,
          color: color,
          edad: edad,
          peso: peso,
          imagenMascota: imagenBase64
        };

        mascotas.push(nuevaMascota);

        guardarMascotas(mascotas);

        mostrarAlerta(
          "Mascota registrada correctamente.",
          "success"
        );
      }


      renderizarTablaMascotas();


      // Limpiar formulario

      document
        .getElementById("formMascota")
        .reset();

      document
        .getElementById("idMascota")
        .value = "";

      imagenBase64 = "";


      // Cerrar modal

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalMascota")
      );

      if (modal) {
        modal.hide();
      }

    });


  // ==========================================================
  // Renderizar tabla al cargar
  // ==========================================================

  renderizarTablaMascotas();

});