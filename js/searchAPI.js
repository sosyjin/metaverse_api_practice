import { config } from "../env.js"

// HTML TAGS
const form = document.querySelector(".book-info");
const input_title = document.querySelector(".book-info #title");

// FORM SUBMIT EVENT
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  $.ajax({ 
    method: "GET",
    url: "https://dapi.kakao.com/v3/search/book",
    data: { query: input_title.value },
    headers: { Authorization: config.KAKAOAPI_KEY }
  }).done(function (msg) {
    // SHOW UP BOOK'S TITLE, THUMBNAIL
    $(".show-up #title").html("<strong>" + msg.documents[0].title + "</strong>");
    $(".show-up #thumbnail").html("<img src='" + msg.documents[0].thumbnail + "'></img>");
  });
})