import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!',
  })
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
        "model": "gpt-3.5-turbo-1106",
        "messages": [],
        "temperature": 1,
        "max_tokens": 2048,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "response_format": {
          "type": "text"
        }
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });
  } catch (error) {
      console.log(error);
      res.status(500).send({error })
  }
})
app.listen(5000, () => console.log('AI server started on http://localhost:5000'));