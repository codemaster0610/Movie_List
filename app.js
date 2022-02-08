const express = require('express')
const movieList = require('./movies.json')
const app = express()
const port = 3000

// 載入express-handlebars 至 express框架
const exphbs = require('express-handlebars')

// 告訴Express，把樣板引擎交由express-handlebars
// app.engine(樣板引擎名稱,樣板引擎參數)定義要使用的樣板引擎
//
app.engine('handlebars',exphbs({defaultLayout: 'main' }))

// 告訴Express 要設定的view engine 是handlebars
app.set('view engine','handlebars')

//讓 Express 知道靜態檔案的位置
app.use(express.static('public'))

app.get('/', (req, res) => {
  //res.render 指Express會回傳HTML來呈現前端樣板
  res.render('index',{movies: movieList.results})
})

app.get('/movies/:movie_id',(req, res) => {

  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)  
  res.render('show', { movie: movie })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})