const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json())

const connection = mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'task_manager'
})
// connect to db
connection.connect((err)=>{
    if(err){
        console.log('Error in db connection!');
    }else{
        console.log('db connected sucessfully!');
    }
});
// Get list of tasks
app.get('/task',(req,res)=>{
    connection.query("Select * From tasks",[],(error,data)=>{
        if(error){
            return res.status(500).send('Error in getting all tasks')
        }else{
             res.json(data);
        }
    })
});
// Get Task by id
app.get('/task/:id',(req,res)=>{
    connection.query("Select * from tasks where id=?",[req.params.id],(error,data)=>{
        if(error){
            return res.status(500).send('Error in get by id');
        }else{
            res.json(data);
        }
    });
});
// Add a new task with a title, description, and status (defaulted to "pending").
app.post('/task',(req,res)=>{
    connection.query("Insert into tasks (title,description) values(?,?)",
    [req.body.title,req.body.description],(error,data)=>{
        if(error){
            return res.status(500).send('Error in inserting data');
        }else{
            res.json(data);
        }
    });
});
// Edit an existing task (title, description, status).
app.put('/task/:id',(req,res)=>{
    connection.query("Update tasks set title=?,description=?,status=? where id=?",
    [req.body.title,req.body.description,req.body.status,req.params.id],(error,data)=>{
        if(error){
            return res.status(500).send('Error in updating data');
        }else{
            res.json(data);
        }
    })
});
// Delete a task.
app.delete('/task/:id',(req,res)=>{
    connection.query("Delete from tasks where id =?", [req.params.id],(error,data)=>{
        if(error){
            return res.status(500).send('Error in deleting data');
        }else{
            res.json(data);
        }
    });
});
// Mark a task as completed
app.patch('/task/:id',(req,res)=>{
    connection.query("Update tasks set status=? where id=?",
    [req.body.status,req.params.id],(error,data)=>{
        if(error){
            return res.status(500).send('Error in updating status');
        }else{
            res.json(data);
        }
    })
});

app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});
