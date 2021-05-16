// DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus");

//Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  //Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  //12 hour format
  hour = hour % 12 || 12;

  //Output time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;

  setTimeout(showTime, 1000);
}
//Add Zeroes to time
function addZero(numZ) {
  return (parseInt(numZ, 10) < 10 ? "0" : "") + numZ;
}

//set Background and Greeting
function setBackGreet(){
    let today = new Date(),
    hour = today.getHours();

    if(hour < 12){
        //morning
        document.body.style.backgroundImage = "url('../img/backgroundSciFi005.jpg')"
        greeting.textContent = 'Good Morning';
        document.body.style.color = 'blue';
    }else if (hour < 18) {
        //afternoon
        document.body.style.backgroundImage = "url('../img/backgroundSciFi003.jpg')"
        greeting.textContent = 'Good Afternoon';
    }else {
        //evening
        document.body.style.backgroundImage = "url('../img/backgroundSciFi001.jpg')"
        greeting.textContent = 'Good Evening';
    }
}
// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Enter A Name]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    } else {
      localStorage.setItem('name', e.target.innerText);
    }
  }
  

//Get Focus
function getFocus(){
    if(localStorage.getItem('focus') === null){
        focus.textContent = '[Enter an Idea you want to focus on]';
    }else{
        focus.textContent = localStorage.getItem('focus');
    }
}

//Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
  }


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Run function
showTime();
setBackGreet();
getName();
getFocus();
