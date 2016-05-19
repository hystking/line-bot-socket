const _ = require("lodash")

const contentTemplate = {
  contentType: "1",
  toType: "1",
}

const dataTemplate = {
  toChannel: "1383378250",
  eventType: "138311608800106203",
}

function createLineRequest(text, to) {
  return Object.assign({}, dataTemplate, {
    to: _.flatten([to]),
    content: Object.assign({}, contentTemplate, {
      text: text,
    }),
  })
}

module.exports = createLineRequest
