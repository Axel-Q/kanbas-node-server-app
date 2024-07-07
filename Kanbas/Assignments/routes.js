import db from "../Database/index.js";
export default function AssignmentRoutes(app) {
    // GET all assignments for a specific course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const {cid} = req.params;
        const assignments = db.assignments.filter((assignment) => assignment.course === cid);
        res.json(assignments);
    });

    // POST a new assignment to a specific course
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const {cid} = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    // DELETE an assignment by its ID
    app.delete("/api/assignments/:aid", (req, res) => {
        const {aid} = req.params;
        db.assignments = db.assignments.filter((assignment) => assignment._id !== aid);
        res.sendStatus(200);
    });

    // PUT to update an assignment by its ID
    app.put("/api/assignments/:aid", (req, res) => {
        const {aid} = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (assignment) => assignment._id === aid
        );
        if (assignmentIndex !== -1) {
            db.assignments[assignmentIndex] = {
                ...db.assignments[assignmentIndex],
                ...req.body
            };
            res.sendStatus(204);
        } else {
            res.sendStatus(404); // Not Found if no assignment with that ID exists
        }
    });
}
