const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

let imagenBase64 = "";
let lecturaImagenPendiente = null;

function esImagenBase64Valida(imagen) {
  return /^data:image\/(jpeg|png|gif|webp);base64,[A-Za-z0-9+/]+=*$/.test(
    imagen,
  );
}

function crearIdMascotaUnico(mascotas) {
  let idMascota = generarUID();

  while (mascotas.some((mascota) => mascota.idMascota === idMascota)) {
    idMascota = generarUID();
  }

  return idMascota;
}

function limpiarVistaPrevia() {
  const preview = document.getElementById("previewImagenMascota");

  if (!preview) {
    return;
  }

  preview.removeAttribute("src");
  preview.style.display = "none";
}

function actualizarVistaPrevia(imagen) {
  const preview = document.getElementById("previewImagenMascota");

  if (!preview) {
    return;
  }

  if (!imagen) {
    limpiarVistaPrevia();
    return;
  }

  preview.src = imagen;
  preview.style.display = "block";
}

function renderizarTablaMascotas() {
  const mascotas = obtenerMascotas();
  const tabla = document.getElementById("tablaMascotas");

  if (!tabla) {
    return;
  }

  tabla.replaceChildren();

  if (mascotas.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.colSpan = 7;
    celda.className = "text-center text-muted";
    celda.textContent = "No hay mascotas registradas.";
    fila.append(celda);
    tabla.append(fila);
    return;
  }

  mascotas.forEach((mascota) => {
    const fila = document.createElement("tr");
    const fotoCelda = document.createElement("td");

    if (
      typeof mascota.imagenMascota === "string" &&
      esImagenBase64Valida(mascota.imagenMascota)
    ) {
      const imagen = document.createElement("img");

      imagen.src = mascota.imagenMascota;
      imagen.alt = `Foto de ${mascota.nombreMascota || "mascota"}`;
      imagen.width = 60;
      imagen.height = 60;
      imagen.className = "rounded-circle object-fit-cover";
      fotoCelda.append(imagen);
    } else {
      const icono = document.createElement("i");

      icono.className = "bi bi-image fs-2 text-muted";
      fotoCelda.append(icono);
    }

    const nombreCelda = document.createElement("td");
    const duenioCelda = document.createElement("td");
    const colorCelda = document.createElement("td");
    const edadCelda = document.createElement("td");
    const pesoCelda = document.createElement("td");
    const accionesCelda = document.createElement("td");
    const editar = document.createElement("button");
    const eliminar = document.createElement("button");

    nombreCelda.textContent = mascota.nombreMascota;
    duenioCelda.textContent = mascota.nombreDuenio;
    colorCelda.textContent = mascota.color;
    edadCelda.textContent = String(mascota.edad);
    pesoCelda.textContent = `${mascota.peso} kg`;
    accionesCelda.className = "text-end";

    editar.type = "button";
    editar.className = "btn btn-sm btn-outline-primary me-1";
    editar.dataset.accion = "editar";
    editar.dataset.idMascota = mascota.idMascota;
    editar.innerHTML = '<i class="bi bi-pencil"></i> Editar';

    eliminar.type = "button";
    eliminar.className = "btn btn-sm btn-outline-danger";
    eliminar.dataset.accion = "eliminar";
    eliminar.dataset.idMascota = mascota.idMascota;
    eliminar.innerHTML = '<i class="bi bi-trash"></i> Eliminar';

    accionesCelda.append(editar, eliminar);
    fila.append(
      fotoCelda,
      nombreCelda,
      duenioCelda,
      colorCelda,
      edadCelda,
      pesoCelda,
      accionesCelda,
    );
    tabla.append(fila);
  });
}

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
  document.getElementById("imagenMascota").value = "";

  imagenBase64 = esImagenBase64Valida(mascota.imagenMascota)
    ? mascota.imagenMascota
    : "";
  actualizarVistaPrevia(imagenBase64);

  bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modalMascota"),
  ).show();
}

function eliminarMascotaUI(idMascota) {
  if (!confirmarAccion("¿Está seguro de eliminar esta mascota?")) {
    return;
  }

  eliminarMascota(idMascota);
  renderizarTablaMascotas();
  mostrarAlerta("Mascota eliminada correctamente.", "success");
}

