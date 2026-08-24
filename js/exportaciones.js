/**
 * VETERINARIA LA MARY
 * Funcionalidad opcional: exportación de tablas de datos.
 *
 * Estas funciones son genéricas: reciben un array de objetos y generan
 * un archivo descargable (CSV o JSON) con esos datos.
 *
 * Uso típico desde cada módulo de entidad, por ejemplo en veterinarios.js:
 *
 *   document.getElementById("btnExportarVeterinarios")
 *     .addEventListener("click", function () {
 *       exportarACSV(obtenerVeterinarios(), "veterinarios");
 *     });
 */

/**
 * Dispara la descarga de un archivo en el navegador.
 *
 * @param {string} contenido
 * @param {string} nombreArchivo
 * @param {string} tipoMime
 */
function descargarArchivo(contenido, nombreArchivo, tipoMime) {
  const blob = new Blob([contenido], { type: tipoMime });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  URL.revokeObjectURL(url);
}

/**
 * Exporta un array de objetos a un archivo JSON descargable.
 *
 * @param {Array<Object>} datos
 * @param {string} nombreBase nombre del archivo, sin extensión.
 */
function exportarAJSON(datos, nombreBase) {
  if (!Array.isArray(datos) || datos.length === 0) {
    mostrarAlerta("No hay datos para exportar.", "warning");
    return;
  }

  const contenido = JSON.stringify(datos, null, 2);

  descargarArchivo(
    contenido,
    `${nombreBase}.json`,
    "application/json;charset=utf-8;",
  );
}

/**
 * Exporta un array de objetos a un archivo CSV descargable.
 *
 * Las columnas se determinan a partir de las claves del primer objeto.
 *
 * @param {Array<Object>} datos
 * @param {string} nombreBase nombre del archivo, sin extensión.
 */
function exportarACSV(datos, nombreBase) {
  if (!Array.isArray(datos) || datos.length === 0) {
    mostrarAlerta("No hay datos para exportar.", "warning");
    return;
  }

  const columnas = Object.keys(datos[0]);

  const escaparCeldaCSV = (valor) => {
    const texto = valor === null || valor === undefined ? "" : String(valor);
    const necesitaComillas = /[",\n;]/.test(texto);
    const textoEscapado = texto.replace(/"/g, '""');

    return necesitaComillas ? `"${textoEscapado}"` : textoEscapado;
  };

  const encabezado = columnas.join(";");

  const filas = datos.map((item) =>
    columnas.map((columna) => escaparCeldaCSV(item[columna])).join(";"),
  );

  const contenido = [encabezado, ...filas].join("\n");

  descargarArchivo(contenido, `${nombreBase}.csv`, "text/csv;charset=utf-8;");
}
