const groq = require('../config/groq');
const chatRepository = require('../repositories/chat_repository');

const chat = async (message, dealId, contactId) => {

    await chatRepository.create({

        deal_id: dealId,

        contact_id: contactId,

        role: 'user',

        message

    });

    const history = await chatRepository.getConversation(dealId);

    const messages = history.map(item => ({

        role: item.role,

        content: item.message

    }));

    const response = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages

    });

    const answer = response.choices[0].message.content;

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