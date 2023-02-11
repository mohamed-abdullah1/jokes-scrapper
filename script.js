//TODO  make a model for the joke in mongoose
//TODO  deploy it to the mongodb

//✅  scrape jokes from websites of jokes
const cheerio = require("cheerio");
const axios = require("axios");
const { uploadJokes, getJokes } = require("./utils/uploadJokes");

const url =
  "https://dealifnd.com/%D9%86%D9%83%D8%AA-%D9%85%D8%B6%D8%AD%D9%83%D8%A9-%D9%82%D8%B5%D9%8A%D8%B1%D8%A9-%D9%85%D8%B5%D8%B1%D9%8A%D8%A9";

const scrapeData = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ulElements = $("ul");
    let jokes = [];
    console.log("👉", Object.keys(ulElements), ulElements.length);
    ulElements.each((id, ele) => {
      if ($(ele).attr("class") || id === 14) return;
      $(ele)
        .clone()
        .children()
        .each((_, item) => {
          let jokeEle = {};
          jokeEle.content = $(item).text();
          jokes.push(jokeEle);
        });
    });
    console.dir(jokes);
    console.dir(jokes.length);
    await uploadJokes(jokes);
  } catch (e) {
    console.error("🔴", e);
  }
};

const viewJokes = async () => {
  try {
    await getJokes();
  } catch (e) {
    console.error("🟥", e);
  }
};

// scrapeData(url);
viewJokes();
