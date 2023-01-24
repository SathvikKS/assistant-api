const express = require('express');
const router = new express.Router()
const authapi = require('../middleware/authapi')
const {config, assistant} = require('../assistant/assistant')

const startConversation = (conversation) => {
    // setup the conversation
    conversation
      .on('response', (text) => console.log('Assistant Response:', text))
      .on('debug-info', info => console.log('Debug Info:', info))
      // if we've requested a volume level change, get the percentage of the new level
      .on('volume-percent', percent => console.log('New Volume Percent:', percent))
      // the device needs to complete an action
      .on('device-action', action => console.log('Device Action:', action))
      // once the conversation is ended, see if we need to follow up
      .on('ended', (error, continueConversation) => {
        if (error) {
          console.log('Conversation Ended Error:', error);
        } else if (continueConversation) {
          console.log('More action required')
        } else {
        //   console.log('Conversation Complete');
          conversation.end();
        }
      })
      // catch any errors
      .on('error', (error) => {
        console.log('Conversation Error:', error);
      });
  };

router.get('/device/miled/power/:key', authapi, async (req, res) => {
    if (req.params.key === 'off')
        config.conversation.textQuery = 'turn off the light'
    else if (req.params.key === 'on')
        config.conversation.textQuery = 'turn on the light'
    else
        return res.status(415).send({
            "error": "Un supported command"
        })
    assistant.start(config.conversation, startConversation)
    res.sendStatus(200)
})

router.get('/device/miled/temperature/:temp', authapi, async (req, res) => {
  config.conversation.textQuery = `change Mi LED smart color bulb to ${req.params.temp} kelvin`
  assistant.start(config.conversation, startConversation)
  res.sendStatus(200)
})

router.get('/device/miled/color/:clr', authapi, async (req, res) => {
  config.conversation.textQuery = `set the light color to ${req.params.clr}`
  assistant.start(config.conversation, startConversation)
  res.sendStatus(200)
})

router.get('/assistant/:command', authapi, async (req, res) => {
  config.conversation.textQuery = req.params.command
  assistant.start(config.conversation, startConversation)
  res.sendStatus(200)
})

module.exports = router