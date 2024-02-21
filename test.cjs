const express = require('express');
const axios = require('axios');
const app = express();

const clientId = "FKIgFkj5R7qfEvrkzF2z";
const clientSecret = "1R5ncjciWM";
const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;
  try {
    const response = await axios.post(apiUrl, {
      source: sourceLang,
      target: targetLang,
      text: text
    }, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
      }
    });
    res.json(response.data.message.result.translatedText);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});