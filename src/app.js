require('dotenv').config()
require('./config')

const   express = require('express')
        hbs = require('express-handlebars').create({defaultLayout:'main.hbs'});

let bodyParser = require('body-parser'),
    mtz = require('moment-timezone'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    roll = require('./config/rollcon'),
    path = require('path')
    _ = require('lodash'),
    favicon = require('serve-favicon'),
    path = require('path');



//roll.log('Hello world!')

const app = express()
const port  = process.env.PORT || 3000

//Set default Time
mtz.tz.setDefault("Asia/Kolkata");

//Modals
let R = require('./modals/records.schema')
let D = require('./modals/data.schema')

//Middleware
//app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('hbs', hbs.engine);
app.set('view engine','hbs');
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
//handle bars functions 
// hbs.registerHelper('getTest', function() {
//     // const value = sensorData[waterTemp.tag] || 'value not found';
//     // let cssClass;
//     // if (value <= waterTemp.lowLimit) cssClass = 'lowAlarm';
//     // else if (value >= waterTemp.highLimit) cssClass = 'highAlarm';
  
//     // let result;
//     // if (cssClass == null) {
//     //   result = value;
//     // } else {
//     //   result = `<span class="${cssClass}">${value}</span>`;
//     // }
  
//     return new handlebars.SafeString("lol");
//   });
app.get('/data',async (req,res)=>{
    try{
        let o = await R.find({},{"__v":0}).sort({timestamp:-1}).limit(100)
        res.render('data',
        {
            title: 'KEHKASHAN',
            name:"ak",
            records : o,
            values : _.map(o,'data'),
            helpers: {
                foo: function (d) { return 'foo.'+d; },
                inc: function(number, options) {
                    if(typeof(number) === 'undefined' || number === null)
                        return null;
                        
                    // Increment by inc parameter if it exists or just by one
                    return number + (options.hash.inc || 1);
                }
            }}
        );
    }catch(e){
        console.log(e)
        res.status(500).json({err:e})
    }
});
app.get('/tdata',async (req,res)=>{
    try{
        let o = await D.find({},{"__v":0}).sort({timestamp:-1}).limit(100)
        res.render('tdata',
        {
            title: 'KEHKASHAN',
            name:"ak",
            records : o,
            values : _.map(o,'data'),
            helpers: {
                foo: function (d) { return 'foo.'+d; },
                inc: function(number, options) {
                    if(typeof(number) === 'undefined' || number === null)
                        return null;
                        
                    // Increment by inc parameter if it exists or just by one
                    return number + (options.hash.inc || 1);
                }
            }}
        );
    }catch(e){
        console.log(e)
        res.status(500).json({err:e})
    }
});
//Routes
app.get('/', async (req, res) => {
    try{
        let a = req.query.z || "*null!!",
            b = mtz().format('DDMMYYHHmmSS'),
            responseString = `RIS=*<${a}>${b}!!`
        
            let r = new R({
            data : a,
            timestamp : mtz().format()
        })     

        await r.save()
        res.status(200).send(responseString)
    }catch(e){
        console.log(e)
        res.status(500).json({err:e})
    }
})

app.get('/report', async (req,res)=>{
    res.render('report')
})
//get data from sensor
app.post('/data',async (req,res)=>{
    try{
        console.log(req.body)
        let r  =  new R({
            data : req.body.data || null,
            timestamp : mtz().format()
        })
        let o = await r.save() 
        console.log(o)
        res.status(200).json({err:null,message:"successfully saved"})
    }catch(e){
        console.log(e)
        res.status(500).json({err:e})
    }
})
//TODO: Write to excel sheet

//TODO: API to see data
app.get('/jsondata', async (req,res)=>{
    try{
        let a = await R.find({},{"__v":0}).sort({timestamp:-1}).limit(100)
        res.status(200).json({err:null,message:"success",data:a})
    }catch(e){
        res.status(500).json({err:e})
    }
})

app.get('/lol', async (req,res)=>{
    res.status(200).json({msg:"lol",err:null})
})
//Default Route
app.route('*', async (req,res)=>{
    res.status(400).json({message:"Your Browser is Compromised"})
})

app.listen(port, () => console.log(`KAPI listening on port ${port}!`))

module.exports = {app}