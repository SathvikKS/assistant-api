const express = require('express');
const router = new express.Router()
const authapi = require('../middleware/authapi')
const {config, assistant} = require('../assistant/assistant')

router.get('/device/miled/power/:key', authapi, async (req, res) => {
    if (req.params.key === 'off')
        config.conversation.textQuery = 'turn off the light'
    else if (req.params.key === 'on')
        config.conversation.textQuery = 'turn on the light'
    else
        return res.status(415).send({
            "error": "Un supported command"
        })
    assistant.start(config.conversation, (conversation) => {
      conversation
        .on('response', (text) => res.status(200).send(text))
        .on('debug-info', info => res.status(200).send('Debug Info:', info))
        .on('volume-percent', percent => res.status(200).send('New Volume Percent:', percent))
        .on('device-action', action => res.status(200).send('Device Action:', action))
        .on('ended', (error, continueConversation) => {
          if (error) {
            res.status(200).send('Conversation Ended Error:', error);
          } else if (continueConversation) {
            res.status(200).send('More action required')
          } else {
            conversation.end();
          }
        })
        .on('error', (error) => {
          console.log('Conversation Error:', error);
          res.sendStatus(500)
        });
    })
})

router.get('/device/miled/temperature/:temp', authapi, async (req, res) => {
  config.conversation.textQuery = `change Mi LED smart color bulb to ${req.params.temp} kelvin`
  assistant.start(config.conversation, (conversation) => {
    conversation
      .on('response', (text) => res.status(200).send(text))
      .on('debug-info', info => res.status(200).send('Debug Info:', info))
      .on('volume-percent', percent => res.status(200).send('New Volume Percent:', percent))
      .on('device-action', action => res.status(200).send('Device Action:', action))
      .on('ended', (error, continueConversation) => {
        if (error) {
          res.status(200).send('Conversation Ended Error:', error);
        } else if (continueConversation) {
          res.status(200).send('More action required')
        } else {
          conversation.end();
        }
      })
      .on('error', (error) => {
        console.log('Conversation Error:', error);
        res.sendStatus(500)
      });
  })
})

router.get('/device/miled/color/:clr', authapi, async (req, res) => {
  config.conversation.textQuery = `set the light color to ${req.params.clr}`
  assistant.start(config.conversation, (conversation) => {
    conversation
      .on('response', (text) => res.status(200).send(text))
      .on('debug-info', info => res.status(200).send('Debug Info:', info))
      .on('volume-percent', percent => res.status(200).send('New Volume Percent:', percent))
      .on('device-action', action => res.status(200).send('Device Action:', action))
      .on('ended', (error, continueConversation) => {
        if (error) {
          res.status(200).send('Conversation Ended Error:', error);
        } else if (continueConversation) {
          res.status(200).send('More action required')
        } else {
          conversation.end();
        }
      })
      .on('error', (error) => {
        console.log('Conversation Error:', error);
        res.sendStatus(500)
      });
  })
})

router.get('/assistant/:command', authapi, async (req, res) => {
  config.conversation.textQuery = req.params.command
  assistant.start(config.conversation, (conversation) => {
    conversation
      .on('response', (text) => res.status(200).send(text))
      .on('debug-info', info => res.status(200).send('Debug Info:', info))
      .on('volume-percent', percent => res.status(200).send('New Volume Percent:', percent))
      .on('device-action', action => res.status(200).send('Device Action:', action))
      .on('ended', (error, continueConversation) => {
        if (error) {
          res.status(200).send('Conversation Ended Error:', error);
        } else if (continueConversation) {
          res.status(200).send('More action required')
        } else {
          conversation.end();
        }
      })
      .on('error', (error) => {
        console.log('Conversation Error:', error);
        res.sendStatus(500)
      });
  })
})

module.exports = router