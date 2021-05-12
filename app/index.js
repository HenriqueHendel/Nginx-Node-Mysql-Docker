const express = require('express');
const handlebars = require('express-handlebars');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: 'mysql',
  user: 'challenge',
  password: 'root',
  database: 'challenge'
});

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');


app.get('/', async (req, res) => {

    if(req.query.clear){
        connection.query('TRUNCATE people;', function(err, rows, fields) {
            if (err) throw err;
        });
    }

    connection.query('INSERT INTO people (name) values ("Henrique Lopes");', function(err, rows, fields) {
        if (err) throw err;
    });
     
    connection.query('SELECT * FROM people', function(err, rows, fields) {
        if (err) throw err;
        const data = Object.values(JSON.parse(JSON.stringify(rows)));

        res.render('home', {
            people: data
        })
    });    
})

app.listen(3333, () => {
    console.log('App on port 3333')
})