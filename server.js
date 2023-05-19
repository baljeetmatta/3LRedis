const express=require("express");
const app=express();
const axios=require("axios");


const rclient=require("redis")
const client= rclient.createClient();
client.connect().then(()=>{
  console.log("Connected");
})

app.get("/data",async (req,res)=>{

  client.get("jsondata").then(async (response)=>{
    if(response)
    res.json(response);
    else
    {
      const {data}= await axios.get("https://jsonplaceholder.typicode.com/photos")
      client.setEx("jsondata",6000,JSON.stringify(data));
      res.json(data);
    }

  })
 
})



app.listen(3000);
