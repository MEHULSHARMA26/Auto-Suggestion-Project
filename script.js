
const searchBar = document.getElementById("search-bar");
const suggestionsList = document.getElementById("suggestions-list");


const API_URL = "https://omrivolk-autocomplete-v1.p.rapidapi.com/suggestqueries";
const API_HEADERS = {
  "X-RapidAPI-Key": "80e8e41a11msh5744c1b3898f557p172dd3jsn46ba884324af",
  "X-RapidAPI-Host": "auto-suggest-queries.p.rapidapi.com",
};


const fetchSuggestions = async (query) => {
  if (!query) {
    suggestionsList.innerHTML = ""; 
    return;
  }

  try {
    const response = await fetch(`${API_URL}?s=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: API_HEADERS,
    });

    if (!response.ok) throw new Error("Failed to fetch suggestions");

    const suggestions = await response.json();
    displaySuggestions(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};


const displaySuggestions = (suggestions) => {
  suggestionsList.innerHTML = ""; 

  suggestions.forEach((suggestion) => {
    const listItem = document.createElement("li");
    listItem.textContent = suggestion;

  
    listItem.addEventListener("click", () => {
      searchBar.value = suggestion;
      suggestionsList.innerHTML = ""; 
    });

    suggestionsList.appendChild(listItem);
  });
};

let debounceTimeout;
const debounce = (callback, delay) => {
  return (...args) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => callback(...args), delay);
  };
};

searchBar.addEventListener(
  "input",
  debounce((e) => {
    const query = e.target.value;
    fetchSuggestions(query);
  }, 2000)
);