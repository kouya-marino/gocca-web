/*
 * The only JavaScript on this site: the mobile menu.
 *
 * Everything visual is driven by the toggle button's own aria-expanded
 * attribute — the stylesheet opens the panel with
 * `.nav-toggle[aria-expanded="true"] ~ .site-nav` and morphs the burger into an
 * X the same way. So this file only has to keep one attribute honest, and the
 * accessible state and the visible state cannot drift apart.
 *
 * If this file fails to load the site still works: the nav is visible on
 * desktop regardless, and on mobile the links remain reachable from the footer.
 */
(function () {
  var toggle = document.querySelector('.nav-toggle')
  var nav = document.getElementById('site-nav')
  if (!toggle || !nav) return

  var label = toggle.querySelector('.nav-toggle-label')

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true'
  }

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    if (label) label.textContent = open ? 'Close menu' : 'Open menu'
  }

  toggle.addEventListener('click', function () {
    setOpen(!isOpen())
  })

  // Escape closes it and puts focus back on the button that opened it,
  // otherwise focus is stranded on a panel that is no longer there.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false)
      toggle.focus()
    }
  })

  document.addEventListener('pointerdown', function (event) {
    if (!isOpen()) return
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false)
    }
  })
})()
