const express= require("express");
const {users} = require("./data/users.json");


const userRouter = require("./routes/users.js");
const bookRouter=require("./routes/books.js");

const app = express();
const PORT= 8081;
app.use(express.json());

http: app.get("/", (req, res) => {
    res.status(200).json({
        message:"Server is active!!",
        data:"hey",
    });
});

app.use("/users", userRouter);
app.use("/books",bookRouter);

app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route doesn't exit",
    });
});
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);

});