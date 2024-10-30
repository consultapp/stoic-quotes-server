import fs from "node:fs";
import express from "express";

const app = express();
const host = "localhost";
const port = 3000;

let stoicQuotes = null;

function getRandomQuote() {
  return stoicQuotes[Math.round(stoicQuotes.length * Math.random())];
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
  if (!stoicQuotes) return res.status(500).send("No quotes...");

  res.status(200).type("application/json");
  console.log("Stoic Quote Server:", { status: true });
  res.send(JSON.stringify({ status: true }));
});

app.get("/random", (req, res) => {
  if (!stoicQuotes) return res.status(500).send("No qoutes...");

  res.status(200).type("application/json");

  res.send(JSON.stringify(getRandomQuote()));
});

app.listen(port, "0.0.0.0", function () {
  console.log(`Stoic Quote Server listens http://${host}:${port}`);
});
