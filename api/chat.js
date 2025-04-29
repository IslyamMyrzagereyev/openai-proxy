import { Configuration, OpenAIApi } from "openai";


const conf = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(conf);

export default async function handler(req, res) {
  try {

    if (!req.body || !req.body.messages) {
      return res.status(400).json({ error: "Missing 'messages' in request body" });
    }

    // Извлекаем messages из тела запроса
    const { messages } = req.body;

    // Отправляем запрос в OpenAI API
    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });


    const messageContent = resp.data.choices[0].message.content;

    res.status(200).json({ message: messageContent });
  } catch (err) {
    console.error("Error processing the request:", err);
    res.status(500).json({ error: err.message });
  }
}
