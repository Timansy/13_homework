// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".eat-burger").on("click", function(event) {
    var id = $(this).data("id");
    var isEaten = $(this).data("iseaten");

    var newEatenState = {
      eaten: isEaten
    };

    // Send the PUT request.
    $.ajax("/api/burger/" + id, {
      type: "PUT",
      data: newEatenState
    }).then(
      function() {
        console.log("changed eaten to", newEatenState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // check to see if it is vegan, and if not, make it vegan
    let tempburgername = $("#bu").val().trim();
    if (tempburgername.includes("vegan")||tempburgername.includes("Vegan")){
        //do nothing
    } else {
        tempburgername = "Vegan " + tempburgername;
    }
    tempburgername
    var newBurger = {
      name: tempburgername.replace(/not/gi, 'All'),
      eaten: $("[name=eaten]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burger/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
