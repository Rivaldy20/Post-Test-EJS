const express = require("express")
const app = express();
const axios = require("axios")

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("index", {
            title: "Homepage"
        }) //dia otomatis ngerender dari folder views
})

//dibawah ini contoh mau render file dalam folder yang dibuat dalam views
app.get("/home", (req, res) => {
    res.render("home/home.ejs")
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About"
    })
})

app.get("/news", (req, res) => {
    //untuk public api
    const url = "https://berita-indo-api.vercel.app/v1";

    // untuk method get, argumen pertama adalah url endpoint api
    axios.get(`${url}/cnbc-news`)
        .then(result => {
            res.render("news", {
                title: "Berita",
                news: result.data.data
            })
        })
})


app.get("/corona", (req, res) => {
    const url = "https://api.kawalcorona.com/indonesia/provinsi/";
    axios.get(`${url}`)
        .then(result => {
            res.render("corona", { title: "Data Corona", corona: result.data })
        })
})

app.get("/greet", (req, res) => {
    res.render("greet", {
        nama: req.query.name,
        kota: req.query.city,
        jk: req.query.gender
    })
})

app.listen(3000, () => console.log("server ready ya di 3000"))