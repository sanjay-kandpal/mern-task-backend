const Task = require('../models/taskModel');

//  Creating a task
exports.createTask = async(req,res) =>{
    try{
        const data = new Task(req.body);
        await data.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            // saved
        });
        res.status(200).json(data);     
    }catch (error) {
        res.status(500).json({err: error.message});
        return;
    }
   
}
// fetching a task from Mongo Db
exports.fetchTasksDb = async(req,res) =>{
    try {
        const data = await Task.find();
        res.status(200).json(data);     
    } catch (error) {
        res.status(500).json({err: error.message})
    }
}

// fetching a single task from db
exports.getTask = async(req,res) =>{
    try {
        const task = await Task.findById(req.params.id);
       
        if(!task){
          return  res.status(404).send(`Id not Exist ${task}`)
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({err: error.message})
    }
}

exports.delTask = async(req,res) =>{
    try {
        console.log(req.params.id);
        await Task.findByIdAndDelete({_id: req.params.id});
        // await Task.save(function(err){
        //     if(err){
        //         console.log(err);
        //     }
        // });
        res.status(200).send(`Task deleted`);
    } catch (error) {
        res.status(500).json({err: error.message});
    }
}

exports.updateTask = async(req,res) =>{
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(
            {_id: id},req.body,{
                new: true,
                runValidators: true,
            }
        )
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({err: error.message});
    }
}