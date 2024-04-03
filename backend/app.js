const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 4000;

app.use(cors());

main().then(() => {
    console.log("connection succesefully");
}).catch((err) => {
    console.log("hello");
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/KeepNotes');
}

const KeepNoteSchema = mongoose.Schema({
    Title: String,
    Content: String,
})

const KeepNotecoll = mongoose.model('KeepNotecoll', KeepNoteSchema);

app.get("/", (req, res) => {

    KeepNotecoll.find().then((response)=>{
        console.log(response);
        res.json(response);
    }).catch((err)=>{
        console.log(err);
        console.log("Error in Get Route");
    })

})

app.post("/addnote", (req, res) => {

    KeepNotecoll.find().then((response) => {
        const result = new KeepNotecoll({
            Title: req.query.Title,
            Content: req.query.Content,
        })
        result.save();
        res.json(response);
    }).catch((err) => {
        console.log(err);
    })

})

app.post("/delete/:id",(req,res)=>{
    console.log(req.params.id);
    KeepNotecoll.deleteOne({_id:req.params.id}).then((response)=>{
        console.log(response);
        KeepNotecoll.find().then((response)=>{
            res.json(response);
        }).catch((err)=>{
            console.log(err);
        })
        // res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
    
    // res.json(req.params.id);
})

app.listen(port, () => {
    console.log("app listening on port 4000")
})

