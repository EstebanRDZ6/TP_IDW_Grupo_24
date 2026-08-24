/**
 * VETERINARIA LA MARY
 * Módulo de Mascotas.
 *
 * A cargo de: Leonardo Maciel
 *
 * Depende de storage.js (obtenerMascotas/guardarMascotas/
 * buscarMascotaPorId/eliminarMascota) y utils.js (generarUID,
 * mostrarAlerta, confirmarAccion, esNumeroPositivo, escaparHTML).
 *
 * Página que usa este archivo: pages/mascotas.html
 *
 * Leonardo 1: Tabla administrativa.
 * Implementar renderizarTablaMascotas(): debe leer obtenerMascotas() e
 * insertar filas <tr> dentro de #tablaMascotas (ver
 * pages/mascotas.html), con columnas foto (usar imagenMascota en un
 * <img>, con un ícono por defecto si está vacío), nombre, dueño, color,
 * edad, peso actual y botones de Editar/Eliminar.
 *
 * Leonardo 2: Carga de imagen en Base64.
 * En el input #imagenMascota, escuchar "change" y usar FileReader
 * (readAsDataURL) para convertir el archivo elegido a Base64. Guardar
 * ese resultado en una variable para incluirlo en el objeto mascota al
 * enviar el formulario.
 *
 * Leonardo 3: Alta y edición.
 * El formulario #formMascota ya existe en el modal #modalMascota con
 * los campos: idMascota (hidden), nombreMascota, nombreDuenio, color,
 * edad, peso, imagenMascota (file). Escuchar su "submit", armar el
 * objeto mascota (usar generarUID() si es alta), guardarlo con
 * guardarMascotas() y volver a renderizar la tabla.
 *
 * Leonardo 4: Editar/Eliminar desde la tabla.
 * Implementar editarMascota(idMascota) (precarga el formulario, incluida
 * la vista previa de la imagen, y abre el modal) y
 * eliminarMascotaUI(idMascota) (pedir confirmarAccion() antes de llamar
 * a eliminarMascota() y volver a renderizar).
 *
 * IMPORTANTE (coordinar con Historia Clínica):
 * El campo "peso" de la mascota representa el peso ACTUAL. Cada vez que
 * se registre una nueva entrada de historia clínica con un peso, ese
 * módulo debe actualizar este mismo campo para reflejar el peso más
 * reciente (guardarMascotas), mientras que el histórico completo queda
 * en cada entrada de historia clínica.
 *
 * Leonardo 5: Inicialización.
 * En un DOMContentLoaded, llamar a renderizarTablaMascotas().
 */
