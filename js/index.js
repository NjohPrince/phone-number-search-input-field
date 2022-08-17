// https://restcountries.com/v2/all - API we will be using

const filterField = document.querySelector("#filter");
const contactField = document.querySelector("#contact");
const suggestionsList = document.querySelector("#data-target");
const suggestions = document.querySelectorAll(".suggestion");
const suggestionsListWrapper = document.querySelector("#suggestions__list");
const selectedCodeWrapper = document.querySelector("selected__code");

let dataArray = {
  contact: "",
  filterValue: "",
};

let dataSource = [
  {
    name: "Cameroon",
    callingCode: "237",
    flag: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
  {
    name: "Nigeria",
    callingCode: "1",
    flag: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
  {
    name: "Ghana",
    callingCode: "234",
    flag: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
];

const { contact, filterValue } = dataArray;

// function to control visibility of the suggestions list
const toggleSuggestionsList = () => {
  suggestionsListWrapper.classList.toggle("show");
};

// once a suggestion is selected run we fetch the corresponding
// details from the server and hide the suggestions list

let selectedID = 0;

suggestions.forEach((suggestion, index) => {
  suggestion.addEventListener("click", () => {
    let selectesID = 0;
    
    toggleSuggestionsList();
  });
});

// handling filtering change events
const getFilterValue = (e) => {
  console.log("FILTER_VALUE: ", e.target.value);
};

// handling getting the contact entered
const getContactValue = (e) => {
  console.log("CONTACT: ", e.target.value);
};

const populateSuggestionsList = () => {
  dataSource.map((data, index) => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion");
    suggestion.classList.add("flex");
    suggestion.id = index;

    suggestionsList.append(suggestion);

    const img = document.createElement("img");
    img.src = data.flag;
    img.alt = data.name;
    img.width = "25";
    img.height = "25";

    suggestion.append(img);

    const code = document.createElement("h4");
    const country = document.createElement("h4");

    code.classList.add("s_code");
    country.classList.add("s_country");

    code.textContent = data.callingCode;
    country.textContent = data.name;

    suggestion.append(code);
    suggestion.append(country);

    suggestionsList.append(suggestion);
  });

  console.log("SUGGESTIONS_LIST: ", suggestionsList);
};

populateSuggestionsList();
