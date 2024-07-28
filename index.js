const express = require('express');
const app = express();

const users =[{
    name : 'John',
    kidneys:[{
        healthy: 'false'
    }]
}]

app.use(express.urlencoded({extended: true}));  
app.use(express.json());

app.get("/", function(req, res){
    const johnKidneys = users[0].kidneys;
    // res.send(johnKidneys);
    let numberofKidneys = johnKidneys.length;
    let numberofhealthyKidneys = 0;

    for (let i = 0; i < numberofKidneys; i++) {
        //  console.log(johnKidneys[i].healthy); // false or true
        if(johnKidneys[i].healthy=== true){
            numberofhealthyKidneys = numberofhealthyKidneys + 1;
        }
    }

    let numberofUnhealthyKidneys  = numberofKidneys - numberofhealthyKidneys ;
    res.json({
       numberofKidneys,
       numberofhealthyKidneys,
        numberofUnhealthyKidneys  // 
    })
})

app.post("/",(req,res)=>{
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg:"done"
    })
})

app.put("/" ,(req,res)=>{
    for(let i=0;i<users.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg:"Updated"
    })
})
app.delete("/",(req,res) => {
    const newKidneys =[];
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if(users[0].kidneys[i].healthy){
            newKidneys.push({healthy:true});
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg:"Deleted"
    })
})
app.listen(3000,()=>{
    console.log("server listening on");
})