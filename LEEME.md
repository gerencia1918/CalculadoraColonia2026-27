# Calculadora pública · Colonia 2026-27 · Club Independiente de Tandil
Archivo único: `index.html` (sin dependencias; solo usa la tipografía de Google Fonts, y si no carga usa una de sistema).

## Publicar en GitHub Pages (propietario: gerencia@clubindependiente.org)
1. Entrar a github.com y crear la cuenta con el mail gerencia@clubindependiente.org (o iniciar sesión si ya existe). Verificar el mail.
2. Botón "New repository". Nombre sugerido: `calculadora-colonia`. Público. Crear.
3. "Add file > Upload files", arrastrar `index.html` y "Commit changes".
4. Settings > Pages > Source: "Deploy from a branch", Branch: `main`, carpeta `/ (root)` > Save.
5. En 1 o 2 minutos queda en https://NOMBRE-DE-USUARIO.github.io/calculadora-colonia/ . Ese link va al Linktree.
Para cambiar precios o fechas: abrir `index.html` en GitHub (lápiz), editar y "Commit". Los precios están en `PRECIOS`, `JE` y `CFG` dentro del bloque CORE.

## Nota
El mail del inicio hoy NO se guarda ni se envía a ningún lado (solo es un requisito para entrar). Para registrarlo y enviar copia hay que sumar un Apps Script (pendiente de definir).

## Registro de consultas en una planilla de Google (Apps Script)
GitHub Pages solo muestra la página; no puede guardar datos. La página le avisa a un Apps Script de la cuenta del club, que escribe en una planilla de Google. La página sigue alojada en GitHub. No se envía ningún mail.

Qué se registra, en la hoja "Consultas": Fecha, Hora, Mail, Total, Detalle (la columna ID queda oculta y es técnica).
- Al ingresar el mail se crea la fila con fecha, hora y mail.
- Si la persona toca "Copiar resumen", se completan Total y Detalle en esa misma fila (si copia varias veces, queda la última).
- Si no copia, solo quedan fecha, hora y mail.

### Pasos
1. Entrar a Google Drive con la cuenta del club. Nuevo > Hojas de cálculo de Google. Ponerle de nombre "Consultas Colonia 2026-27". Ese es el archivo donde se verá todo, dentro de Mi unidad (o la carpeta donde lo crees).
2. En esa planilla: Extensiones > Apps Script. Borrar el contenido, pegar `Code.gs`, guardar.
3. Implementar > Nueva implementación > engranaje > "Aplicación web". Ejecutar como: Yo. Quién tiene acceso: Cualquier persona. Implementar y autorizar los permisos (solo pide acceso a la planilla).
4. Copiar la URL que termina en `/exec`.
5. Abrir `index.html` en GitHub (lápiz), buscar `var ENDPOINT = '';`, pegar la URL entre las comillas y guardar con "Commit changes".
6. Esperar 1-2 minutos, abrir el link público, probar con un mail propio y verificar que aparezca la fila.

Si más adelante se cambia el código del Apps Script, hay que hacer una "Nueva implementación" (o administrar la existente > nueva versión) para que tome los cambios.
Para pasar a Excel: Archivo > Descargar > Microsoft Excel (.xlsx).
No hace falta nada más en GitHub (no hay servidor propio ni claves).
