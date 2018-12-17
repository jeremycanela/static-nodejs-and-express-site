// Require Express
const express = require("express");

// Require all projects' data
const { projects } = require("./data.json");
const app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

// Render home page
app.get("/", (req, res) => {
	res.render("index", {projects});
});

// Render about page
app.get("/about", (req, res) => {
	res.render("about");
});

// Render project page
app.get("/project/:id", (req, res) => {

	const projectID = req.params.id;
	if(projects.length > projectID) {
		res.render("project", {projects, projectID});
	} else {
		res.redirect("/error");
	}
});

// Error Handling
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

// App is served on port 3000
app.listen(3000, () => {
	console.log("The application is running on localhost:3000");
});