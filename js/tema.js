// ============================================================
// MODO OSCURO
// ============================================================

const TEMA_KEY = "veterinaria_la_mary_tema";

const temaGuardado = localStorage.getItem(TEMA_KEY);

if (temaGuardado === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

function cambiarTema() {
  const temaActual =
    document.documentElement.getAttribute("data-theme");

  const nuevoTema = temaActual === "dark" ? "light" : "dark";

  if (nuevoTema === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  localStorage.setItem(TEMA_KEY, nuevoTema);
  actualizarBotonTema();
}

function actualizarBotonTema() {
  const boton = document.getElementById("btnTema");

  if (!boton) {
    return;
  }

  const temaActual =
    document.documentElement.getAttribute("data-theme");

  if (temaActual === "dark") {
    boton.innerHTML = '<i class="bi bi-sun"></i> Modo claro';
    boton.setAttribute("aria-label", "Cambiar a modo claro");
  } else {
    boton.innerHTML = '<i class="bi bi-moon"></i> Modo oscuro';
    boton.setAttribute("aria-label", "Cambiar a modo oscuro");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarBotonTema();

  const boton = document.getElementById("btnTema");

  if (boton) {
    boton.addEventListener("click", cambiarTema);
  }
});
