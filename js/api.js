/* Configuración de la API REST externa consumida por la aplicación. Se utiliza Nager.Date (https://date.nager.at), una API pública sin autenticación que expone los feriados por país. Se consume desde js/turnos.js para avisar cuando un turno se agenda en un feriado argentino. */

const API_CONFIG = {
  baseURL: "https://date.nager.at/api/v3",

  endpoints: {
    feriadosArgentina: (anio) => `/publicholidays/${anio}/AR`,
  },
};

/**
 * Realiza una petición GET a la API.
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function obtenerDesdeAPI(endpoint) {
  if (!API_CONFIG.baseURL) {
    throw new Error("La API REST todavía no fue configurada.");
  }

  try {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al consumir la API REST:", error);

    throw error;
  }
}

const cacheFeriados = {};

/**
 * Obtiene los feriados de Argentina para un año, con caché en memoria
 * para no repetir peticiones.
 *
 * @param {number} anio
 * @returns {Promise<Array<{date: string, localName: string}>>}
 */
async function obtenerFeriadosArgentina(anio) {
  if (cacheFeriados[anio]) {
    return cacheFeriados[anio];
  }

  const feriados = await obtenerDesdeAPI(
    API_CONFIG.endpoints.feriadosArgentina(anio),
  );

  cacheFeriados[anio] = feriados;

  return feriados;
}

/**
 * Verifica si una fecha ("YYYY-MM-DD") es feriado en Argentina.
 * Si la API no responde, devuelve null sin bloquear la agenda.
 *
 * @param {string} fechaSoloDia
 * @returns {Promise<Object|null>} el feriado encontrado o null.
 */
async function buscarFeriadoPorFecha(fechaSoloDia) {
  try {
    const anio = Number(fechaSoloDia.substring(0, 4));
    const feriados = await obtenerFeriadosArgentina(anio);

    return feriados.find((feriado) => feriado.date === fechaSoloDia) || null;
  } catch (error) {
    console.warn("No se pudo verificar feriados:", error);

    return null;
  }
}
