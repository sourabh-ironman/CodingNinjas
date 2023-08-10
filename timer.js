var timer = document.getElementById('timer');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var milliseconds = document.getElementById('milliseconds');
var stop = false;
var time = 0;
var milliTime = 0;
var intervalId;
var milliSecondsIntervalId;
var timerAlreadyRunning = false; //This will be true if timer is running, and the click event on start wont fire again if it is true

var start = document.getElementById('start');
start.addEventListener('click',()=>{
    if(!timerAlreadyRunning){
        timerAlreadyRunning = true;
        // console.log('start clicked');
        stop = false;
        intervalId = setInterval(()=>{
            time += 100;
            console.log(time);
            let minuteValue = Math.floor(time/60000);
            let secondsValue = Math.floor(Math.floor(time/1000)%60);
            let millisecondsValue = time%1000;
            updateTimer(minuteValue, secondsValue, millisecondsValue);
            // updateMilliseconds();
        }, 100);

        // milliSecondsIntervalId = setInterval(()=>{
        //     if(milliTime == 10){
        //         clearInterval(milliSecondsIntervalId);
        //         return;
        //     }
        //     milliTime++;
        //     console.log(milliTime);
        //     milliseconds.innerHTML = milliTime;
        // }, 100);
    }
});

var stop = document.getElementById('stop');
stop.addEventListener('click',()=>{
    clearInterval(intervalId);
    timerAlreadyRunning = false;
});

var reset = document.getElementById('reset');
reset.addEventListener('click', ()=>{
    time = 0;
    milliTime = 0;
    clearInterval(intervalId);
    timerAlreadyRunning = false;
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
    milliseconds.innerHTML = '000';
})

//updateTimer function for updating the timer in UI
function updateTimer(minuteValue, secondsValue, millisecondsValue){
    if(minuteValue <10){
        minutes.innerHTML = '0'+minuteValue;
    }
    else{
        minutes.innerHTML = minuteValue;
    }

    if(secondsValue < 10){
        seconds.innerHTML = '0'+secondsValue;
    }
    else{
        seconds.innerHTML = secondsValue;
    }

    if(millisecondsValue <10){
        milliseconds.innerHTML = '00'+millisecondsValue;
    }
    else if(millisecondsValue <100){
        milliseconds.innerHTML = '0'+millisecondsValue;
    }
    else{
        milliseconds.innerHTML = millisecondsValue;
    }

    // var milliTime = 0;
    // var milliInterval = setInterval(()=>{
    //     if(milliTime == 10){
    //         clearInterval(milliInterval);
    //         return;
    //     }
    //     milliTime++;
    //     console.log(milliTime);
    //     milliseconds.innerHTML = milliTime;
    // }, 100);
}