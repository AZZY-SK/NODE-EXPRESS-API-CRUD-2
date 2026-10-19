
const cl = console.log;


let todos = [
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    },
    {
        "userId": 1,
        "id": 4,
        "title": "et porro tempora",
        "completed": true
    }
]


const express = require("express");

const app = express();

const port = 4000;


// GET ALL 

app.get("/todos", (req, res) => {
    try {
        res.status(200).json({
            ok: true,
            message: "fetched successfully",
            body: todos
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "something went wrong",
            err: err.message
        })
    }
})

//GET SINGLE 

app.get("/todos/:id", (req, res) => {

    try {
        let id = Number(req.params.id);
        let obj = todos.find(todo => todo.id === id);

        res.status(200).json({
            ok: true,
            message: "fetched successfully",
            body: obj
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "something went wrong",
            err: err.message
        })

    }

})

// CREATE

app.use(express.json());

app.post("/todos", (req, res) => {
    try {

        let { userId, title, completed } = req.body;

        let newobj = {
            userId: userId,
            id: todos.length + 1.,
            title: title,
            completed: completed
        }

        todos.push(newobj);

        res.status(201).json({
            ok: true,
            message: "created successfully",
            body: newobj
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "something went wrong",
            err: err.message
        })
    }
})

//UPDATE

app.patch("/todos/:id",(req,res)=>{
  try{
          let updateid=Number(req.params.id)
  
           let indexnum= todos.findIndex(todo=>todo.id===updateid)

           if(indexnum===-1){
            return res.status(404).json({
                  success:false,
                  message:"bject doesnt exist"
              })
           }


           let updatedobj={
                 ...todos[indexnum],
                 ...req.body,
                 id:updateid
           }

           todos[indexnum]=updatedobj

           res.status(201).json({
              success:true,
              message:"updated successfully",
              body:updatedobj
           })
  } 
    catch(error){
            res.status(500).json({
               success:false,
               message:"something went wrong",
               error:error.message
            })
    }
})


//DELETE

app.delete("/todos/:id",(req,res)=>{
  try{
       let deleteid=Number(req.params.id)
       let deletetodo=todos.findIndex(todo=>todo.id===deleteid)
       if(deletetodo==-1){
         return res.status(500).json({
           
            message:"object is not available"
          })
       }
              todos.splice(deletetodo,1);

       res.status(201).json({
          success:true,
          message:"post deleted successfully",
       })
      } catch(error){
          res.status(500).json({
              success:false,
              message:"something went wrong",
              error:error.message
          })
      }

})


app.listen(port, () => {
    cl(`Server running at http://localhost:${port}`)

})
