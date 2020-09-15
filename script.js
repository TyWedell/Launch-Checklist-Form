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

window.addEventListener('load', function () {
   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
      response.json().then(function (json) {
         let missionTarget = document.getElementById('missionTarget');
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[4].name}</li>
            <li>Diameter: ${json[4].diameter}</li>
            <li>Star: ${json[4].star}</li>
            <li>Distance from Earth: ${json[4].distance}</li>
            <li>Number of Moons: ${json[4].moons}</li>
         </ol>
         <img src="${json[4].image}">
         `
      })
   })
   let form = document.getElementById('form');
   form.addEventListener('submit', function (event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      if (pilotName.value == '' || copilotName.value === '' || fuelLevel.value === '' || cargoMass.value === '') {
         alert('All fields required!');
         event.preventDefault();
      } else if (isNaN(pilotName.value) === false || isNaN(copilotName.value) === false) {
         alert('Names should not be numbers!');
         event.preventDefault();
      } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert('Fuel level and Cargo Mass should be numbers!');
         event.preventDefault();
      }

      let faultyItems = document.getElementById('faultyItems');
      let launchStatus = document.getElementById('launchStatus');
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');
      let fuelStatus = document.getElementById('fuelStatus');
      let cargoStatus = document.getElementById('cargoStatus');
      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready`;
      copilotStatus.innerHTML = `CoPilot ${copilotName.value} is ready`;

      if (fuelLevel.value < 10000) {
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = 'Not enough fuel for the journey.';
         launchStatus.innerHTML = 'Shuttle not ready for Launch';
         launchStatus.style.color = 'red'
         event.preventDefault()
      } else if (cargoMass.value > 10000) {
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = 'Too much mass to take off.';
         launchStatus.innerHTML = 'Shuttle not ready for Launch';
         launchStatus.style.color = 'red'
         event.preventDefault()
      } else {
         launchStatus.innerHTML = 'Shuttle is ready for launch';
         launchStatus.style.color = 'green';
         event.preventDefault()
      }
   })


})
