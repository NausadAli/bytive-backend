const express = require('express');
const router = express.Router();
const Task = require('../models/taskSchema');

//Creating Task
router.post('/', async (req, res) => {
  try {
      const { title, description } = req.body;
      if (!title || !description) {
          return res.status(400).json({ error: 'Title and Description both are required.' });
      }
      const newTask = new Task({ title, description });
      await newTask.save();
      res.status(201).json(newTask);
  } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

//get all tasks
router.get('/', async (req,res)=>{
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error geting task:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
})

//get tasks by their id's
router.get('/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    if(!id){
      return res.status(404).json({error : 'id Not Found or Invalid'})
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found Or Deleted' });
    }
    // console.log(task.status)

    res.status(200).json({
      id : task._id,
      title: task.title,
      description : task.description,
      status: task.status
    })
  } catch (error) {
    console.error('Error getting Task:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
})


//Update the Task Status
router.put('/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const { status } = req.body;
    const taskStatus = ['pending', 'in-progress', 'completed'];
    if(!taskStatus.includes(status)){
      return res.status(404).json({error : `Enter a Valid Status Must be one of :  ${taskStatus}`})
    }

    // console.log('HERE____1')
    const task = await Task.findByIdAndUpdate(
      id, // Find by the task ID
      { status }, 
      { new: true }
  );
  // console.log(task)

  if (!task) {
      return res.status(404).json({ error: 'Task not found Or Deleted' });
  }
    // console.log(2)

    res.status(200).json({
      msg : `Updated to ${status}`,
      id : task._id,
      title: task.title,
      description : task.description,
      status: task.status
    })

  } catch (error) {
    console.error('Error in Id or Error :', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
})


//deletion of task
router.delete('/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    if(!id){
      return res.status(404).json({error : 'id Not Found or Invalid'})
    }
    const task = await Task.findByIdAndDelete(id);
    if(!task){
      return res.status(404).json({error : 'Task Not Found '})
    }
    res.status(200).json({
      msg: 'Task Deleted Successfully----',
      id : task._id,
      title: task.title,
      description : task.description,
    })
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
})

module.exports = router;
