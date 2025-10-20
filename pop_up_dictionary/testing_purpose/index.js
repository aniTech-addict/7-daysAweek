document.addEventListener('mouseup', handleTextSelection);

function handleTextSelection(event) {
    // single word selection allowed
    if (selection.length === 0 || selection.includes(' ')) {
        return;
    }
    
    const selection = window.getSelection().toString();
    wikiScrape(selection);
}

async function wikiScrape(selection){
    console.log("WikiScapring started");
    const baseUrl = 'https://en.wikipedia.org/wiki/';
    const url = baseUrl + selection;
    
    // fetch the page's html

    const paras = await querySelectorALL(page, 'p');
    console.log(paras);
}