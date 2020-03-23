const {shell} = require('electron');
var getTitleAtUrl = require('get-title-at-url');

document.addEventListener('click', (event) => {
  if (event.target.href) {
    // Open links in external browser
    shell.openExternal(event.target.href)
    event.preventDefault()
  } else if (event.target.classList.contains('js-refresh-action')) {
    updateStatistics();
  } else if (event.target.classList.contains('js-quit-action')) {
    window.close();
  }
});

const getStatistics = (callback) => {
  getTitleAtUrl("https://www.worldometers.info/coronavirus/", function(statistics){
    callback(statistics);
  });
}

const updateView = (statistics) => {
  statistics = statistics.split(' ');
  document.querySelector('.js-total-cases').textContent = statistics[0];
  document.querySelector('.js-total-deaths').textContent = statistics[3];
}

const updateStatistics = () => {
    getStatistics((statistics) => {
      updateView(statistics);
    });
}

// Refresh statistics every minute
const tenMinutes = 60 * 1000
setInterval(updateStatistics, tenMinutes);

// Update initial weather when loaded
document.addEventListener('DOMContentLoaded', updateStatistics);
