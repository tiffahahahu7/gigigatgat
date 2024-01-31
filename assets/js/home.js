let layouts = [
  'background',
  'hero',
  'profile',
  'page',
  'card'
]

let currentLayout = 0

function switchHomeLayout () {
  let old = currentLayout
  currentLayout = currentLayout == layouts.length - 1 ? 0 : currentLayout + 1

  let oldDiv = document.getElementById(layouts[old])
  let currentDiv = document.getElementById(layouts[currentLayout])
  const layoutCode = document.querySelectorAll('code[id=layout]')

  currentDiv.style.display = 'block';
  oldDiv.style.display = 'none';
  layoutCode.forEach(function (el) {
    el.innerText = layouts[currentLayout]
  })

}

window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('#switch-layout-button').forEach((button) =>
    button.addEventListener('click', function (e) {
      e.preventDefault()
      switchHomeLayout()
    })
  )
})

var list_config = [
  'CardViewProse',
  'CardViewScreenWidth',
  'NormalView'
]

let titles = {
  CardViewProse: 'card view with constrained width',
  CardViewScreenWidth: 'card view with full width',
  NormalView: 'standard list view'
}

let currentConfig = 0

function switchList () {
  let old = currentConfig
  currentConfig = currentConfig == list_config.length - 1 ? 0 : currentConfig + 1

  let oldDiv = document.getElementById(list_config[old])
  let currentDiv = document.getElementById(list_config[currentConfig])
  const configCode = document.querySelectorAll('code[id=config]')

  currentDiv.style.display = 'block';
  oldDiv.style.display = 'none';

  configCode.forEach(function (el) {
    el.innerText = titles[list_config[currentConfig]]
  })

}

window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('#switch-config-button').forEach((button) =>
    button.addEventListener('click', function (e) {
      e.preventDefault()
      switchList()
    })
  )
})
