import OpenAI from "https://cdn.skypack.dev/pin/openai@v4.28.0-EoCfwJScWhDgWiMG4UMv/mode=imports/optimized/openai.js"
import { config } from "../env.js"

// API PERMOSSION
const openai = new OpenAI({
  apiKey: config.OPENAIAPI_KEY,
  dangerouslyAllowBrowser: true
});

// HTML TAGS
const form = document.querySelector(".book-info");
const input_title = document.querySelector(".book-info #title");

// FORM SUBMIT EVENT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Tell me overview of a book titled '${input_title.value}'.`,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  $("#overview").html("<strong>" + response.choices[0].text + "</strong>");
})