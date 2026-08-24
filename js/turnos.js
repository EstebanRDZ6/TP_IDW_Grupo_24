/**
 * VETERINARIA LA MARY
 * Módulo de Turnos.
 *
 * A cargo de: Esteban Samuel Rodriguez y Emilse Daniela Pufal
 *
 * Depende de storage.js (obtenerTurnos/guardarTurnos/buscarTurnoPorId/
 * eliminarTurno, obtenerMascotas, obtenerVeterinarios,
 * buscarMascotaPorId, buscarVeterinarioPorId), utils.js (generarUID,
 * mostrarAlerta, confirmarAccion, formatearFecha, formatearMoneda) y
 * reportes.js (generarComprobantePDF, ya resuelto, no tocar).
 *
 * Página que usa este archivo: pages/turnos.html
 *
 * Esteban y Emilse 1: Selects dinámicos.
 * Completar #mascotaTurno y #veterinarioTurno con las opciones de
 * obtenerMascotas() y obtenerVeterinarios() cada vez que se abre el
 * modal #modalTurno.
 *
 * Esteban y Emilse 2: Tabla administrativa.
 * Implementar renderizarTablaTurnos(): debe leer obtenerTurnos(),
 * resolver mascota y veterinario con buscarMascotaPorId()/
 * buscarVeterinarioPorId(), e insertar filas <tr> dentro de
 * #tablaTurnos con fecha/hora, mascota, veterinario, valor de consulta
 * (del veterinario) y botones "Eliminar" y "Comprobante PDF"
 * (este último debe llamar a
 * generarComprobantePDF(turno, mascota, veterinario)).
 *
 * Esteban y Emilse 3: Alta de turno.
 * El formulario #formTurno ya existe con los campos fechaHoraTurno,
 * mascotaTurno, veterinarioTurno. Escuchar su "submit", armar el objeto
 * turno (idTurno con generarUID(), fechaHora, mascota, veterinario),
 * guardarlo con guardarTurnos() y volver a renderizar la tabla.
 *
 * Esteban y Emilse 4: Eliminar turno.
 * Implementar eliminarTurnoUI(idTurno): pedir confirmarAccion() antes de
 * llamar a eliminarTurno() y volver a renderizar.
 *
 * Esteban y Emilse 5 (opcional del enunciado, sugerido): Filtros.
 * Agregar filtros por veterinario y por rango de fechas arriba de la
 * tabla para facilitar encontrar el turno más adecuado.
 *
 * Esteban y Emilse 6: Inicialización.
 * En un DOMContentLoaded, llamar a renderizarTablaTurnos().
 *
 * Esteban y Emilse 7: Consumo de API REST.
 * En js/api.js completar API_CONFIG.baseURL y endpoints, y usar
 * obtenerDesdeAPI() para incorporar algún dato externo relacionado a
 * los turnos (por ejemplo, un servicio de feriados o de validación de
 * fechas). Documentar en el README qué API externa se eligió.
 */
