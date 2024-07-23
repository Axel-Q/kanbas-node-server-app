import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  // Get all modules for a course
  app.get("/api/courses/:courseCode/modules", async (req, res) => {
    const { courseCode } = req.params;
    const modules = await dao.findModulesForCourse(courseCode);
    res.json(modules);
  });

  // Create a new module for a course
  app.post("/api/courses/:courseCode/modules", async (req, res) => {
    const { courseCode } = req.params;
    const newModule = {
      ...req.body,
      course: courseCode
    };
    const createdModule = await dao.createModule(newModule);
    res.send(createdModule);
  });

  // Delete a module
  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await dao.deleteModule(mid);
    res.sendStatus(200);
  });

  // Update a module
  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await dao.updateModule(mid, req.body);
    res.sendStatus(204);
  });
}