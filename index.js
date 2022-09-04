//! DOM manipulation comes with a cost.

//TODO: Add SHIP TO DATABASE btn

//$Variables
let myLead = [];
let length = 0;
let listItems;

//If possible, use const. If not, use let.
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("del-btn");
const delAllBtn = document.getElementById("del-all-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

//$Local Storage
// localStorage.setItem("myLead", JSON.stringify(myLead)); myLead is an array
//localStorage.setItem("key", "value");
//localStorage.getItem("key");
//JSON.parse(localStorage.getItem("key")); key is an array
//localStorage.clear();

//feature Avoid loosing data when refreshing by storing and fetching from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"));
if (leadsFromLocalStorage) { //checks if leadsFromLocalStorage is truthy
    myLead = leadsFromLocalStorage;
    render(myLead);
}

//feature console.log(typeof myLead) returns datatype of argument

//$Event Listeners
//SAVE INPUT
inputBtn.addEventListener("click", function() {
    if(inputEl.value.length > 0) {
        myLead.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem("myLead", JSON.stringify(myLead));
        render(myLead);
    }
})

//feature Executes on Enter btn
inputEl.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        inputBtn.click();
    }
})

//DELETE LAST INPUT
delBtn.addEventListener("click", function() {
    if(myLead.length > 0) {
        ulEl.lastChild.parentNode.removeChild(ulEl.lastChild);
        myLead.pop();
        localStorage.setItem("myLead", JSON.stringify(myLead));
    }
})

//DELETE ALL INPUTS
delAllBtn.addEventListener("click", function() {
    length = myLead.length;
    for(let j = 0; j < length; j++) {
        myLead.pop();
    }
    render(myLead);
    localStorage.clear();
});

//feature This is how tabs url are represented in Chrome
/* 
const tabs = [
    {url: "http://localhost:8080/"}
]
*/

//SAVE TAB URL
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLead.push(tabs[0].url);
        localStorage.setItem("myLead", JSON.stringify(myLead));
        render(myLead);
    });
})
   
//$Functions
//feature Makes the <li> elements visible on screen
function render(leads) {
    listItems = '';
    for (let i = 0; i < leads.length; i++) {
    listItems +=
        `<li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems;
}
     /*
    Or: 
    const li = document.createElement("li");
    li.textContent = myLead[i]
    ulEl.append(li);  
    */