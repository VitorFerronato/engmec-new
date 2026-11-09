const DimensionamentoEixosPage = (() => {
  const columnKeys = ['eixo', 'material', 'torque', 'momento', 'diametro', 'situacao']

  function init() {
    const form = document.querySelector('[data-sum-form]')
    if (!form) return

    loadTable()
    form.addEventListener('submit', submitSum)
  }

  async function loadTable() {
    const status = document.querySelector('[data-shaft-status]')
    const table = document.querySelector('[data-shaft-table]')
    const rows = document.querySelector('[data-shaft-rows]')

    try {
      const response = await fetch(EngMecApi.url('/api/calculos/dimensionamento-de-eixos'))
      if (!response.ok) throw new Error('status')
      fillRows(rows, (await response.json()).rows)
      status.hidden = true
      table.hidden = false
    } catch {
      status.textContent = 'Não foi possível carregar a tabela.'
      status.classList.add('is-error')
    }
  }

  function fillRows(tbody, rows) {
    tbody.replaceChildren()
    ;(Array.isArray(rows) ? rows : []).forEach((row) => {
      const line = document.createElement('tr')
      columnKeys.forEach((key) => {
        const cell = document.createElement('td')
        cell.textContent = String(row[key] ?? '')
        line.append(cell)
      })
      tbody.append(line)
    })
  }

  async function submitSum(event) {
    event.preventDefault()
    const form = event.currentTarget
    const result = form.querySelector('[data-sum-result]')
    const button = form.querySelector('button')
    const first = Number(form.elements.a.value)
    const second = Number(form.elements.b.value)

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setResult(result, 'Informe dois números válidos.', true)
      return
    }

    button.disabled = true
    setResult(result, 'Calculando...', false)

    try {
      const response = await fetch(EngMecApi.url('/api/calculos/soma'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: first, b: second }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.erro || 'Falha ao calcular.')
      setResult(result, `A soma é ${formatNumber(payload.soma)}.`, false)
    } catch (error) {
      setResult(result, error.message || 'Não foi possível calcular a soma.', true)
    } finally {
      button.disabled = false
    }
  }

  function setResult(result, message, isError) {
    result.textContent = message
    result.classList.toggle('is-error', isError)
  }

  function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 6 }).format(value)
  }

  return { init }
})()

DimensionamentoEixosPage.init()
