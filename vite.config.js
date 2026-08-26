import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * GitHub Pages serves 404.html for any path it has no file for. Since this is a
 * single-page app with client-side routing, shipping a copy of index.html as
 * 404.html makes deep links (gocca.in/team) and hard refreshes resolve to the
 * app instead of GitHub's default not-found page.
 */
function spaFallback() {
  let outDir
  let isSsrBuild

  return {
    name: 'gocca-spa-fallback',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      isSsrBuild = Boolean(config.build.ssr)
    },
    closeBundle() {
      // `npm run check` runs a second, SSR build (scripts/render-entry.jsx) that
      // emits no index.html. Copying unconditionally throws ENOENT there on any
      // clean checkout — which is every CI run.
      if (isSsrBuild) return
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  // '/' because the site is served from the gocca.in apex domain, not from a
  // /<repo-name>/ subpath. If you ever preview it at <user>.github.io/gocca-web/
  // without the custom domain, change this to '/gocca-web/'.
  base: '/',
  plugins: [react(), spaFallback()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
