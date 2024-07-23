import ModuleModel from "./model.js";

export const findModulesForCourse = (courseId) => {
  return ModuleModel.find({ course: courseId });
};

export const createModule = (module) => {
  return ModuleModel.create(module);
};

export const deleteModule = (moduleId) => {
  return ModuleModel.deleteOne({ _id: moduleId });
};

export const updateModule = (moduleId, module) => {
  return ModuleModel.updateOne({ _id: moduleId }, { $set: module });
};