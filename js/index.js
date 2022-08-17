// https://restcountries.com/v2/all - API we will be using

const filterField = document.querySelector("#filter");
const contactField = document.querySelector("#contact");
const suggestionsList = document.querySelector("#suggestions__list");
const suggestions = document.querySelectorAll(".suggestion");

let dataArray = {
  contact: "",
  filterValue: "",
};

const { contact, filterValue } = dataArray;

// function to control visibility of the suggestions list
const toggleSuggestionsList = () => {
  suggestionsList.classList.toggle("show");
};

// once a suggestion is selected run we fetch the corresponding
// details from the server and hide the suggestions list
suggestions.forEach((suggestion, index) => {
  suggestion.addEventListener("click", () => {
    toggleSuggestionsList();
  });
});

// handling filtering change events
const getFilterValue = (e) => {
  console.log("Filter Value: ", e.target.value);
};

// handling getting the contact entered
const getContactValue = (e) => {
  console.log("Contact: ", e.target.value);
};
