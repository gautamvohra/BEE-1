const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { send } = require("process");

app.use(bodyParser.urlencoded({extended:false}));

var data;
var data_json;

app.get('/', (req,res) => {
    res.sendFile(__dirname+"/first.html");
    data = fs.readFileSync('user_data.txt', 'utf8');
    if(data != ""){
        data_json = JSON.parse(data);
    }
    
})

app.get('/first.css', (req, res) => {
    res.sendFile(__dirname+'/first.css');
})

app.get('/demo.js', (req, res) => {
    res.sendFile(__dirname+'/demo.js');
})

app.post('/addinfo', (req, res) => {
    var name = req.body.name;
    var rollno = req.body.rollno;
    var add = req.body.add;
    var email = req.body.email;
    var eng = parseInt(req.body.eng);
    var math = parseInt(req.body.math);
    var phy = parseInt(req.body.phy);
    var chem = parseInt(req.body.chem);
    var bio = parseInt(req.body.bio);

    var avg = ((eng + math + phy + chem + bio)*1.0) / 5;

    var grade;
    if(avg > 80){
        grade = 'A';
    }
    else if(avg > 70){
        grade = 'B';
    }
    else if(avg > 60){
        grade = 'C';
    }
    else if(avg > 60){
        grade = 'D';
    }
    else if(avg > 50){
        grade = 'E';
    }
    else{
        grade = 'F';
    }
    
    if(data == ""){
        data_json = {
            "arr":[
                {
                    "name":name,
                    "rollno":rollno,
                    "address":add,
                    "email":email,
                    "english":eng,
                    "maths":math,
                    "physics":phy,
                    "chemistry":chem,
                    "biology":bio,
                    "average":avg,
                    "grade":grade
                }
            ]
        }


        data = JSON.stringify(data_json);
        fs.writeFileSync("user_data.txt", data);
        res.send("data added succesfully to empty database");
        console.log(data_json);
    }
    else{
        data_json = JSON.parse(data);
        data_json.arr.push({
            "name":name,
            "rollno":rollno,
            "address":add,
            "email":email,
            "english":eng,
            "maths":math,
            "physics":phy,
            "chemistry":chem,
            "biology":bio,
            "average":avg,
            "grade":grade
        })
        data = JSON.stringify(data_json);
        fs.writeFileSync("user_data.txt", data);
        res.send("added data to existing database");
        console.log(data_json);
    }
    
})

app.get('/userData', (req, res) => {
    data_json = JSON.parse(data);
    var result = '<table style="border: solid 1px black; padding: 10px;"><tr><td style="border: solid 1px black; padding: 10px;">Name</td><td style="border: solid 1px black; padding: 10px;">Roll No.</td><td style="border: solid 1px black; padding: 10px;">Address</td><td style="border: solid 1px black; padding: 10px;">Email</td><td style="border: solid 1px black; padding: 10px;">English</td><td style="border: solid 1px black; padding: 10px;">Maths</td><td style="border: solid 1px black; padding: 10px;">Physics</td><td style="border: solid 1px black; padding: 10px;">Chemistry</td><td style="border: solid 1px black; padding: 10px;">Biology</td><td style="border: solid 1px black; padding: 10px;">Average</td><td style="border: solid 1px black; padding: 10px;">Grade</td></tr>';
    data_json.arr.map((data) => {
        result += '<tr><td style="border: solid 1px black; padding: 5px;">'+data.name+'</td><td style="border: solid 1px black; padding: 5px;">'+data.rollno+'</td><td style="border: solid 1px black; padding: 5px;">'+data.address+'</td><td style="border: solid 1px black; padding: 5px;">'+data.email+'</td><td style="border: solid 1px black; padding: 5px;">'+data.english+'</td><td style="border: solid 1px black; padding: 5px;">'+data.maths+'</td><td style="border: solid 1px black; padding: 5px;">'+data.physics+'</td><td style="border: solid 1px black; padding: 5px;">'+data.chemistry+'</td><td style="border: solid 1px black; padding: 5px;">'+data.biology+'</td><td style="border: solid 1px black; padding: 5px;">'+data.average+'</td><td style="border: solid 1px black; padding: 5px;">'+data.grade+'</td></tr>';
    })

    result += '</table>';
    res.send(result);

})





app.listen(port);
