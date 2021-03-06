var html = require('choo/html')
var projects = require('../projects.json')
var articles = require('../articles.json')

module.exports = view

function view (state, emit) {
  emit('DOMTitleChange', 'yoshua wuyts')
  return html`
    <body class="pa5 code bg-black white">
      <main class="center mw8 flex flex-column flex-row-ns">
        <section class="w-100 w-third-l mw6">
          <h1 class="mt0">
            Yoshua Wuyts
          </h1>
          <h2 class="cf">
            Hobbyist Programmer
          </h2>
          <a class="fl mt2 white w-100" href="mailto:yoshuawuyts@gmail.com">yoshuawuyts@gmail.com</a>
          <a class="fl mt2 white" href="https://github.com/yoshuawuyts">GitHub</a>
          <a class="fl mt2 white ml3" href="https://twitter.com/yoshuawuyts">Twitter</a>
          <a class="fl mt2 white ml3" href="https://twitch.tv/yoshuawuyts">Twitch</a>
        </section>
        <section class="fl w-100 w-two-thirds-l pl6-ns">
          <article>
            <h2 class="mt5 mt0-ns">
              Productions
            </h2>
            <section class="list pa0 cf">
              ${projects.slice().reverse().map(project => {
                return html`
                  <div class="fl w-50-l mt2">
                    <a href=${project.url} class="white">
                      <strong>${project.name}</strong>
                    </a>
                    <span class="ml2 gray">${project.date}</span>
                    <p class="mt1">${project.description}</p>
                  </div>
                `
              })}
            </section>
          </article>
          <article class="w-100">
            <h2 class="mt5">
              Articles
            </h2>
            <section class="list pa0">
              ${articles.slice().reverse().map(article => {
                return html`
                  <div class="mt2">
                    <a href=${article.url} class="white">
                      <strong>${article.name}</strong>
                    </a>
                    <span class="ml2 gray">${article.date}</span>
                  </div>
                `
              })}
            </section>
          </article>
        </section>
      </main>
    </body>
  `
}
