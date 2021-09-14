const express = require('express')
const app = express()
const port = 3000
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})
*/
app.get('/hello', function(req, res){
    res.send("Hello World!");
 });

app.get('/about', (req, res) => {
    res.send('Hello about!')
  })

app.get('/contact', (req, res) => {
    res.send('Hello contact!')
  })

  app.post('/hello', function(req, res){
    res.send("You just called the post method at '/hello'!\n");
 });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})