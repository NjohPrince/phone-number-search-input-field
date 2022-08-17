// https://restcountries.com/v2/all - API we will be using

const filterField = document.querySelector("#filter");
const contactField = document.querySelector("#contact");
const suggestionsList = document.querySelector(".suggestions__list");

let dataArray = {
  contact: "",
  filterValue: "",
};

const { contact, filterValue } = dataArray;

const getFilterValue = (e) => {
  console.log("Filter Value: ", e.target.value);
};

const getContactValue = (e) => {
  console.log("Contact: ", e.target.value);
};
