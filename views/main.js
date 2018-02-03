var html = require('choo/html')
var projects = require('../projects.json')

module.exports = view

function view (state, emit) {
  return html`
    <body class="pa5 code bg-black white">
      <main class="center mw8 flex flex-column flex-row-ns">
        <section class="w-100 w-third-l mw6">
          <h1 class="mt0">
            Yoshua Wuyts
          </h1>
          <h2>
            Hobbyist Programmer
          </h2>
        </section>
        <section class="fl w-100 w-two-thirds-l pl6-ns">
          <h2 class="mt5 mt0-ns">
            Productions
          </h2>
          <section class="list pa0 cf">
            ${projects.reverse().map(project => {
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
        </section>
      </main>
    </body>
  `
}
