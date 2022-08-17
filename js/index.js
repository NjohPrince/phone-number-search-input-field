// https://restcountries.com/v2/all - API we will be using

const filterField = document.querySelector("#filter");
const contactField = document.querySelector("#contact");
const suggestionsList = document.querySelector("#data-target");
const suggestionsListWrapper = document.querySelector("#suggestions__list");

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

const populateSuggestionsList = (dataSource) => {
  suggestionsList.innerHTML = "";

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

  // console.log("SUGGESTIONS_LIST: ", suggestionsList);
};

populateSuggestionsList(dataSource);

let currentDataSource = dataSource;

const setSelectedCountryCode = (index) => {

  const filteredChoice = index > currentDataSource.length? dataSource[index] : currentDataSource[index];

  const flagReferenceImg = document.querySelector(".selected__flag");
  const code = document.querySelector(".selected__phone__code");

  flagReferenceImg.src = filteredChoice.flag;
  flagReferenceImg.alt = filteredChoice.name;
  flagReferenceImg.width = "25";
  flagReferenceImg.height = "25";
  code.textContent = "+" + filteredChoice.callingCode;

  //Clear the filter field
  filterField.value = "";
};

// set a default country code to be shown here by manipulating the
// index value
setSelectedCountryCode(0);

// handling filtering change events
const getFilterValue = (e) => {
  // console.log("FILTER_VALUE: ", e.target.value);
  const filterValue = e.target.value;

  if (e.keyCode === 13) {
    /** NaN Check */
    if (!Number.isNaN(Number(filterValue))) {
      // console.log("Number Detected!");
      const index = dataSource.findIndex((code) => {
        return code.callingCode === filterValue;
      });
      //   console.log(index);

      if (index !== -1) {
        toggleSuggestionsList();
        setSelectedCountryCode(index);
      } else {
        alert("No country found with given code.");
      }
    } else {
      // a typical string
      //   console.log("String Detected!");
      const filteredItems = dataSource.filter((code) => {
        return code.name.toLowerCase().includes(filterValue.toLowerCase());
      });

      if (filteredItems.length === 0) {
        alert("No country found.");
      } else if (filteredItems.length > 1) {
        alert("Please choose a more specific country.");
      } else {
        toggleSuggestionsList();
        const index = dataSource.findIndex((code) => {
          return code.callingCode === filteredItems[0].callingCode;
        });
        setSelectedCountryCode(index);
      }
    }
    return;
  }

  if (filterValue !== "" && filterValue !== null && dataSource.length !== 0) {
    let filteredItems = dataSource.filter((code) => {
      return code.callingCode.includes(filterValue);
    });

    if (filteredItems.length === 0) {
      filteredItems = dataSource.filter((code) => {
        return code.name.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    // console.log("FILTERED_LIST_AFTER_TYPING: ", filteredItems);
    if (
      filteredItems.length === 0 &&
      (filterValue === "" || filterValue === null)
    ) {
      filteredItems = dataSource;
    }

    currentDataSource = filteredItems;
    populateSuggestionsList(filteredItems);
    // console.log("CURRENT_DATA_SOURCE: ", currentDataSource);
    logSuggestionsNodeList();
  } else {
    currentDataSource = dataSource;
    populateSuggestionsList(dataSource);
    // console.log("CURRENT_DATA_SOURCE: ", currentDataSource);
    logSuggestionsNodeList();
  }
};

// once a suggestion is selected run we fetch the corresponding
// details from the server and hide the suggestions list

const logSuggestionsNodeList = () => {
  // document.querySelectorAll(".suggestion").forEach((suggestion, index) => {
  //   console.log("SINGLE_SUGGESTION: ", suggestion);
  // });
  addEventListenersToSuggestions();
};

const addEventListenersToSuggestions = () => {
  document.querySelectorAll(".suggestion").forEach((suggestion, index) => {
    // console.log("SINGLE_SUGGESTION: ", suggestion);
    suggestion.addEventListener("click", () => {
      // console.log("SELECTED_INDEX: ", index);
      setSelectedCountryCode(Number(suggestion.id));
      toggleSuggestionsList();
    });
  });
};

addEventListenersToSuggestions();

// handling getting the contact entered
const getContactValue = (e) => {
  console.log("CONTACT: ", e.target.value);
};

//Fetching Data From API 
const fetchData = async () => {
  const source = "https://restcountries.com/v2/all";
  const response = await fetch(source);
  let data = await response.json();
  data = data.map((country) => {
    return {name: country.name, callingCode: country.callingCodes[0],flag: country.flags.png}
  }
  );
  dataSource = data;
  currentDataSource = data;
  populateSuggestionsList(dataSource);
  addEventListenersToSuggestions();
}
fetchData();