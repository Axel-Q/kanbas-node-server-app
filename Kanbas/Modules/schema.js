import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  module: { type: String, required: true }  // Assuming module is stored as a String (module ID)
}, { collection: "lessons" });

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  course: { type: String, required: true },  // Assuming course is stored as a String (course ID)
  lessons: [lessonSchema]
}, { collection: "modules" });

export default moduleSchema;