import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from '../src/App'

export function render(path) {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  )
}
