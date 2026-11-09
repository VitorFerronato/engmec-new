# Como adicionar uma página

O frontend e a API são independentes. O Python não lê, não renderiza e não entrega HTML, CSS ou JavaScript. A página chama a API pelo endereço definido em `frontend/js/api.js`.

O exemplo pronto é **Cálculos → Dimensionamento de eixos**:

- menu: `frontend/js/navigation.js`
- página: `frontend/calculos/dimensionamento-de-eixos.html`
- comportamento: `frontend/calculos/dimensionamento-de-eixos.js`
- API, se a página buscar dados: `server/routes/calculos.py`

## Como abrir

Em um terminal, na pasta do projeto:

```bash
python server/main.py
```

A API fica em `http://127.0.0.1:8000` e só responde JSON.

Em outro terminal, na mesma pasta:

```bash
python -m http.server 5500 --directory frontend
```

O site fica em `http://127.0.0.1:5500`.

## 1. Item dentro de um grupo que já existe

No grupo `calculos` de `frontend/js/navigation.js`, acrescente um objeto em `modules`:

```javascript
{ slug: 'engrenagens', title: 'Engrenagens' }
```

O menu aponta para `/calculos/engrenagens.html`.

Copie `frontend/calculos/dimensionamento-de-eixos.html` para `frontend/calculos/engrenagens.html`. Cada arquivo HTML é uma página inteira: cabeçalho, menu e rodapé já estão nele. Troque o título, o conteúdo de `<main>` e o script no final:

```html
<script src="/calculos/engrenagens.js"></script>
```

Crie `frontend/calculos/engrenagens.js` só com o comportamento. O HTML fica no arquivo `.html`.

```javascript
const EngrenagensPage = (() => {
  function init() {}

  return { init }
})()

EngrenagensPage.init()
```

Atualize o navegador. O servidor de arquivos estáticos entrega o HTML sem passar pelo Flask.

## 2. Grupo novo na sidebar

Acrescente outro objeto em `EngMecNavigation`:

```javascript
{
  slug: 'materiais',
  label: 'Materiais',
  icon: 'layers',
  modules: [
    { slug: 'acos', title: 'Aços' },
  ],
}
```

Ícones disponíveis: `calculator`, `layers`, `gear`, `pencil`, `wrench`, `file`.

Crie a pasta `frontend/materiais/` com `index.html` (a página do grupo) e `acos.html` (o item), cada uma com o `.js` correspondente. O botão do grupo só abre e fecha o submenu. Quem muda de página é o link do item.

## 3. Dados vindos da API

Se a página precisar de dados, crie o endpoint em `server/routes/` e registre o blueprint em `server/routes/__init__.py`. O exemplo de tabela e soma está em `server/routes/calculos.py`.

No JavaScript, chame a API pelo endereço do frontend, sem caminho relativo:

```javascript
fetch(EngMecApi.url('/api/calculos/soma'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ a: 2, b: 3 }),
})
```

`EngMecApi` está em `frontend/js/api.js`. Troque `origin` se a API mudar de porta.

Reinicie `python server/main.py` depois de mudar o Python. Mudança só no HTML ou no JavaScript pede apenas atualizar o navegador.
