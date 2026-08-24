# Veterinaria La Mary

Trabajo Final Integrador - IDW Grupo 24

## Integrantes

- Esteban Samuel Rodriguez
- Emilse Daniela Pufal
- Leonardo Maciel
- Oscar Godoy

## Descripción

Aplicación web para la gestión de mascotas, veterinarios,
turnos e historias clínicas de la Veterinaria La Mary.

El proyecto fue desarrollado utilizando HTML, CSS,
JavaScript y Bootstrap.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Bootstrap
- LocalStorage
- Fetch API
- API REST

## Funcionalidades

### Visitante

- Portada
- Listado de profesionales
- Información institucional
- Contacto

### Administrador

- Inicio de sesión
- Dashboard
- Gestión de veterinarios
- Gestión de mascotas
- Gestión de turnos
- Gestión de historias clínicas

### Funcionalidades opcionales

- Generación de comprobantes PDF
- Peso histórico
- Temperatura
- Próximo control
- Evolución del peso
- Exportación de datos

## Persistencia

Los datos principales de la aplicación se almacenan
utilizando la API LocalStorage del navegador.

## API REST

La aplicación consume una API REST externa mediante
la API Fetch de JavaScript.

## Estructura del proyecto

```text
TP_IDW_Grupo_24/
│
├── index.html                  Portada (visitante)
├── README.md
│
├── css/
│   └── styles.css              Estilos generales (paleta naranja y blanco)
│
├── js/
│   ├── storage.js              Acceso centralizado a LocalStorage
│   ├── auth.js                 Autenticación del administrador
│   ├── utils.js                 Helpers (UID, fechas, moneda, alertas, validaciones)
│   ├── api.js                   Configuración y consumo de la API REST externa
│   ├── exportaciones.js         Exportar tablas a CSV / JSON
│   ├── reportes.js              Generación de comprobante de turno en PDF
│   ├── veterinarios.js          Listado público + CRUD de veterinarios
│   ├── mascotas.js               CRUD de mascotas (incluye imagen Base64)
│   ├── turnos.js                 Alta/baja de turnos
│   ├── historia-clinica.js       Alta/consulta de historia clínica
│   └── dashboard.js              Estadísticas del panel de administración
│
├── pages/
│   ├── login.html                Acceso administrador
│   ├── dashboard.html             Panel principal (rol administrador)
│   ├── institucional.html         Información institucional (visitante)
│   ├── contacto.html              Contacto (visitante)
│   ├── veterinarios.html          CRUD de veterinarios (administrador)
│   ├── mascotas.html              CRUD de mascotas (administrador)
│   ├── turnos.html                Gestión de turnos (administrador)
│   └── historia-clinica.html      Gestión de historia clínica (administrador)
│
└── assets/
    ├── icons/
    └── image/
```

## Distribución de tareas

Arquitectura base, autenticación, integración con LocalStorage y las
funcionalidades opcionales de exportación (`js/exportaciones.js`) y
comprobante en PDF (`js/reportes.js`) ya están resueltas por 
(**Esteban Samuel Rodriguez**), junto con las páginas
públicas (`index.html`, `pages/institucional.html`,
`pages/contacto.html`) y el armado de todas las páginas de
administración (tablas, formularios y modales en `pages/`).

Cada módulo restante ya tiene su página administrativa lista. Falta
completar la lógica en el archivo JavaScript correspondiente, siguiendo
los comentarios guía dentro de cada uno:

- **Oscar Godoy** — Veterinarios (`js/veterinarios.js`): listado
  público de profesionales en la portada (`index.html`) y CRUD completo
  en `pages/veterinarios.html`.

- **Leonardo Maciel** — Mascotas (`js/mascotas.js`): CRUD completo en
  `pages/mascotas.html`, incluida la carga de imagen en Base64.

- **Esteban Samuel Rodriguez y Emilse Daniela Pufal** — Turnos e
  Historia Clínica (`js/turnos.js` y `js/historia-clinica.js`):
  alta/baja de turnos en `pages/turnos.html` (con generación de
  comprobante en PDF ya disponible), registro de historia clínica y
  visualización del historial por mascota en
  `pages/historia-clinica.html`, y consumo de la API REST externa
  (`js/api.js`) para incorporar un dato adicional relacionado a estos
  módulos.

Cada módulo puede probarse de forma independiente entrando directamente
a su página, ya que la sesión de administrador y el almacenamiento ya
están resueltos.
