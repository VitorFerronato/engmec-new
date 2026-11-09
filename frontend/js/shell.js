const EngMecShell = (() => {
  const compactQuery = window.matchMedia('(max-width: 960px)')
  const sidebar = document.getElementById('menu-lateral')
  const main = document.getElementById('main-scroll')
  const menuButton = document.querySelector('.header__menu')
  const menuIcon = document.querySelector('.header__menu-icon')
  const menuLabel = document.querySelector('.header__menu .sr-only')
  const backdrop = document.querySelector('.backdrop')
  const year = document.querySelector('[data-year]')

  let openGroupSlug = null
  let mobileOpen = false

  function currentPath() {
    const path = decodeURIComponent(location.pathname).replace(/\/+$/, '').replace(/\.html$/, '')
    return path || '/'
  }

  function readRoute() {
    const parts = currentPath() === '/' ? [] : currentPath().slice(1).split('/')
    const moduleSlug = parts[1] && parts[1] !== 'index' ? parts[1] : ''
    return {
      groupSlug: parts[0] || '',
      moduleSlug,
    }
  }

  function isCompact() {
    return compactQuery.matches
  }

  function paintIcons(root) {
    root.querySelectorAll('[data-icon]').forEach((element) => {
      const size = Number(element.dataset.iconSize || 20)
      const stroke = Number(element.dataset.iconStroke || 1.75)
      element.innerHTML = EngMecIcons.markup(element.dataset.icon, size, stroke)
    })
  }

  function updateMenuButton() {
    menuButton.setAttribute('aria-expanded', String(mobileOpen))
    menuIcon.dataset.icon = mobileOpen ? 'close' : 'menu'
    paintIcons(menuIcon.parentElement)
    menuLabel.textContent = mobileOpen ? 'Fechar menu' : 'Abrir menu'
  }

  function updateChrome() {
    sidebar.classList.toggle('is-open', mobileOpen)
    main.classList.toggle('is-locked', mobileOpen)

    if (isCompact() && !mobileOpen) sidebar.setAttribute('inert', '')
    else sidebar.removeAttribute('inert')

    if (mobileOpen) main.setAttribute('inert', '')
    else main.removeAttribute('inert')

    backdrop.hidden = !mobileOpen
    updateMenuButton()
  }

  function updateSidebar() {
    const route = readRoute()
    sidebar.querySelectorAll('[data-group]').forEach((item) => {
      const slug = item.dataset.group
      const open = openGroupSlug === slug
      const current = route.groupSlug === slug
      const button = item.querySelector('.group__button')
      const panel = item.querySelector('.submenu')

      button.classList.toggle('is-current', current)
      button.setAttribute('aria-expanded', String(open))
      panel.classList.toggle('is-open', open)

      if (open) panel.removeAttribute('inert')
      else panel.setAttribute('inert', '')

      item.querySelectorAll('[data-module]').forEach((link) => {
        const active = current && link.dataset.module === route.moduleSlug
        link.classList.toggle('is-active', active)
        if (active) link.setAttribute('aria-current', 'page')
        else link.removeAttribute('aria-current')
      })
    })
  }

  function toggleGroup(slug) {
    openGroupSlug = openGroupSlug === slug ? null : slug
    updateSidebar()
  }

  function toggleMobile() {
    mobileOpen = !mobileOpen
    updateChrome()
  }

  function closeMobile() {
    if (!mobileOpen) return
    mobileOpen = false
    updateChrome()
  }

  function onClick(event) {
    const groupButton = event.target.closest('[data-group] > .group__button')
    if (groupButton) {
      toggleGroup(groupButton.parentElement.dataset.group)
      return
    }

    if (event.target.closest('.header__menu')) {
      toggleMobile()
      return
    }

    if (event.target.closest('.backdrop')) closeMobile()
  }

  function onKeydown(event) {
    if (event.key === 'Escape') closeMobile()
  }

  function onViewportChange() {
    if (!isCompact()) mobileOpen = false
    updateChrome()
  }

  function renderSidebar() {
    const list = sidebar.querySelector('[data-sidebar-list]')
    const groupTemplate = document.getElementById('sidebar-group')
    const moduleTemplate = document.getElementById('sidebar-module')
    const fragment = document.createDocumentFragment()

    EngMecNavigation.forEach((group) => {
      const groupNode = groupTemplate.content.firstElementChild.cloneNode(true)
      const button = groupNode.querySelector('.group__button')
      const panel = groupNode.querySelector('.submenu')
      const panelId = `secao-${group.slug}`

      groupNode.dataset.group = group.slug
      button.setAttribute('aria-controls', panelId)
      panel.id = panelId
      groupNode.querySelector('.group__icon').dataset.icon = group.icon
      groupNode.querySelector('.group__label').textContent = group.label

      const modules = groupNode.querySelector('.submenu__list')
      group.modules.forEach((module) => {
        const item = moduleTemplate.content.firstElementChild.cloneNode(true)
        const link = item.querySelector('.sublink')
        link.href = `/${group.slug}/${module.slug}.html`
        link.dataset.module = module.slug
        link.textContent = module.title
        modules.append(item)
      })

      fragment.append(groupNode)
    })

    list.replaceChildren(fragment)
  }

  renderSidebar()

  const route = readRoute()
  if (route.groupSlug && sidebar.querySelector(`[data-group="${route.groupSlug}"]`)) {
    openGroupSlug = route.groupSlug
  }

  year.textContent = String(new Date().getFullYear())
  paintIcons(document)
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', onKeydown)
  compactQuery.addEventListener('change', onViewportChange)
  updateChrome()
  updateSidebar()
})()
