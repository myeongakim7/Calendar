const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

const port = 3001;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const memoreadFile = fs.readFileSync("./public/json/memo.json", "utf-8");
const memojsonData = JSON.parse(memoreadFile);
let memoArr = [];
memoArr = [...memojsonData];

// ----------index----------
app.get("/", function (req, res) {
  res.render("pages/index.ejs", { memoArr });
});

// ----------create----------
app.post("/create", function (req, res) {
  let data = {};
  let dateData = req.body.date;
  dateData = "D" + dateData.split("-").join("");

  data[`${dateData}`] = [
    {
      감정: req.body.감정,
      욕구: req.body.욕구,
      제목: req.body.제목,
      내용: req.body.내용,
      날짜: req.body.date,
    },
  ];

  memoArr.push(data);

  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/");
});

// ----------listen----------
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
