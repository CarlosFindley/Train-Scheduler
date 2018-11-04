// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAfwElDlVHmmDjgsX4gmwqpmcI1_5aUQss",
    authDomain: "train-scheduler-e9555.firebaseapp.com",
    databaseURL: "https://train-scheduler-e9555.firebaseio.com",
    projectId: "train-scheduler-e9555",
    storageBucket: "train-scheduler-e9555.appspot.com",
    messagingSenderId: "411096599831"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  // 2. Button for adding train info
$("#submitBtn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainTime = $("#timeInput").val().trim();
    var trainFrequency = $("#frequencyInput").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };


    // Uploads employee data to the database
  database.ref().push(newTrain);


  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

//   alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // code from excercises
    // Grabbing the trainTime input and subtracting a year to make sure it comes before current time
    // Putting the date in a var and console logging
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Setting current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference in minutes betwwen irstTimeConverted and currentTime
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Modulating diffTime with trainFrequency to calculate time remainder in minutes
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train 
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrainArrival = moment().add(tMinutesTillTrain, "minutes").format("LT");
    console.log("ARRIVAL TIME: " + moment(nextTrainArrival).format("HH:mm"));
  
    // Create the new row and add content to page
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency + " mins"),
      $("<td>").text(trainTime),
      $("<td>").text(nextTrainArrival),
      $("<td>").text(tMinutesTillTrain + " mins"),
    );
  
    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });

  
$(document).ready(function() {
    // Adding clock
    function displayTime() {
        var currentTime = new Date();
	    var hours = currentTime.getHours();
	    var minutes = currentTime.getMinutes();
   	    var seconds = currentTime.getSeconds();

            // Grabs the clock id
            var clockDiv = document.getElementById("clock");

            // Let's set the AM and PM meridiem and 
            // 12-hour format
            var meridiem = "AM";  // Default is AM

            // Convert from 24 hour to 12 hour format
            // and keep track of the meridiem.
            if (hours > 12) {
            hours = hours - 12;
            meridiem = "PM";
            }

            // 0 AM and 0 PM should read as 12
            if (hours === 0) {
            hours = 12;    
            }

            if (hours < 10) {
                // Add the "0" digit to the front
                // so 9 becomes "09"
                hours = "0" + hours;
            }

            if (minutes < 10) {
                // Add the "0" digit to the front
                // so 9 becomes "09"
                minutes = "0" + minutes;
            }
            
            // If the seconds digit is less than ten                    
            if (seconds < 10) {
                // Add the "0" digit to the front
                // so 9 becomes "09"
                seconds = "0" + seconds;
                }

            // Set text in clock div
            // Set hours, minutes, and seconds of the current time
            clockDiv.innerText = hours + ":" + minutes + ":" + seconds + " " + meridiem;             
}

    // Run displayTime()
    displayTime();

    // This makes our clock 'tick' by repeatedly
    // running the displayTime function every second.
    setInterval(displayTime, 1000);

});
