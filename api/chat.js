import { Configuration, OpenAIApi } from "openai";

const conf = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(conf);

export default async function handler(req, res) {
  try {
    const { messages } = req.body;
    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });
    res.status(200).json({ message: resp.data.choices[0].message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
