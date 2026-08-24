/* A cargo de: Esteban Samuel Rodriguez y Emilse Daniela Pufal (ver js/turnos.js y js/historia-clinica.js). Acá se define la configuración de la API REST que se va a consumir. Se debe completar el valor de baseURL con la URL de la API y agregar los endpoints necesarios en el objeto endpoints */

const API_CONFIG = {
  baseURL: "",

  endpoints: {},
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
