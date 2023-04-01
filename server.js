const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { fork } = require('child_process');

const config = require("./config.json");
const PORT = config.SERVER.PORT;

const GuildEventWorker = fork('./server/GuildEvents.js');
app.use(bodyParser.json())

// this action can be anything; we can use endoints to control it if needed.
GuildEventWorker.send({ action: 'start' }) 

app.get('/', (req, res) => {
    res.send('Server is running.')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})