# Variables de Entorno

Se usan para encapsular configuraciones de acuerdo a los diferentes ambientes de desarrollo.

### Uso de variables

#### App configuration

- **API_URL**: Url base del API a consumir.
- **SHORT_NAME**: Nombre corto de la aplicación _(En minúsculas)_. Ejemplo: `bc`, `tg`, `vk`, `tb`.
- **SECRET_KEY**: Con este dato se encriptarán los datos en la aplicación. Debe ser un texto random de 32 carácteres. Ejemplo: `ebfe48f81df787193c75c1ffacd88a07` o `P5cNS6322hcoZKLz1vdLEypsRm6utXtD`. Este dato se debe solicitar al desarrollador del API.

---

## Env Example

Contiene todas las variables de desarrollo necesarias.

## Env Development

Es el entorno de desarrollo, es decir, el trabajo local. Este archivo no se sube a git puesto que cada desarrollador en su local suele usar diferentes datos para correr el proyecto.

## Env Staging

Es el entorno usado para pre-producción, debe contener la configuración necesaria para el buen funcionamiento sobre el servidor de pruebas Kubo (Porthos).

## Env Production

Es el entorno usado para producción.
