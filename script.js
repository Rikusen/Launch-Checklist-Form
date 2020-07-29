// Write your JavaScript code here!

window.addEventListener("load", function () {
	let form = document.querySelector("form");
	form.addEventListener("submit", function (event) {
		event.preventDefault();

		let readyForLaunch = true;
		let validInput = true;

		let pilot = document.querySelector("input[name=pilotName]");
		let copilot = document.querySelector("input[name=copilotName]");
		let fuelLevel = document.querySelector("input[name=fuelLevel]");
		let cargoMass = document.querySelector("input[name=cargoMass]");

		let fuelStatus = document.getElementById("fuelStatus");
		let cargoStatus = document.getElementById("cargoStatus");
		let launchStatus = document.getElementById("launchStatus");

		let copilotStatus = document.getElementById("copilotStatus");
		let pilotStatus = document.getElementById("pilotStatus");


		if (pilot.value === "" || copilot.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
			alert("All fields are required!");
			validInput = false;
			document.getElementById("faultyItems").style.visibility = "hidden";

			launchStatus.innerHTML = "Awaiting Information Before Launch";
			launchStatus.style.color = "black";

		} else if (!(isNaN(pilot.value)) || !(isNaN(copilot.value)) || isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
			alert("One or more field's have an invalid input!");
			validInput = false;
			document.getElementById("faultyItems").style.visibility = "hidden";

			launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         
		} else {
			document.getElementById("faultyItems").style.visibility = "visible";
		}

		if (validInput) {

			if (Number(fuelLevel.value) < 10000) {

				readyForLaunch = false;
				fuelStatus.innerHTML = "Fuel level too low for launch";

			} else {
				fuelStatus.innerHTML = "Fuel level high enough for launch";
			}

			if (Number(cargoMass.value) > 10000) {

				readyForLaunch = false;

				cargoStatus.innerHTML = "Too much cargo for launch";

			} else {
				cargoStatus.innerHTML = "Cargo mass low enough for launch";
         }
         
			if (!readyForLaunch) {
				document.getElementById("faultyItems").style.visibility = "visible";

				launchStatus.innerHTML = "Shuttle Not Ready for Launch";
				launchStatus.style.color = "Red";

				pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;

				copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;

			} else {

				pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
				copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;


				launchStatus.innerHTML = "Shuttle Is Ready for Launch";
				launchStatus.style.color = "green";
			}
		}

	});
});

fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
	response.json().then(function (json) {
		const div = document.getElementById("missionTarget");
		// Add HTML that includes the JSON data
		let i = Math.floor(Math.random() * 6);;
		let planetaryData = `
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${json[i].name}</li>
   <li>Diameter: ${json[i].diameter}</li>
   <li>Star: ${json[i].star}</li>
   <li>Distance from Earth: ${json[i].distance}</li>
   <li>Number of Moons: ${json[i].moons}</li>
</ol>
<img src="${json[i].image}">`


		div.innerHTML = planetaryData;
	});
});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
