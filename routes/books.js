const express= require("express");
const{books} = require("../data/books.json");
const{users} = require("../data/users.json");

const router=  express.Router();

router.get("/",(req,res)=>{
     res.status(200).json({
        success:true,
        message:"All books ........",
        data: books
    });
});




router.get("/:id",(req,res)=>{
    const{id}=req.params;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book doesn't exist"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Book found is",
        data:book,

    });
});



router.get("/issued/by",(req,res)=>{
    const usersWithTheIssuedBook = users.filter((each)=>{
        if(each.issuedBook) return each;
    });
    const issuedBooks=[];
    usersWithTheIssuedBook.forEach((each)=>{
        const book= books.find((book)=>book.id===each.issuedBook);

        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;

        issuedBooks.push(book);
    });
    if (issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message:"No book is issued ..."
        });
    }
    return res.status(200).json({
        success:true,
        message:"All issued books are..",
        data:issuedBooks,
    });

});


router.post("/",(req,res)=>{
    const{data}=req.body;
    if(!data){
        return res.status(404).json({
            success:false,
            message:"No Data Found To Add ",

        });
    }
    const book=books.find((each)=>each.id===data.id);
    if(book){
        return res.status(404).json({
            success:false,
            message:"Book Already Exist",
        });
    }
    const allBooks ={...books,data}
    return res.status(201).json({
        success:true,
        message:"Book added Successfully",
        data:allBooks
    });
});


router.put("/updateBook/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
  
    const book = books.find((each) => each.id === id);
  
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book Not Found For This ID",
      });
    }
  
    const updateData = books.map((each) => {
      if (each.id === id) {
        return { ...each, ...data };
      }
  
      return each;
    });
    return res.status(200).json({
      success: true,
      message: "Updated a Book By Their Id",
      data: updateData,
    });
  });


  














module.exports = router;

