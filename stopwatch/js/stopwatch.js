window.onload = function () {
    var seconds = 00; 
    var mins = 00;
    var appendMins = document.getElementById("mins")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval;
  
    buttonStart.onclick = function() {   
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }
    
    buttonStop.onclick = function() { clearInterval(Interval); }
     
    buttonReset.onclick = function() {
      clearInterval(Interval);
      mins = "00";
      seconds = "00";
      appendMins.innerHTML = mins;
      appendSeconds.innerHTML = seconds;
    }
      
    function startTimer () {
      mins++;   
      if(mins <= 9) { appendMins.innerHTML = "0" + mins; }

      if(mins > 9) { appendMins.innerHTML = mins; }

      if(mins > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        mins = 0;
        appendMins.innerHTML = "0" + 0;
      }

      if(seconds > 9) { appendSeconds.innerHTML = seconds; }
    }
}