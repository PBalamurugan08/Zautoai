var list = [];

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name");
  var city = document.getElementById("city");

  // Check if name and city are not empty before adding to the list
  if (name.value.trim() !== "" && city.value.trim() !== "") {
    list.push({ name: name.value, city: city.value });

    // Save the updated list to localStorage
    localStorage.setItem("list", JSON.stringify(list));
  }

  name.value = "";
  city.value = "";

  var modal = new bootstrap.Modal(document.getElementById("myModal"));
  modal.hide();

  // Clear the existing card container before adding new details
  var cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  addEmployeeDetails();
});

function addEmployeeDetails() {
  const employee = localStorage.getItem("list");
  const employeeList = JSON.parse(employee) || [];

  // Clear the list array before adding details from local storage
  list = [];

  // Add details from local storage to the list array
  employeeList.forEach((data) => {
    list.push(data);
  });

  prepareHTML();

  if (!list.length) {
    document.getElementById("card-container").innerHTML = "";
  }
}

function prepareHTML() {
  var checked = document.getElementById("defaultCheck").checked;
  var divWidth = checked ? "100%" : "14rem";
  // Display employee details in cards
  document.getElementById("card-container").innerHTML = "";
  list.forEach((data) => {
    var card = document.createElement("div");
    card.innerHTML = `
      <div class="card" style="width: ${divWidth}">
        <div class="card-body">
          <h5 class="card-subtitle mb-2 text-muted">Name : ${data.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">City: ${data.city}</h6>
        </div>
      </div>
    `;
    document.getElementById("card-container").appendChild(card);
  });
}

function clearList() {
  localStorage.clear();
  addEmployeeDetails();
}

// Initial call to populate employee details when the page loads
addEmployeeDetails();
