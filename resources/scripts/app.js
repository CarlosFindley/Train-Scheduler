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
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainTime),
      $("<td>").text(trainFrequency),
    );
  
    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });
  