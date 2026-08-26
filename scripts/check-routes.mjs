/**
 * Renders every route on the server and asserts each one produces exactly one
 * <h1>. Catches import mistakes, runtime crashes and heading-structure
 * regressions without needing a browser.
 *
 *   npm run check
 */
import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'

const OUT = 'node_modules/.route-check'

execSync(`npx vite build --ssr scripts/render-entry.jsx --outDir ${OUT} --logLevel error`, {
  stdio: 'inherit',
})

const { render } = await import(`../${OUT}/render-entry.js`)

const routes = [
  '/',
  '/services',
  '/corporate-gifting',
  '/team',
  '/work-with-us',
  '/no-such-page',
]
let failed = 0

for (const route of routes) {
  try {
    const html = render(route)
    const headings = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)].map((m) =>
      m[1].replace(/<[^>]*>/g, ''),
    )
    if (headings.length !== 1) {
      failed++
      console.error(`✗ ${route} — expected 1 <h1>, found ${headings.length}`)
    } else {
      console.log(`✓ ${route.padEnd(16)} ${headings[0]}`)
    }
  } catch (error) {
    failed++
    console.error(`✗ ${route} — ${error.message}`)
  }
}

rmSync(OUT, { recursive: true, force: true })

if (failed) {
  console.error(`\n${failed} route(s) failed`)
  process.exit(1)
}
console.log('\nAll routes render.')
