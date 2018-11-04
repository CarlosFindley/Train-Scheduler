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

  alert("Train successfully added");

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
    var nextTrainArrival = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainArrival).format("HH:mm"));
  
    // Create the new row and add content to page
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(nextTrainArrival),
      $("<td>").text(trainFrequency),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });
  