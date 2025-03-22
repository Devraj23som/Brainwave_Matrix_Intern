import express from "express";
import Task  from '../models/taskModel.js'
import { authGuard } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
const router = express.Router();


router.post('/create', authGuard ,async (req, res) => {
  try {
    const { amount, description, date, category,type} = req.body;
 
    const task = new Task({ amount, description, date, category,type, assignedTo:req.user ,key:date});
    await task.save();
    const user = await User.findById(req.user);
    user.expense.push(task._id);
    await user.save();
    res.status(200).json({task});
  } catch (err) {
    res.status(500).send('Error creating task');
  }
});
router.get('/delete/:id', async (req, res) => {
  try {
   const task= await Task.findByIdAndDelete(req.params.id);
     await   User.updateOne(
          { _id: task.assignedTo }, 
          { $pull: { tasks: req.params.id } } 
        )
    res.status(200);
  } catch (err) {
    res.status(500).send('Error deleting task');
  }
});







export default router;
