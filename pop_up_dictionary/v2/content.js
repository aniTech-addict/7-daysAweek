// This script runs on the web page. It detects text selection and shows the popup.

let synonymPopup = null;

// Listen for a mouse up event, which usually follows a text selection
document.addEventListener('mouseup', handleTextSelection);

function handleTextSelection(event) {
  // Don't trigger if we clicked inside our own popup
  if (synonymPopup && synonymPopup.contains(event.target)) {
    return;
  }
  
  // Clean up any existing popup
  removePopup();

  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    // We only want to trigger for single words
    if (selectedText.includes(' ')) {
        return;
    }
    
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    createPopup(rect.left + window.scrollX, rect.top + window.scrollY, selectedText);
  }
}

// Listen for clicks elsewhere on the page to close the popup
document.addEventListener('mousedown', (event) => {
    if (synonymPopup && !synonymPopup.contains(event.target)) {
        removePopup();
    }
});


function createPopup(x, y, word) {
  synonymPopup = document.createElement('div');
  synonymPopup.id = 'synonym-finder-popup';
  synonymPopup.innerHTML = '<p class="loading">Fetching synonyms...</p>';
  
  // Position the popup slightly below the selected word
  synonymPopup.style.left = `${x}px`;
  synonymPopup.style.top = `${y + 50}px`; // 50px below the selection
  
  document.body.appendChild(synonymPopup);

  fetchSynonyms(word);
}

async function fetchMeaning(word) {
  try {
    const base_url = 'https://en.wikipedia.org/wiki/'
    const url = base_url + word;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const htmlString = await response.text();
    displayMeaning(htmlString);
  } catch (error) {
    console.error('Error fetching synonyms:', error);
    if(synonymPopup) {
       synonymPopup.innerHTML = '<p class="error">Could not fetch synonyms.</p>';
    }
  }
}

function displayMeaning(htmlString) {
  
  
  console.log(htmlString)
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  const result = doc.querySelectorAll('p');
  
  console.log(result)
  
  if (result.length === 0) {
    synonymPopup.innerHTML = '<p>No synonyms found.</p>';
    return;
  }

  // Take top 10 results
  const topSynonyms = result.slice(0, 10);

  let listHtml = '<ul>';
  topSynonyms.forEach(item => {
    listHtml += `<li>${item}</li>`;
  });
  listHtml += '</ul>';
  
  synonymPopup.innerHTML = listHtml;
}

function removePopup() {
  if (synonymPopup) {
    synonymPopup.remove();
    synonymPopup = null;
  }
}
