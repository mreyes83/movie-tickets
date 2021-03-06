function Ticket(movie, time, age) {
  var year = movieDict[movie].year;
  this.time = parseInt(time.slice(0,2))+parseInt(time.slice(3,5))/100;
  if(year===2016) {
    this.isNew = true;
  } else {
    this.isNew = false;
  }
  this.age = age;
}

Ticket.prototype.getPrice = function() {
  var price = 8;
  if (this.age >= 60) {
    price *= 0.6;
  }
  if (!this.isNew) {
    price *= 0.5;
  }
  if (this.time > 17.00){
    price += 2;
  }
  return price;
}

function Movie(name, year) {
  this.name = name;
  this.year = year;
}
movieDict = {};

movieDict["Jurassic Park"] = new Movie("Jurassic Park", 1993);
movieDict["X-Men Apocalypse"] = new Movie("X-Men Apocalypse", 2016);
movieDict["The Angry Birds Movie"] = new Movie("The Angry Birds Movie", 2016);
movieDict["Captain America Civil War"] = new Movie("Captain America Civil War", 2016);
movieDict["Me Before You"] = new Movie("Me Before You", 2016);
movieDict["The Jungle Book"] = new Movie("The Jungle Book", 2016);
movieDict["Neighbors 2 Sorority Rising"] = new Movie("Neighbors 2 Sorority Rising", 2016);
movieDict["The Nice Guys"] = new Movie("The Nice Guys", 2016);
movieDict["Warcraft"] = new Movie("Warcraft", 2016);
movieDict["The Rocky Horror Picture Show"] = new Movie("The Rocky Horror Picture Show", 1975);
movieDict["Meaning of Life"] = new Movie("Meaning of Life", 1983);

var inputMovie = "";
var clearFields = function() {
  $("#input-time").val("");
  $("#input-number").val(1);
  $("#select-age").val("Select Your Age");
}
$(document).ready(function(){
  Object.keys(movieDict).forEach(function(key) {
    $("#movie-selector").append("<img class='thumb' src='img/"+movieDict[key].name+".jpg'>");
  });
  $(".thumb").click(function() {
    clearFields();
    $("#movie-poster").empty();
    $("#movie-poster").append("<img class='poster' src='"+$(this).attr("src")+"'>");
    var titleURL = $(this).attr("src");
    inputMovie = titleURL.slice(4,titleURL.length-4);
  });
  for(var i=13; i<113; i++) {
    $("#select-age").append("<option value='"+i.toString()+"'>"+i.toString()+"</option>");
  }
  $(".increment").click(function() {
    var current = $(this).siblings("input").val();
    if($(this).text()==="+") {
      current ++;
    } else if(current > 1){
      current --;
    }
    $(this).siblings("input").val(current);
  });

  $("form").submit(function(event) {
    event.preventDefault();

    var inputTime = $("#input-time").val();
    var inputAge = $("#select-age").val();
    var inputNumber = $("#input-number").val();

    var newTicket = new Ticket(inputMovie, inputTime, inputAge);
    $(".total-text").show();
    $("#total").text((newTicket.getPrice() * inputNumber).toFixed(2).toString());

  });
});
