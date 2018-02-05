var css = require('sheetify')
var choo = require('choo')
var path = require('path')
var fs = require('fs')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.route('/', require('./views/main'))
app.route('/history', require('./views/article')(fs.readFileSync(path.join(__dirname, 'content/history/en.md'), 'utf8')))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
