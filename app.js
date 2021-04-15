require('dotenv').config()
const tmi = require('tmi.js')
const Discord = require('discord.js')
const dsClient = new Discord.Client()

// {"twitch_name": "discord_channel_id"}
const CHANNELS = JSON.parse(process.env.CHANNELS)

const BOT_TOKEN = process.env.BOT_TOKEN

const twitchClient = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: Object.keys(CHANNELS),
})

twitchClient.connect()
dsClient.login(BOT_TOKEN)

twitchClient.on('message', (channel, tags, message, self) => {

  let text = `${tags['display-name']}: ${message}`

  console.log(channel, text)

  const twitchChannelName = channel.substring(1)
  const dsChannelId = CHANNELS[twitchChannelName]

  const dsChannel = dsClient.channels.cache.get(dsChannelId)
  if (dsChannel) {
    dsClient.channels.cache.get(dsChannelId).send(text)
  } else {
    console.log(`Can not get channel ${dsChannelId}`)
  }
})

dsClient.on('ready', () => {
  console.log(`Logged in as ${dsClient.user.tag}!`)
})

dsClient.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})
