const express = require("express");
const { projects } = require("./data.json");
const app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
	res.render("index", {projects});
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/project/:id", (req, res) => {

	const projectID = req.params.id;
	if(projects.length > projectID) {
		res.render("project", {projects, projectID});
	} else {
		res.redirect("/error");
	}
});

app.use((req, res, next) => {
	const err = new Error("Uh Oh! File not found!");
	err.status = 404;
	next(err);
});

app.use((error, req, res, next) => {
	res.locals.error = error;
	res.status(error.status);
	res.render("error", {error});
	console.error("404 Error: File Not Found");
});

app.listen(3000, () => {
	console.log("The application is running on localhost:3000");
});