function prepararNuevaMascota() {
  document.getElementById("formMascota").reset();
  document.getElementById("idMascota").value = "";
  imagenBase64 = "";
  lecturaImagenPendiente = null;
  limpiarVistaPrevia();
}

function leerImagenComoBase64(archivo) {
  lecturaImagenPendiente = new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () =>
      reject(new Error("No se pudo leer la imagen.")),
    );
    reader.readAsDataURL(archivo);
  });

  return lecturaImagenPendiente;
}

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formMascota");
  const inputImagen = document.getElementById("imagenMascota");
  const tabla = document.getElementById("tablaMascotas");
  const botonNuevaMascota = document.getElementById("btnNuevaMascota");
  const modalMascota = document.getElementById("modalMascota");

  botonNuevaMascota.addEventListener("click", prepararNuevaMascota);

  inputImagen.addEventListener("change", function (event) {
    const archivo = event.target.files[0];

    if (!archivo) {
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.has(archivo.type)) {
      mostrarAlerta("Seleccioná una imagen JPG, PNG, GIF o WEBP.", "danger");
      event.target.value = "";
      return;
    }

    if (archivo.size > MAX_IMAGE_SIZE) {
      mostrarAlerta("La imagen no puede superar los 2 MB.", "danger");
      event.target.value = "";
      return;
    }

    leerImagenComoBase64(archivo)
      .then((resultado) => {
        imagenBase64 = resultado;
        actualizarVistaPrevia(imagenBase64);
      })
      .catch((error) => {
        imagenBase64 = "";
        mostrarAlerta(error.message, "danger");
        actualizarVistaPrevia("");
      })
      .finally(() => {
        lecturaImagenPendiente = null;
      });
  });

  tabla.addEventListener("click", function (event) {
    const boton = event.target.closest("button[data-accion]");

    if (!boton) {
      return;
    }

    if (boton.dataset.accion === "editar") {
      editarMascota(boton.dataset.idMascota);
    }

    if (boton.dataset.accion === "eliminar") {
      eliminarMascotaUI(boton.dataset.idMascota);
    }
  });

  formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      if (lecturaImagenPendiente) {
        imagenBase64 = await lecturaImagenPendiente;
      }

      const idMascota = document.getElementById("idMascota").value;
      const nombreMascota = document
        .getElementById("nombreMascota")
        .value.trim();
      const nombreDuenio = document.getElementById("nombreDuenio").value.trim();
      const color = document.getElementById("color").value.trim();
      const edadTexto = document.getElementById("edad").value;
      const pesoTexto = document.getElementById("peso").value;
      const edad = Number(edadTexto);
      const peso = Number(pesoTexto);

      if (
        !nombreMascota ||
        !nombreDuenio ||
        !color ||
        !edadTexto ||
        !pesoTexto
      ) {
        mostrarAlerta("Completá todos los campos obligatorios.", "danger");
        return;
      }

      if (!Number.isInteger(edad) || edad < 0) {
        mostrarAlerta(
          "La edad debe ser un número entero mayor o igual a cero.",
          "danger",
        );
        return;
      }

      if (!Number.isFinite(peso) || peso <= 0) {
        mostrarAlerta("El peso debe ser un número decimal positivo.", "danger");
        return;
      }

      const mascotas = obtenerMascotas();

      if (idMascota) {
        const mascota = mascotas.find((item) => item.idMascota === idMascota);

        if (!mascota) {
          mostrarAlerta("No se encontró la mascota.", "danger");
          return;
        }

        Object.assign(mascota, {
          nombreMascota,
          nombreDuenio,
          color,
          edad,
          peso,
          imagenMascota: imagenBase64,
        });
        mostrarAlerta("Mascota modificada correctamente.", "success");
      } else {
        mascotas.push({
          idMascota: crearIdMascotaUnico(mascotas),
          nombreMascota,
          nombreDuenio,
          color,
          edad,
          peso,
          imagenMascota: imagenBase64,
        });
        mostrarAlerta("Mascota registrada correctamente.", "success");
      }

      guardarMascotas(mascotas);
      renderizarTablaMascotas();
      prepararNuevaMascota();
      bootstrap.Modal.getInstance(modalMascota)?.hide();
    } catch (error) {
      mostrarAlerta(
        error.message || "No se pudo guardar la mascota.",
        "danger",
      );
    }
  });

  modalMascota.addEventListener("hidden.bs.modal", prepararNuevaMascota);
  renderizarTablaMascotas();
});
