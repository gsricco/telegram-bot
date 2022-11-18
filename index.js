const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions}=require('./options')
const token = '5827783960:AAGDp498e7VW3s7-JT-QLm_zRJbzazTAtEg'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, а ты угадай его! `);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Угадывай', gameOption)
}


const start = () => {

    //Описание команд с помощью Api
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Инфо о пользователе'},
        {command: '/game', description: 'Игра угадай число'},
    ])

    // слушатель событий на обработку сообщений
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/again') {
            return startGame(chatId);
        }
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/463/343/46334338-7539-4dae-bfb6-29e0bb04dc2d/256/11.webp')
            return bot.sendMessage(chatId, `Welcome in ReactSergioBot`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is  ${msg.from.first_name} `)
        }
        if (text === '/game') {
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, `Моя твоя не понимать. Попробуй еще раз`)

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOption)
        } else {
            return bot.sendMessage(chatId, `Не угадал. Загадали цифру ${chats[chatId]}`, againOption)
        }
    })
}

start()