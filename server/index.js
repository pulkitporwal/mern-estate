import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("Namaste!")
})

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 3000}`
  );
});
