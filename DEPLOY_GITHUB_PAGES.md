# Deploy Angular en GitHub Pages

1. Instala el paquete para deploy:

   npm install -g angular-cli-ghpages

2. En tu `angular.json`, asegúrate que el outputPath de producción sea `dist/<nombre-proyecto>`.

3. En `package.json`, agrega el script:

   "deploy": "ng build --base-href=/REPO_NAME/ && npx angular-cli-ghpages --dir=dist/REPO_NAME"

   Cambia REPO_NAME por el nombre de tu repositorio.

4. En tu terminal ejecuta:

   npm run deploy

Esto compilará y subirá tu app a la rama `gh-pages` de tu repo. Luego ve a la configuración de GitHub Pages y selecciona la rama `gh-pages` como fuente.

---

Si tu proyecto está en una carpeta diferente o el nombre del repo es distinto, ajusta el script y el outputPath.
