const express = require('express');
require('./assistant/assistant')
const app = express()
const assistantRouter = require('./routers/assistantRouter')

app.use(assistantRouter)

app.listen(process.env.port, () => {
  console.log('Server is running')
})