var raw = require('choo/html/raw')
var html = require('choo/html')
var marked = require('marked')
var css = require('sheetify')
var he = require('he')

css`
  hr {
    margin-bottom: 4rem;
    margin-top: 3rem;
  }
`

var TITLE = 'About Containers'

module.exports = function (src) {
  return function (state, emit) {
    return view(state, emit, src)
  }
}

function view (state, emit, src) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var urls = []
  var content = render(src)
  var refs = urls.map((url) => html`<li class="mb2"><a class="black" href="${url[0]}">${url[0]}</a></li>`)
  return html`
    <body class="code lh-copy pa4">
      <header class="center measure-wide">
        <a href="/" class="mt3 gray link">
          <span class="underline">home</span>
          <span>→</span>
        </a>
      </header>
      <main class="center measure-wide">
        <h1 class="mb0 mt4">
          Architecting a History Pipeline
        </h1>
        <h2 class="gray f5 mt2 mb4">
          Monday, February 5th 2018
        </h2>
        ${content}
        <section>
          <a id="references">
            <h1>References</h1>
          </a>
          <ol>
            ${refs}
          </ol>
        </section>
      </main>
    </body>
  `

  function render (src) {
    var renderer = new marked.Renderer()
    renderer.paragraph = function (text) {
      return `<p class="f4 mb4">${text}</p>`
    }
    renderer.link = function (url, _, text) {
      urls.push([ url, he.decode(text) ])
      return `<a class="black" href="${url}">${text}</a><sup class="ml1"><a class="link black" href="#references">${urls.length}</a></sup>`
    }
    return raw(marked(src, { renderer }))
  }
}
