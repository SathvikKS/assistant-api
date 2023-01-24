const readline = require('readline');
const path = require('path');
const GoogleAssistant = require('google-assistant');

const config = {
  auth: {
    keyFilePath: path.resolve(__dirname, '../../oAuth.json'),
    savedTokensPath: path.resolve(__dirname, 'tokens.json'), // where you want the tokens to be saved
  },
  conversation: {
    lang: 'en-US', // defaults to en-US, but try other ones, it's fun!
    showDebugInfo: true, // default is false, bug good for testing AoG things
    deviceModelId: 'assistant-api-26541-bulb-ee2nnk', // use if you've gone through the Device Registration process
    deviceId: '362196112759-e5a6h8pgpb3ru9m9f2rup1v3agobmhq2.apps.googleusercontent.com', // use if you've gone through the Device Registration process
    isNew: true,
    textQuery: undefined
  },
};

const assistant = new GoogleAssistant(config.auth);
  assistant
    .on('ready', () => {
        console.log('Assistant is ready')
    })
    .on('error', (error) => {
      console.log('Assistant Error:', error);
    });

module.exports = {config, assistant}