var raw = require('choo/html/raw')
var html = require('choo/html')
var fm = require('front-matter')
var marked = require('marked')
var css = require('sheetify')
var he = require('he')

css`
  hr {
    margin-bottom: 4rem;
    margin-top: 3rem;
  }
`

module.exports = function (src) {
  return function (state, emit) {
    return view(state, emit, src)
  }
}

function view (state, emit, src) {
  var urls = []
  var content = fm(src)
  var title = content.attributes.title
  var date = content.attributes.date
  var body = render(content.body)

  if (state.title !== title) emit(state.events.DOMTITLECHANGE, title)

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
          ${title}
        </h1>
        <h2 class="gray f5 mt2 mb4">
          ${date.toLocaleString('en-GB', {weekday: 'long'})}, ${date.toLocaleString('en-GB', {month: 'long'}) + ' '} ${date.getDate() + ' '} ${date.getFullYear()}
        </h2>
        ${body}
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
