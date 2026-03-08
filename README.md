# JTECH AI SOLUTIONS - Landing Page

Este repositorio contiene el código fuente de la página de inicio (Landing Page) para **JTECH AI SOLUTIONS**. El proyecto ha sido construido utilizando **React.js**, empaquetado y servido por **Vite**, y estilizado con **Tailwind CSS**.

## Tecnologías Utilizadas
- **React 18** (Construcción de interfaces de usuario)
- **Vite** (Herramienta rápida para construcción y desarrollo de proyectos web)
- **Tailwind CSS** (Framework de CSS utilitario para diseño)
- **Lucide React** (Librería de íconos SVG)

---

## 🚀 Requisitos Previos

Para correr este proyecto en tu máquina local, necesitas tener instalado lo siguiente:

1. **Node.js** (Se recomienda la versión LTS más reciente, versión 18+). Puedes descargarlo [aquí](https://nodejs.org/).
2. **Git** para el control de versiones.

### Configuración del Backend de EMMA (BFF)
Para que el módulo de Diagnóstico IA funcione localmente, necesitas conectarlo al servidor backend de EMMA.
1. Crea un archivo llamado `.env.local` en la raíz del proyecto.
2. Agrega la siguiente variable de entorno apuntando a tu URL del backend o túnel de Cloudflare:
   ```env
   VITE_EMMA_API_BASE_URL=https://tu-url-del-backend.com
   ```

---

## 💻 Desarrollo Local (Pruebas en Dev)

Sigue estos pasos para correr el proyecto localmente en tu computadora, realizar cambios y verlos en tiempo real en tu navegador.

1. **Abre tu terminal** y navega hasta la carpeta del proyecto.
2. Si es la primera vez que clonas el repositorio o alguien agregó una nueva dependencia, ejecuta el siguiente comando para instalar todos los paquetes necesarios:
   ```bash
   npm install
   ```
3. Una vez instaladas las dependencias, inicia el servidor local de desarrollo corriendo:
   ```bash
   npm run dev
   ```
4. Verás en la terminal un mensaje similar a este:
   ```
   ➜  Local:   http://localhost:5173/jtech-ai-site/
   ```
5. **Para ver la página**, mantén presionada la tecla `Cmd` o `Ctrl` en tu teclado y haz clic en ese enlace, o cópialo y pégalo en tu navegador.
6. **Para detener el servidor**, simplemente regresa a la ventana de la terminal donde está corriendo y presiona `Ctrl + C`.

Cualquier cambio que realices en el código mientras el servidor esté corriendo se actualizará automáticamente en el navegador gracias a la función _Hot Module Replacement (HMR)_ de Vite.

---

## 📝 Cómo Editar el Contenido de la Página

La arquitectura visual (componentes, botones, secciones) está separada de los datos (textos, correos, descripciones, números de teléfono). Si necesitas cambiar información, **no necesitas editar el código React en `App.jsx`**. 

Toda la información ha sido centralizada en la carpeta `src/data/`. Dependiendo de lo que quieras cambiar, edita el archivo correspondiente:

- `src/data/config.js`: Contiene la configuración global de la empresa (Nombre de la marca, números de teléfono, correos electrónicos corporativos, horarios y SEO de las páginas).
- `src/data/home.js`: Contiene todos los textos que se ven en la página principal (Inicio), como la propuesta de valor y características operativas.
- `src/data/products.js`: Contiene los detalles, beneficios, qué incluye y los **precios/licenciamientos** de EMMA y MedShift.
- `src/data/contact.js`: Textos y correos que se muestran en el formulario de contacto.
- `src/data/legal.js`: Información densa correspondiente a los Términos y Condiciones, Políticas de Privacidad y Eliminación de datos.

Simplemente abre el archivo deseado en un editor de texto (como VS Code), modifica el valor entre comillas y guarda. La página se actualizará reflejando los nuevos textos.

---

## 🌐 Publicación (Despliegue en GitHub Pages)

Este sitio está configurado para publicarse de manera gratuita y automática usando **GitHub Pages**. 

Actualmente el sitio vivo se encuentra en:  
🔗 **[https://jtellez93.github.io/jtech-ai-site/](https://jtellez93.github.io/jtech-ai-site/)**

Cuando hayas realizado cambios en el código local (ya sean textos nuevos o componentes mejorados) y quieras que esos cambios se reflejen en el sitio público en internet, debes hacer lo siguiente:

1. Asegúrate de estar en la terminal, dentro de la carpeta raíz del proyecto.
2. Ejecuta el comando de construcción y despliegue automatizado:
   ```bash
   npm run deploy
   ```

**¿Qué hace este comando internamente?**
- Primero corre `npm run build` (gracias al script `predeploy` en tu `package.json`), lo que le dice a Vite que comprima, unifique y optimice todos los archivos Javascript, CSS y HTML en una versión de producción ultrarrápida (que se guarda en una carpeta oculta llamada `dist`).
- Luego, usa la librería `gh-pages` para tomar esa carpeta `dist` y empujarla automáticamente a una rama especial en tu repositorio de GitHub llamada `gh-pages`. (GitHub Pages está configurado para leer de esa rama específica).

3. Después de que diga `Published` en tu terminal, **espera entre 1 a 3 minutos**. GitHub toma unos minutos en invalidar la caché antigua y mostrar la nueva versión del sitio web.

---

## 🌿 Uso de Git (Control de Versiones)

Recuerda que correr `npm run deploy` sólo **publica** la página en internet, pero **NO** guarda tu código en la rama principal (`main`) de tu repositorio de GitHub como respaldo.

Siempre que agregues características nuevas a tu código fuente, es una  buena práctica hacer un _commit_ y empujarlo:

```bash
git add .
git commit -m "Descripción de los cambios que hice (ej. cambio en precio de EMMA)"
git push origin main
```
