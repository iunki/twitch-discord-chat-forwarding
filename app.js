const tmi = require('tmi.js')
const Discord = require('discord.js')
const dsClient = new Discord.Client()

const DS_CHANNEL_ID = '804390145045299316'

const quotes = [
  'Если вас поливают говном, значит вы заставили кого-то обосраться 🐺',
  'Волк никогда не бросит свою волчицу ради доступной собаки 🐺',
  'Он не поставит в жизни точки. Ничто не может быть сильней, Чем сердце волка-одиночки. 🐺',
  'Не важно кто, важно кто. 🐺',
  'Не бойся когда ты один, бойся когда ты два. 🐺',
  'Если волк молчит, то лучше его не перебивать 🐺',
]

function randomEl (array) {
  return array[Math.floor(Math.random() * array.length)]
}

const twitchClient = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ['magabifshteks'],
})

twitchClient.connect()
dsClient.login('ODA0Mzg2NjAyNzU1NDI0MzA0.YBLlZg.u7crFErMoOhPGj6-Hty1vAwJwbg')

twitchClient.on('message', (channel, tags, message, self) => {
  let text = `${tags['display-name']}: ${message}`

  if (message.trim() === '!quote') {
    text = randomEl(quotes)
  }
  console.log(text)

  const dsChannel = dsClient.channels.cache.get(DS_CHANNEL_ID)
  if (dsChannel) {
    dsClient.channels.cache.get(DS_CHANNEL_ID).send(text)
  } else {
    console.log(`Can not get channel ${DS_CHANNEL_ID}`)
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
