const express = require("express")
const mongoose = require("mongoose") // new
var bodyParser = require('body-parser')
const morgan = require('morgan');
var cors = require('cors')
var port = process.env.PORT || 8080;
const hostname = "localhost"
const pass = "123456789R@ju"
const dbName = "Bank"
const mongoAtlasUri =
    `mongodb+srv://Raju:${pass}@cluster0.ahs9o.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const Customers = require("./Customers");
const Transaction = require("./Transaction");
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}



const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

const app = express()
app.use(cors())
app.use(morgan('tiny'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get("/", (req, res) => {
    Customers.find((err, results) => {
        if (err) {
            console.log(err)
        }
        // console.log(results)
        res.json(results);
    })
})
app.post("/custom",(req,res)=>{
    // console.log(req.body)
    Customers.findById(req.body._id,(err,result)=>{
        if (err) {
            return res.status(400).json({error:'Something error'})
        }
        // console.log(results,"from")
        if(!result){
            return res.status(400).json({error:'Not Found'})
        }
        // res.json(results);
        if(result){
            // console.log(doc)
            res.json(result);
        } 
    })
})
app.get("/transaction",(req,res)=>{
    Transaction.find((err, results) => {
        if (err) {
            console.log(err)
        }
        res.json(results);
    })
})
app.post("/",(req,res)=>{
    const fromAcc=req.body.fromAccount;
    const Amounts=parseInt(req.body.Amount);  
    const toAcc=req.body.toAccount;
    const lessAmount=parseInt(fromAcc.balance)-Amounts
    const moreAmount=parseInt(toAcc.balance)+Amounts
    console.log(parseInt(fromAcc.balance)+" "+lessAmount,"lessAmount")
    console.log(parseInt(toAcc.balance)+" "+moreAmount,"moreAmount")
    Customers.findByIdAndUpdate(fromAcc._id 
        ,{ $set: { balance: lessAmount } },{new: true, passRawResult: true}
        ,(err,results)=>{
        if (err) {
            return res.status(400).json({error:'Something error'})
        }
        // console.log(results,"from")
        if(!results){
            return res.status(400).json({error:'Not Found'})
        }
        // res.json(results);
        if(results){
            // console.log(results)
            Customers.findByIdAndUpdate(toAcc._id,{ $set: { balance: moreAmount } },{new: true, passRawResult: true},(err,doc)=>{
                if (err) {
                    return res.status(400).json({error:'Something error'})
                }
                // console.log(results,"from")
                if(!doc){
                    return res.status(400).json({error:'Not Found'})
                }
                // res.json(results);
                if(doc){
                    // console.log(doc)
                    const Transact=new Transaction({
                        fromAccount: fromAcc.accountNo,
                        fromAccountName: fromAcc.name,
                        toAccount: toAcc.accountNo,
                        toAccountName: toAcc.name,
                        amount: Amounts,
                    })
                    Transact.save((err,newDoc)=>{
                        if (err) {
                            return res.status(400).json({error:'Something error'})
                        }
                        if(!newDoc){
                            return res.status(400).json({error:'Not Found'})
                        }
                        // res.json(results);
                        if(newDoc){
                            Customers.find((err, docs) => {
                                if (err) return next(err);
                                // console.log(results,"results")
                                res.json(docs);
                            })
                        }
                    })
                    
                }   
            })
        }
    })
})


app.listen(port, () => {
    console.log(`Server started at http://${hostname}:${port}`)
})