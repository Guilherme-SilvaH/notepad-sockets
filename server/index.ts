import express from "express"

const app = express();


app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.listen(3002, () => {
    console.log("server listening in port 3002");
})



app.post("/api/uptade-notepad", (res,req) => {
    
})