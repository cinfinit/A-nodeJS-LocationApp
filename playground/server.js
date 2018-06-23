const request=require('request');
const hbs=require('hbs');
const express=require('express');
var bodyParser = require('body-parser');
var port=process.env.PORT || 3000;
var app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var promise2=require('./promise2.js');
app.set('view engine','hbs');
app.use(express.static(__dirname+ '/views'));
//var some=promise2.k;
//var something='newsomething';
//console.log(some);
 app.get('/',(req,res)=>{
   res.render('initial.hbs',{qs:req.query});
//   console.log(req.query);
 });
 app.post('/',urlencodedParser,(req,res)=>{
  var f=req.body.w;
  var k={};
  var geocode=(address)=>{
    return new Promise((resolve,reject)=>{
    var nf=encodeURIComponent(address);
    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${nf}`,
      json:true
    },(error,response,body)=>{
      if(error){
        reject('doesnt works');
      }
      else if(body.status==='ZERO_RESULTS'){
        reject('something is not working');
      }
      else if(body.status==='OK'){
        resolve({
          Addressis:body.results[0].formatted_address,
          Latitudeis:body.results[0].geometry.location.lat,
          Longitudeis:body.results[0].geometry.location.lng
        });
      }
    })
  })
  };
  geocode(f).then((location)=>{
   k=JSON.stringify(location, undefined,2);
   res.render('initial.hbs',{k:k});

   // console.log(k.L/atitudeis);
   // console.log(k);
  },(e)=>{
    k=e;
    // console.log(k);
  //  console.log(e);
  })
  // console.log(promise2.cal(f));
   //res.render('initial.hbs',{data:req.body.w});
 });
 // app.post('/',(req,res)=>{
 //
 //   res.render('final.hbs',{some:some});
 //   //console.log(some);
 // });

 app.listen(port,()=>{
   console.log('server is up and running');
 });
