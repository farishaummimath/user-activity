const express = require('express')
const fs = require('fs')
const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// Serve static files from the React app

app.use(express.static(path.join(__dirname, 'client/build')));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/api/users', function(req,res){
    fs.readFile('./users.json','utf-8', function(err,data){
        if(err) {
            res.json(err)
        } else {
            const employees = JSON.parse(data)
            res.json(employees.members)
        }
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
app.listen(port,function(){
    console.log('Listening to port', port)
})