function startClock() {
  date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var timePeriod = "AM";
  
  if(hour == 0) { hour = 12; }
  
  if(hour > 12) {
      hour = hour - 12;
      timePeriod = "PM";
  }
  
  hour = (hour < 10) ? "0" + hour : hour;
  m = (min < 10) ? "0" + min : min;
  s = (sec < 10) ? "0" + sec : sec;
  var time = hour + ":" + min + ":" + sec + " " + timePeriod;

  document.getElementById("DigitalClock").innerText = time;
  document.getElementById("DigitalClock").textContent = time;
  setTimeout(showTime, 1000); 
}

startClock();
