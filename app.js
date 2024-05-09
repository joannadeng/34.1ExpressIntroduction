const express = require('express');
const ExpressError = require('./ExpressError')

const app = express();

app.get('/mean',(req,res,next) => {
    try{
        const nums = req.query.nums;

        // when no nums is passed in 
        if(Object.keys(req.query).length === 0) {
            throw new ExpressError('nums are require', 400)
        }

        const arr = nums.split(',');
        const newArr = arr.map(s => {
            // if it's not a number
          if ( Number.isNaN(parseInt(s))) { // ？
            throw new ExpressError(`${s} is not a number`, 400)
          }
        return parseInt(s);
       })
       
       let sum = 0;
       for(let n of newArr){
        sum += n;
       }

       const value = sum/newArr.length
       return res.json({
        response:{
        operation:"mean",
        value:value
       }})
    }catch(e){
        next(e)
    }  
})

function compareNumbers(a,b) {
    return a - b;
}

app.get('/median',(req,res,next) => {
    try{
        const nums = req.query.nums;

        // when no nums is passed in 
        if(Object.keys(req.query).length === 0) {
            throw new ExpressError('nums are require', 400)
        }

        const arr = nums.split(',');
        const newArr = arr.map(s => {
            // if it's not a number
          if ( Number.isNaN(parseInt(s))) { // ？
            throw new ExpressError(`${s} is not a number`, 400)
          }
        return parseInt(s);
       })
       newArr.sort(compareNumbers)
       const midpoint = newArr[Math.round(newArr.length/2)]
       return res.json({
        response:{
        operation:"median",
        value:midpoint
       }})
    }catch(e){
        next(e)
    }  
})

function getFrequentEle(arr){
    const obj = {}
    for(let i of arr) {
        if (obj[i]) {
            obj[i] += 1;
        }else{
            obj[i] = 1;
        }
    }
    let values = Object.values(obj);
    let keys = Object.keys(obj);
    values.sort(compareNumbers);
    let maxTimes = values[values.length-1];
    for(let key of keys){
        if(obj[key] === maxTimes) {
            return key;
        }
    }
}

app.get('/mode',(req,res,next) => {
    try{
        const nums = req.query.nums;

        // when no nums is passed in 
        if(Object.keys(req.query).length === 0) {
            throw new ExpressError('nums are require', 400)
        }

        const arr = nums.split(',');
        const newArr = arr.map(s => {
            // if it's not a number
          if ( Number.isNaN(parseInt(s))) { // ？
            throw new ExpressError(`${s} is not a number`, 400)
          }
        return parseInt(s);
       })
      const key = getFrequentEle(newArr);
       return res.json({
        response:{
        operation:"mode",
        value:key
       }})
    }catch(e){
        next(e)
    }  
})

app.use(function(err,req,res,next){
    let status = err.status || 500;
    let message = err.msg;
    
    return res.status(status).json({
        error: {message,status}
    })
}) 

app.listen(3000, () => {
    console.log("App on port 3000")
})