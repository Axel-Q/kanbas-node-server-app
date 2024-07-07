import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
    app.get("/api/courses/:cid/assignments/:aid", (req, res) => {
        const {cid, aid} = req.params;
        const details = db.assignment_details.find((assignment) => assignment._id === aid && assignment.course === cid);
        if (details) {
            res.json(details);
        } else {
            res.sendStatus(404);
        }
    })


    app.put("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { aid} = req.params;
        const assignmentIndex = db.assignment_details.findIndex(
            (details) => details._id === aid
        );
        if (assignmentIndex !== -1) {
            db.assignment_details[assignmentIndex] = {
                ...db.assignment_details[assignmentIndex],
                ...req.body
            };
            res.sendStatus(204);
        } else {
            res.sendStatus(404); // Not Found if no assignment with that ID exists
        }
    });
}