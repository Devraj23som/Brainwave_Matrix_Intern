import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  amount: { type:Number, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String},
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  key: { type:Date, }
});
const Task = mongoose.model("Task", taskSchema);
// module.exports = mongoose.model('Task', taskSchema);
export default Task;