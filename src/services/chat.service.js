const groq = require('../config/groq');
const chatRepository = require('../repositories/chat.repository');

const chat = async (message, dealId, contactId) => {

    // Сохраняем сообщение пользователя
    await chatRepository.create({

        deal_id: dealId,

        contact_id: contactId,

        role: 'user',

        message

    });

    // Получаем всю историю диалога
    const history = await chatRepository.getConversation(dealId);

    // Преобразуем историю в формат Groq
    const messages = history.map(item => ({

        role: item.role,

        content: item.message

    }));

    // Отправляем историю в Groq
    const response = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages

    });

    const answer = response.choices[0].message.content;

    // Сохраняем ответ ИИ
    await chatRepository.create({

        deal_id: dealId,

        contact_id: contactId,

        role: 'assistant',

        message: answer

    });

    return answer;

};

const streamChat = async (message, onChunk) => {

    const stream = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [

            {
                role: "user",
                content: message
            }

        ],

        stream: true

    });

    for await (const chunk of stream) {

        const content =
            chunk.choices[0]?.delta?.content;

        if (content) {

            onChunk(content);

        }

    };

};

module.exports = {

    chat,

    streamChat

};

module.exports = {
    chat,
    streamChat
};