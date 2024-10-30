import fs from "node:fs";
import express from "express";

const app = express();
const port = 3000;

let stoicQuotes = null;

function getRandomQuote() {
  return {
    ...stoicQuotes[Math.round(stoicQuotes.length * Math.random())],
    type: "quote",
  };
}

fs.readFile("./src/quotes.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const { quotes } = JSON.parse(data);
  if (quotes.length) stoicQuotes = quotes;
});

app.get("/", (req, res) => {
  if (!stoicQuotes)
    return res
      .status(500)
      .type("application/json")
      .send({ status: false, message: "No quotes found.", type: "error" });

  res.status(200).type("application/json");
  res.send(JSON.stringify({ status: true, type: "status" }));
});

app.get("/random", (req, res) => {
  if (!stoicQuotes)
    return res
      .status(500)
      .type("application/json")
      .send({ status: false, message: "No quotes found.", type: "error" });

  res.status(200).type("application/json");
  res.send(JSON.stringify(getRandomQuote()));
});

app.listen(port, "0.0.0.0", function () {
  console.log(`Stoic Quote Server listens port:${port}`);
});
