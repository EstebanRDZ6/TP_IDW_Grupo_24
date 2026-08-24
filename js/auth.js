/**
 * Autenticación del administrador.
 *
 * IMPORTANTE:
 * Esta autenticación es solamente demostrativa
 * y se ejecuta del lado cliente.
 */

const ADMIN_CREDENTIALS = {
  usuario: "admin",
  password: "admin123",
};

/**
 * Inicia sesión.
 *
 * @param {string} usuario
 * @param {string} password
 * @returns {boolean}
 */
function iniciarSesion(usuario, password) {
  if (
    usuario === ADMIN_CREDENTIALS.usuario &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const sesion = {
      usuario: usuario,
      rol: "administrador",
      fechaInicio: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.SESION, JSON.stringify(sesion));

    return true;
  }

  return false;
}

/**
 * Obtiene la sesión actual.
 *
 * @returns {Object|null}
 */
function obtenerSesion() {
  const sesion = localStorage.getItem(STORAGE_KEYS.SESION);

  if (!sesion) {
    return null;
  }

  try {
    return JSON.parse(sesion);
  } catch (error) {
    console.error("Error al leer la sesión:", error);

    return null;
  }
}

/**
 * Verifica si existe una sesión de administrador.
 *
 * @returns {boolean}
 */
function estaAutenticado() {
  const sesion = obtenerSesion();

  return sesion !== null && sesion.rol === "administrador";
}

/**
 * Protege una página administrativa.
 */
function protegerPagina() {
  if (!estaAutenticado()) {
    window.location.href = "login.html";
  }
}

/**
 * Cierra la sesión.
 */
function cerrarSesion() {
  localStorage.removeItem(STORAGE_KEYS.SESION);

  window.location.href = "login.html";
}
