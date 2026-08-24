/**
 * Genera un identificador único.
 *
 * Utiliza crypto.randomUUID cuando está disponible.
 * En caso contrario utiliza una alternativa basada en timestamp.
 *
 * @returns {string}
 */
function generarUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 11)
  );
}

/**
 * Formatea un número como moneda argentina.
 *
 * @param {number} valor
 * @returns {string}
 */
function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(Number(valor));
}

/**
 * Formatea una fecha para mostrarla al usuario.
 *
 * @param {string|Date} fecha
 * @returns {string}
 */
function formatearFecha(fecha) {
  const fechaObj = new Date(fecha);

  if (Number.isNaN(fechaObj.getTime())) {
    return "Fecha inválida";
  }

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(fechaObj);
}

/**
 * Muestra un mensaje temporal en pantalla.
 *
 * @param {string} mensaje
 * @param {"success"|"danger"|"warning"|"info"} tipo
 */
function mostrarAlerta(mensaje, tipo = "info") {
  const alerta = document.createElement("div");

  alerta.className = `
        alert
        alert-${tipo}
        alert-dismissible
        fade
        show
        position-fixed
        top-0
        end-0
        m-3
    `;

  alerta.style.zIndex = "9999";

  alerta.innerHTML = `
        ${mensaje}
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Cerrar"
        ></button>
    `;

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 4000);
}

/**
 * Solicita confirmación antes de ejecutar una acción.
 *
 * @param {string} mensaje
 * @returns {boolean}
 */
function confirmarAccion(mensaje) {
  return window.confirm(mensaje);
}

/**
 * Valida que un valor sea un número positivo.
 *
 * @param {number|string} valor
 * @returns {boolean}
 */
function esNumeroPositivo(valor) {
  const numero = Number(valor);

  return Number.isFinite(numero) && numero > 0;
}

/**
 * Escapa caracteres HTML para evitar insertar
 * contenido no deseado directamente en el DOM.
 *
 * @param {string} texto
 * @returns {string}
 */
function escaparHTML(texto) {
  const div = document.createElement("div");

  div.textContent = texto ?? "";

  return div.innerHTML;
}
