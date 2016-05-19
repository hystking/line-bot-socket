const _ = require("lodash")
const express = require("express")
const bodyParser = require("body-parser")
const sayToLine = require("./utils/say-to-line")
const sayToDocomo = require("./utils/say-to-docomo")
const createLineRequest = require("./utils/create-line-request")
const createDocomoRequest = require("./utils/create-docomo-request")
const http = require("http")
const SocketIO = require("socket.io")
const uuid = require("uuid")

const PORT = 8080

const reply_ids = []

function reply({id, response, to}) {
  console.log(`replay ${id}`)
  if(!_.includes(reply_ids, id)) {
    console.log(`no id ${id}`)
    return
  }
  sayToLine(createLineRequest(response, to))
  _.remove(reply_ids, id)
}

function server() {
  const app = express()
  const httpApp = http.Server(app)
  const io = SocketIO(httpApp)

  app.use(bodyParser.json())

  app.post("/", function (req, res) {
    console.log("received message")
    req.body.result.forEach(function(res) {
      const {text, from} = res.content
      sayToDocomo(createDocomoRequest(text), ({utt}) => {
        const reply = {
          id: uuid.v4(),
          query: text,
          response: utt,
          to: from
        }
        reply_ids.push(reply.id)
        io.emit("reply-ready", reply)
      })
    })
    res.send(":)")
  })

  app.get("/test", function (req, res) {
    res.sendFile(`${__dirname}/test.html`)
  })

  httpApp.listen(PORT, function () {
    console.log(`start listening on port ${PORT}`)
  })

  io.on("connection", function(socket) {
    console.log("a user connected")
    socket.on("reply", reply)
  })
}

module.exports = server
