# Playwright Automation Journey

Mentoría de Playwright en TypeScript. Cada semana vive en su propia carpeta bajo `tests/` y cubre un tema distinto: locators y acciones de UI, formularios y data-driven testing, API, y hooks con interceptación de red.

La `baseURL` del proyecto es [Sauce Demo](https://www.saucedemo.com/). Los tests de API usan [ReqRes](https://reqres.in/). La semana 6 usa [playwright.dev](https://playwright.dev/).

## Cómo ejecutar

```bash
npx playwright test
npx playwright test tests/week03
npx playwright test tests/week05
npx playwright show-report
```

Los proyectos configurados son Chromium y Firefox. El reporte es HTML y el trace se guarda en el primer reintento.

## Estructura

```text
pages/LoginPage.ts          Page Object del login de Sauce Demo
tests/data/users.json       Usuarios para tests data-driven
tests/week03/               Primeros pasos de UI
tests/week04/               Formularios, selects, checkboxes y JSON
tests/week05/               API y test híbrido API + UI
tests/week06/               Hooks e interceptación de red
playwright.config.ts
```



## Semana 3 — Primeros pasos de UI automation

Sitio: Sauce Demo. Usuario de práctica: `standard_user` / `secret_sauce`.

### Día 1 y 2 — Navegación y locators

`tests/week03/day1and2.spec.ts`

- Abrir la aplicación con `page.goto('/')`.
- Localizar el campo de usuario con `getByPlaceholder` y el botón Login con `getByRole`.
- Esperar a que ambos elementos estén en pantalla con `waitFor`.



### Día 3 — Llenar campos y hacer click

`tests/week03/day3.spec.ts`

- Completar username y password con `fill`.
- Enviar el formulario con `click` en el botón Login.



### Día 4 — Aserciones

`tests/week03/day4.spec.ts`

- Login con el usuario válido.
- Validar la URL del inventario con `toHaveURL(/inventory.html/)`.
- Validar que el texto "Products" es visible con `toBeVisible`.



### Día 5 — Inventario y carrito

`tests/week03/day5.spec.ts`

- La página de productos muestra 6 ítems (`.inventory_item`).
- El producto "Sauce Labs Backpack" es visible.
- Hay 6 botones "Add to cart".
- Agregar un producto actualiza el badge del carrito a `1`.
- Agregar tres productos (Backpack, Bike Light y Bolt T-Shirt) actualiza el badge a `3`, usando locators `data-test`.



## Semana 4 — Formularios, Page Object y data-driven



### Día 1 — Selects, checkboxes y registro

`tests/week04/day01selectscheckboxes.spec.ts`

Sitio: [IoT Dashboard de Bondar Academy](https://playground.bondaracademy.com/pages/iot-dashboard).

- Navegar a Auth y luego a Register.
- Llenar nombre, email, password y confirmación.
- Marcar "Agree to Terms & Conditions" con `check`.
- Enviar el formulario de registro.



### Día 2 — Data-driven testing con JSON

`tests/week04/day02datadrivenjson.spec.ts`

- Datos de usuarios en `tests/data/users.json`: `validUser`, `locked_out_user` y `problem_user`.
- Login reutilizado a través del Page Object `pages/LoginPage.ts` (`username`, `password` y botón Login).
- Tres casos en un `test.describe`: usuario válido, usuario bloqueado y problem user.



## Semana 5 — API testing e híbrido API + UI

Cliente HTTP de Playwright (`request`) contra ReqRes. Los contextos de API ignoran errores de certificado cuando hace falta.

### Lunes — GET

`tests/week05/monday-get-api.spec.ts`

- `GET https://reqres.in/api/users`.
- Validar que la respuesta es correcta con `response.ok()`.
- Leer el cuerpo como JSON.



### Martes — Validaciones de GET

`tests/week05/tuesday-get-validation.spec.ts`

- Crear un contexto de API con `request.newContext`.
- Validar status `200`.
- Validar que `data` trae al menos un usuario.
- Cerrar el contexto con `dispose`.



### Miércoles — POST

`tests/week05/wednesday-post-api.spec.ts`

- Crear un usuario con `POST /api/users` (`name` y `job`).
- Validar status `201`.



### Jueves — Encadenamiento de requests

`tests/week05/thursday-api-chaining.spec.ts`

- Crear un usuario por POST y validar `id`, `name` y `job`.
- ReqRes no persiste ese usuario, así que el siguiente GET usa un id real de `GET /api/users?page=1`.
- Validar que `GET /api/users/{id}` responde `200` y devuelve el mismo id.



### Viernes — Híbrido API + UI

`tests/week05/friday-hybrid-api-ui.spec.ts`

- Crear un usuario por API y validar status `201`, id, nombre y job.
- Abrir Sauce Demo y hacer login con `LoginPage` y los datos de `users.json`.
- Validar que la UI llega a `inventory.html` y muestra "Products".



## Semana 6 — Hooks e interceptación de red

Sitio: playwright.dev.

### Lunes — `beforeEach` y aserciones de página

`tests/week06/monday.spec.ts`

- `beforeEach` abre `https://playwright.dev/` antes de cada test.
- El título de la página coincide con `/Playwright/`.
- El link "Get started" es visible.



### Miércoles — Interceptación de red

`tests/week06/wednesday.spec.ts`

- `page.route` aborta las peticiones de imágenes (png, jpg, jpeg, webp).
- La página sigue cargando y el título sigue siendo Playwright.



### Jueves — Locator de un link

`tests/week06/thursday.spec.ts`

- Abrir playwright.dev y localizar un link por rol y nombre accesible.
- Validar que ese link es visible.

