const EngMecIcons = (() => {
  const icons = {
    calculator: {
      paths: ['M8 8h8', 'M9 13h.01', 'M12 13h.01', 'M15 13h.01', 'M9 16.5h.01', 'M12 16.5h.01', 'M15 16.5h.01'],
      rects: [{ x: 5, y: 3, width: 14, height: 18, rx: 2 }],
    },
    layers: {
      paths: [
        'M12 3 4.5 7.2 12 11.4 19.5 7.2 12 3Z',
        'M4.5 12 12 16.2 19.5 12',
        'M4.5 16.6 12 20.8 19.5 16.6',
      ],
    },
    gear: {
      paths: [
        'M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z',
        'M19.4 15a1.65 1.65 0 0 0 .34 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.34 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .34-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.34-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.34H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.34 1.82V9a1.65 1.65 0 0 0 1.51 1.08H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08Z',
      ],
    },
    pencil: {
      paths: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z'],
    },
    wrench: {
      paths: ['M14.7 6.3a4.4 4.4 0 0 0-6 6L4 17l3 3 4.7-4.7a4.4 4.4 0 0 0 6-6L15 12l-3-3 2.7-2.7Z'],
    },
    file: {
      paths: [
        'M14.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L14.5 3Z',
        'M14 3v6h6',
        'M8.5 13h7',
        'M8.5 17h4.5',
      ],
    },
    'chevron-down': { paths: ['m6 9 6 6 6-6'] },
    'chevron-right': { paths: ['m9 6 6 6-6 6'] },
    menu: { paths: ['M4 7h16', 'M4 12h16', 'M4 17h16'] },
    close: { paths: ['M6 6 18 18', 'M18 6 6 18'] },
  }

  function markup(name, size = 20, strokeWidth = 1.75) {
    const shape = icons[name]
    if (!shape) return ''

    const paths = (shape.paths || []).map((d) => `<path d="${d}"/>`).join('')
    const rects = (shape.rects || []).map((rect) => (
      `<rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" rx="${rect.rx || 0}"/>`
    )).join('')

    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}${rects}</svg>`
  }

  return { markup }
})()
