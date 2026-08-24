/**
 * VETERINARIA LA MARY
 * Módulo de Historia Clínica.
 *
 * A cargo de: Esteban Samuel Rodriguez y Emilse Daniela Pufal
 *
 * Depende de storage.js (obtenerHistoriasClinicas/
 * guardarHistoriasClinicas/buscarHistoriaClinicaPorId/
 * eliminarHistoriaClinica, obtenerMascotas, obtenerVeterinarios,
 * buscarMascotaPorId, buscarVeterinarioPorId, guardarMascotas) y
 * utils.js (generarUID, mostrarAlerta, confirmarAccion, formatearFecha).
 *
 * Página que usa este archivo: pages/historia-clinica.html
 *
 * Campos de cada entrada (además de los pedidos originalmente):
 *  idHistoriaClinica, mascota, veterinario, fechaHora, observaciones,
 *  peso (peso histórico de esa visita), temperatura, proximoControl.
 *
 * Esteban y Emilse 1: Selects dinámicos.
 * Completar #mascotaHistoria y #veterinarioHistoria (dentro del modal)
 * con las opciones de obtenerMascotas() y obtenerVeterinarios().
 * Completar también #filtroMascotaHistoria con obtenerMascotas().
 *
 * Esteban y Emilse 2: Tabla administrativa con filtro.
 * Implementar renderizarTablaHistorias(idMascotaFiltro): debe leer
 * obtenerHistoriasClinicas(), filtrar por mascota si se pasa
 * idMascotaFiltro, resolver mascota y veterinario con
 * buscarMascotaPorId()/buscarVeterinarioPorId(), e insertar filas <tr>
 * dentro de #tablaHistorias. Escuchar el "change" de
 * #filtroMascotaHistoria para volver a llamar a esta función con el
 * valor elegido (requisito: "Visualizar el historial completo de una
 * mascota").
 *
 * Esteban y Emilse 3: Alta de entrada.
 * El formulario #formHistoria ya existe con los campos
 * mascotaHistoria, veterinarioHistoria, fechaHoraHistoria,
 * pesoHistoria, temperaturaHistoria, proximoControlHistoria,
 * observaciones. Escuchar su "submit", armar el objeto historia clínica
 * (idHistoriaClinica con generarUID()), guardarlo con
 * guardarHistoriasClinicas() y volver a renderizar la tabla.
 *
 * IMPORTANTE (coordinar con Mascotas):
 * Al guardar una nueva entrada, actualizar también el peso ACTUAL de la
 * mascota correspondiente (buscarMascotaPorId + guardarMascotas) con el
 * valor de pesoHistoria, para que quede reflejada la evolución del
 * animal usando el histórico acumulado en cada entrada.
 *
 * Esteban y Emilse 4: Eliminar entrada.
 * Implementar eliminarHistoriaUI(idHistoriaClinica): pedir
 * confirmarAccion() antes de llamar a eliminarHistoriaClinica() y volver
 * a renderizar.
 *
 * Esteban y Emilse 5: Inicialización.
 * En un DOMContentLoaded, llamar a renderizarTablaHistorias().
 *
 * Esteban y Emilse 6: Consumo de API REST.
 * Coordinar con js/turnos.js el uso de js/api.js: definir en conjunto
 * qué API externa se consume por fetch y en cuál de los dos módulos
 * tiene más sentido mostrarla (por ejemplo, datos de razas o cuidados
 * para complementar la historia clínica).
 */
