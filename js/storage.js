/** VETERINARIA LA MARY Sistema centralizado de almacenamiento
 *
 * Este archivo contiene todas las funciones relacionadas
 * con LocalStorage.
 *
 * Los demás módulos NO deberían utilizar directamente
 * localStorage.setItem() o localStorage.getItem().
 *
 * En su lugar deberán utilizar las funciones definidas aquí.
 */

/* =========================================================
   CLAVES DE LOCAL STORAGE
   ========================================================= */

const STORAGE_KEYS = {
  MASCOTAS: "veterinaria_la_mary_mascotas",

  VETERINARIOS: "veterinaria_la_mary_veterinarios",

  TURNOS: "veterinaria_la_mary_turnos",

  HISTORIAS: "veterinaria_la_mary_historias",

  SESION: "veterinaria_la_mary_sesion",
};

/* =========================================================
   FUNCIONES GENERALES
   ========================================================= */

/**
 * Obtiene una colección almacenada en LocalStorage.
 *
 * @param {string} key
 * @returns {Array}
 */
function obtenerDatos(key) {
  try {
    const datos = localStorage.getItem(key);

    // Si todavía no existen datos,
    // devolvemos un array vacío.

    if (!datos) {
      return [];
    }

    // Convertimos el JSON almacenado
    // nuevamente en JavaScript.

    const datosParseados = JSON.parse(datos);

    // Verificamos que realmente sea un array.

    return Array.isArray(datosParseados) ? datosParseados : [];
  } catch (error) {
    console.error(`Error al obtener datos de LocalStorage (${key}):`, error);

    return [];
  }
}

/**
 * Guarda una colección en LocalStorage.
 *
 * @param {string} key
 * @param {Array} datos
 */
function guardarDatos(key, datos) {
  try {
    localStorage.setItem(key, JSON.stringify(datos));
  } catch (error) {
    console.error(`Error al guardar datos de LocalStorage (${key}):`, error);

    throw new Error("No fue posible guardar los datos.");
  }
}

/**
 * Elimina completamente una colección.
 *
 * @param {string} key
 */
function eliminarDatos(key) {
  localStorage.removeItem(key);
}

/* MASCOTAS */

/**
 * Obtiene todas las mascotas.
 *
 * @returns {Array}
 */
function obtenerMascotas() {
  return obtenerDatos(STORAGE_KEYS.MASCOTAS);
}

/**
 * Guarda todas las mascotas.
 *
 * @param {Array} mascotas
 */
function guardarMascotas(mascotas) {
  guardarDatos(STORAGE_KEYS.MASCOTAS, mascotas);
}

/**
 * Busca una mascota por su ID.
 *
 * @param {string} idMascota
 * @returns {Object|undefined}
 */
function buscarMascotaPorId(idMascota) {
  return obtenerMascotas().find((mascota) => mascota.idMascota === idMascota);
}

/**
 * Elimina una mascota por su ID.
 *
 * @param {string} idMascota
 */
function eliminarMascota(idMascota) {
  const mascotas = obtenerMascotas();

  const nuevasMascotas = mascotas.filter(
    (mascota) => mascota.idMascota !== idMascota,
  );

  guardarMascotas(nuevasMascotas);
}

/* =========================================================
   VETERINARIOS
   ========================================================= */

/**
 * Obtiene todos los veterinarios.
 *
 * @returns {Array}
 */
function obtenerVeterinarios() {
  return obtenerDatos(STORAGE_KEYS.VETERINARIOS);
}

/**
 * Guarda todos los veterinarios.
 *
 * @param {Array} veterinarios
 */
function guardarVeterinarios(veterinarios) {
  guardarDatos(STORAGE_KEYS.VETERINARIOS, veterinarios);
}

/**
 * Busca un veterinario por su ID.
 *
 * @param {string} idVeterinario
 * @returns {Object|undefined}
 */
function buscarVeterinarioPorId(idVeterinario) {
  return obtenerVeterinarios().find(
    (veterinario) => veterinario.idVeterinario === idVeterinario,
  );
}

/**
 * Elimina un veterinario por su ID.
 *
 * @param {string} idVeterinario
 */
function eliminarVeterinario(idVeterinario) {
  const veterinarios = obtenerVeterinarios();

  const nuevosVeterinarios = veterinarios.filter(
    (veterinario) => veterinario.idVeterinario !== idVeterinario,
  );

  guardarVeterinarios(nuevosVeterinarios);
}

/* =========================================================
   TURNOS
   ========================================================= */

/**
 * Obtiene todos los turnos.
 *
 * @returns {Array}
 */
function obtenerTurnos() {
  return obtenerDatos(STORAGE_KEYS.TURNOS);
}

/**
 * Guarda todos los turnos.
 *
 * @param {Array} turnos
 */
function guardarTurnos(turnos) {
  guardarDatos(STORAGE_KEYS.TURNOS, turnos);
}

/**
 * Busca un turno por su ID.
 *
 * @param {string} idTurno
 * @returns {Object|undefined}
 */
function buscarTurnoPorId(idTurno) {
  return obtenerTurnos().find((turno) => turno.idTurno === idTurno);
}

/**
 * Elimina un turno por su ID.
 *
 * @param {string} idTurno
 */
function eliminarTurno(idTurno) {
  const turnos = obtenerTurnos();

  const nuevosTurnos = turnos.filter((turno) => turno.idTurno !== idTurno);

  guardarTurnos(nuevosTurnos);
}

/* =========================================================
   HISTORIA CLÍNICA
   ========================================================= */

/**
 * Obtiene todas las historias clínicas.
 *
 * @returns {Array}
 */
function obtenerHistoriasClinicas() {
  return obtenerDatos(STORAGE_KEYS.HISTORIAS);
}

/**
 * Guarda todas las historias clínicas.
 *
 * @param {Array} historias
 */
function guardarHistoriasClinicas(historias) {
  guardarDatos(STORAGE_KEYS.HISTORIAS, historias);
}

/**
 * Busca una historia clínica por su ID.
 *
 * @param {string} idHistoriaClinica
 * @returns {Object|undefined}
 */
function buscarHistoriaClinicaPorId(idHistoriaClinica) {
  return obtenerHistoriasClinicas().find(
    (historia) => historia.idHistoriaClinica === idHistoriaClinica,
  );
}

/**
 * Elimina una historia clínica por su ID.
 *
 * @param {string} idHistoriaClinica
 */
function eliminarHistoriaClinica(idHistoriaClinica) {
  const historias = obtenerHistoriasClinicas();

  const nuevasHistorias = historias.filter(
    (historia) => historia.idHistoriaClinica !== idHistoriaClinica,
  );

  guardarHistoriasClinicas(nuevasHistorias);
}
