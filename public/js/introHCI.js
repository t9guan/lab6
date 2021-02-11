'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);
	$("#testjs").click(function(e){
		$.get("/project/random", addProject);
	})
	// $('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	var endpoint = "/project/".concat(idNumber);
	console.log(endpoint);
	
	$.get(endpoint, callback);
}

function callback(result){
	//console.log(result);
	var projectID = result.id;
	var projectEle = "#project".concat(projectID ," .thumbnail .details");

	var date = "<p>".concat(result.date,"</p>");
	var title = "<p>".concat(result.title,"</p>");
	var image = "<img class=".concat( " \"detailsImage\"" , "src = \"", result.image, "\">");

	var htmlString = image.concat(title, date, result.summary)
	$(projectEle).html(htmlString);
}