/**
 * Lógica del Dashboard administrativo.
 */

// Proteger la página
protegerPagina();

document.addEventListener("DOMContentLoaded", function () {
  const sesion = obtenerSesion();

  const usuarioActual = document.getElementById("usuarioActual");

  if (sesion) {
    usuarioActual.textContent = `Administrador: ${sesion.usuario}`;
  }

  actualizarEstadisticas();

  const btnCerrarSesion = document.getElementById("btnCerrarSesion");

  btnCerrarSesion.addEventListener("click", function () {
    cerrarSesion();
  });
});

/**
 * Actualiza los contadores del dashboard.
 */
function actualizarEstadisticas() {
  const mascotas = obtenerMascotas();

  const veterinarios = obtenerVeterinarios();

  const turnos = obtenerTurnos();

  const historias = obtenerHistoriasClinicas();

  document.getElementById("totalMascotas").textContent = mascotas.length;

  document.getElementById("totalVeterinarios").textContent =
    veterinarios.length;

  document.getElementById("totalTurnos").textContent = turnos.length;

  document.getElementById("totalHistorias").textContent = historias.length;
}
