import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
console.log(dotenv.config())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CoordiMate'
  })
})

app.post('/', async (req, res) => {
    try {
      // Get prompt from request body
      const prompt = req.body.prompt;
      console.log(prompt);

    // Make the API call and pass the necessary parameters and headers
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 2000,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text)
    //Send the response
    res.status(200).send({
      bot: response.data.choices[0].text
    });
  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong ');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
