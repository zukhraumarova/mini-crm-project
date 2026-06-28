const chatService = require('../services/chat.service');

const chat = async (req, res) => {

    try {

        const {

            message,

            deal_id,

            contact_id

        } = req.body;

        const answer = await chatService.chat(

            message,

            deal_id,

            contact_id

        );

        res.json({
            answer
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Groq error'
        });

    }

};

const stream = async (req, res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const message = req.query.message;

    try {

        await chatService.streamChat(

            message,

            (chunk) => {

                res.write(`data: ${chunk}\n\n`);

            }

        );

        res.write("event: end\ndata: done\n\n");

        res.end();

    } catch (error) {

        console.error(error);

        res.end();

    }

};

module.exports = {
    chat,
    stream
};