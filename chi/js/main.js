window.onload = function() {

  let body = document.getElementsByTagName("body")[0];
  let defaultTheme = "dark";

  hasStorageAccess = setStorageState();  // handle browser disabling cookies
  if (hasStorageAccess) {
    setThemeFromStorage();
  }
  else {
    body.classList.add(defaultTheme);
  }

  setOnClicks();
  setDescription();
  hideElements();
  buildSeasonPickers();
  clearInputBoxes();

  clearVATable();  // For those with itchy trigger fingers
  setSeason("", "");  // Set to current season
  window.mediaFormats = ["TV", "ONA", "TV_SHORT"];
  populateVATableWithSeason();

  if (hasStorageAccess) { populateFollowTable(); }

}

function setOnClicks() {

  let searchButton = document.getElementById("search-button");
  let refreshButton = document.getElementById("refresh-button");
  let darkModeSwitch = document.getElementById("dark-mode-switch");
  let leftTableSwitch = document.getElementById("left-table-switch");
  let importButton = document.getElementById("import-button");
  let exportButton = document.getElementById("export-button");

  searchButton.onclick = function() { searchButtonOnClick(); }
  refreshButton.onclick = function() { refreshButtonOnClick(); }
  darkModeSwitch.onclick = function() { darkModeSwitchOnClick(); }
  leftTableSwitch.onclick = function() { leftTableSwitchOnClick(); }
  importButton.onclick = function() { importButtonOnClick(); }
  exportButton.onclick = function() { exportButtonOnClick(); }
  setNavigationOnClicks();

}

function populateVATableWithSeason() {

  let seasonElement = document.getElementById("quarter-picker");
  let season = seasonElement.options[seasonElement.selectedIndex].value.toUpperCase();
  let year = document.getElementById("year-picker").value;
  let variables = {
      perPage: 50,
      page: 1,
      season: season,
      seasonYear: year,
  };

  lock();
  window.voiceActors = {};
  for (let format of window.mediaFormats) {
    variables.format = format;
    makeRequest(getQuery(""), variables, collectSeasonalVAsCallback);
  }

}

function populateFollowTable() {

  let following = getFollowing();
  let idArray = Object.keys(following);

  lock();
  for (let id of idArray) {
    let variables = { id: id };
    makeRequest(
      getQuery("VA ID"),
      variables,
      function(data) {
        // Need length to unlock when done
        collectFollowingCallback(idArray.length, data);
      }
    );
  }

}

function isLocked() {
  return document.getElementsByTagName("body")[0].classList.contains("locked");
}

function lock() {
  document.getElementsByTagName("body")[0].classList.add("locked");
}

function unlock() {
  document.getElementsByTagName("body")[0].classList.remove("locked");
}

function fetchTheme() {
  let themeString = localStorage.getItem("theme");
  return themeString;
}

function saveTheme(themeString) {
  localStorage.setItem("theme", themeString);
}

function setThemeFromStorage(defaultTheme) {

  let body = document.getElementsByTagName("body")[0];
  let theme = fetchTheme();

  if (theme) {
    body.classList.add(theme);
  }
  else {
    body.classList.add(defaultTheme);
  }

  switch (theme) {
    case "light":
      document.getElementById("dark-mode-switch").value = "Turn Dark Mode On";
      break;
    case "dark":
      document.getElementById("dark-mode-switch").value = "Turn Dark Mode Off";
      break;
    default:
  }

}
