import OpenAI from "https://cdn.skypack.dev/pin/openai@v4.28.0-EoCfwJScWhDgWiMG4UMv/mode=imports/optimized/openai.js"
import { config } from "../env.js"

// API PERMOSSION
const openai = new OpenAI({
  apiKey: config.OPENAIAPI_KEY,
  dangerouslyAllowBrowser: true
});

// HTML TAGS
const categoryForm = document.querySelector("#category");
categoryForm.selectedIndex = 0;
let category = "";
const form = document.querySelector(".book-info");
const input_title = document.querySelector(".book-info #title");
const overview = document.querySelector("#overview")

// FORM SUBMIT EVENT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // SET SEARCHING CATEGORY
  category = categoryForm.options[categoryForm.selectedIndex].value;

  // SHOW UP LOADING MESSAGE
  overview.innerHTML = "<h1>Searcing Infomation...</h1>"

  // GENERATE THE OVERVIEW
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Tell me overview of a ${category} titled '${input_title.value}'.`,
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // TRANSLATE THE OVERVIEW
  const translated_response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `please translate the following sentence into korean. '${response.choices[0].text}'.`,
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  $("#overview").html("<strong>" + translated_response.choices[0].text + "</strong>");
})