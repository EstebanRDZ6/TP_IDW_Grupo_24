/**
 * VETERINARIA LA MARY
 * Módulo de Veterinarios.
 *
 * A cargo de: Oscar Godoy
 *
 * Depende de storage.js (obtenerVeterinarios/guardarVeterinarios/
 * buscarVeterinarioPorId/eliminarVeterinario), utils.js (generarUID,
 * mostrarAlerta, confirmarAccion, esNumeroPositivo, formatearMoneda,
 * escaparHTML) y exportaciones.js (ya resuelto, no tocar).
 *
 * Páginas que usan este archivo:
 *  - index.html            -> listado público (#listadoProfesionales)
 *  - pages/veterinarios.html -> CRUD administrativo
 *
 * Oscar 1: Listado público en la portada.
 * Implementar renderizarListadoPublicoVeterinarios(): debe leer
 * obtenerVeterinarios() e insertar tarjetas (nombre, especializacion,
 * valorConsulta formateado con formatearMoneda) dentro de
 * #listadoProfesionales. Llamarla en un DOMContentLoaded solo si ese
 * elemento existe en la página (para no romper el resto de páginas
 * que también incluyen este script).
 *
 * Oscar 2: Tabla administrativa.
 * Implementar renderizarTablaVeterinarios(): debe leer
 * obtenerVeterinarios() e insertar filas <tr> dentro de
 * #tablaVeterinarios (ver pages/veterinarios.html), con columnas
 * matrícula, nombre, especialización, valor de consulta y botones de
 * Editar/Eliminar.
 *
 * Oscar 3: Alta y edición.
 * El formulario #formVeterinario ya existe en el modal #modalVeterinario
 * con los campos: idVeterinario (hidden), matricula, nombreVeterinario,
 * especializacion, valorConsulta. Escuchar su evento "submit", armar el
 * objeto veterinario (usar generarUID() si es alta), guardarlo con
 * guardarVeterinarios() y volver a renderizar la tabla.
 *
 * Oscar 4: Editar/Eliminar desde la tabla.
 * Implementar editarVeterinario(idVeterinario) (precarga el formulario y
 * abre el modal) y eliminarVeterinarioUI(idVeterinario) (pedir
 * confirmarAccion() antes de llamar a eliminarVeterinario() y volver a
 * renderizar).
 *
 * Oscar 5: Inicialización.
 * En un DOMContentLoaded, llamar a renderizarTablaVeterinarios() si
 * existe #tablaVeterinarios, y a renderizarListadoPublicoVeterinarios()
 * si existe #listadoProfesionales.
 */
