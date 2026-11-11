/**
 * Autenticación contra DummyJSON.
 *
 * Autentica usuarios contra la API pública DummyJSON.
 * El token recibido se almacena en sessionStorage.
 */

/**
 * Inicia sesión contra DummyJSON.
 *
 * @param {string} usuario - Username para DummyJSON (ej: "emilys")
 * @param {string} password - Contraseña (ej: "emilyspass")
 * @returns {Promise<boolean>}
 */
async function iniciarSesion(usuario, password) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        password: password,
      }),
    });

    if (!response.ok) {
      console.warn("Credenciales inválidas:", response.status);
      return false;
    }

    const datos = await response.json();

    sessionStorage.setItem("token", datos.token);
    sessionStorage.setItem("usuario", datos.username);
    sessionStorage.setItem("usuarioId", datos.id);

    return true;
  } catch (error) {
    console.error("Error al conectar con DummyJSON:", error);
    return false;
  }
}

/**
 * Obtiene la sesión actual desde sessionStorage.
 *
 * @returns {Object|null}
 */
function obtenerSesion() {
  const token = sessionStorage.getItem("token");
  const usuario = sessionStorage.getItem("usuario");

  if (!token || !usuario) {
    return null;
  }

  return {
    usuario: usuario,
    token: token,
    rol: "administrador",
  };
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
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("usuarioId");

  localStorage.removeItem(STORAGE_KEYS.SESION);

  window.location.href = "login.html";
}

/**
 * Obtiene los headers HTTP con autenticación.
 *
 * @returns {Object}
 */
function obtenerHeadersConAuth() {
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}
