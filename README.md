# SpliTheBill

**Prototipo móvil para organizar y asignar gastos de una cuenta compartida.**

La idea es registrar los participantes de una salida, cargar consumos con su precio y cantidad, y asociarlos a cada persona para facilitar el reparto de la cuenta.

## Qué incluye

- Gestión de nombres de participantes.
- Registro y listado de gastos con precio y cantidad.
- Pantalla para seleccionar una persona y asignarle consumos.
- Visualización del detalle de los gastos asignados.
- Estado compartido con Redux Toolkit.
- API de nombres y gastos con Express y PostgreSQL.

## Tecnologías y estructura

React Native · Expo SDK 49 · React Navigation · Redux Toolkit · Axios · Express · PostgreSQL · pg-promise.

| Ruta | Responsabilidad |
| --- | --- |
| `App.js` | Navegación y configuración del store |
| `src/nameInput.js` | Participantes |
| `src/nameExpense.js` | Registro de gastos |
| `src/associateExpenses.js` | Asignación de consumos |
| `src/redux/` | Estado de nombres y gastos |
| `src/API/db.js` | API y conexión a PostgreSQL |

## Ejecutar en desarrollo

Requiere Node.js, npm, PostgreSQL y un entorno compatible con Expo SDK 49.

```bash
git clone https://github.com/mateorogatky/SpliTheBill.git
cd SpliTheBill
npm install
```

Antes de iniciar, configurar la conexión PostgreSQL en `src/API/db.js` y preparar las tablas `names` y `expenses` con las columnas utilizadas por sus consultas. **El repositorio no incluye migraciones SQL para crear ese esquema.** El servidor también importa `body-parser`, que no figura como dependencia directa en el manifiesto y debe estar disponible para ejecutarlo.

Actualizar las URLs HTTP de las pantallas y acciones en `src/` para apuntar al equipo que ejecuta la API. En un teléfono físico, usar una dirección accesible en la misma red.

Iniciar el servidor:

```bash
node src/API/db.js
```

La API escucha en el puerto 3000. En otra terminal, desde la raíz:

```bash
npm start
```

## Estado

Prototipo de aprendizaje en desarrollo. La asignación utiliza estado de la aplicación; no debe asumirse que todo el reparto queda persistido en la API. La instalación requiere preparar la base y adaptar la configuración local.

Próximas mejoras propuestas: versionar el esquema SQL, centralizar la configuración y completar la persistencia del reparto por persona.

## Autor

[Mateo Nicolás Rogatky](https://github.com/mateorogatky)
