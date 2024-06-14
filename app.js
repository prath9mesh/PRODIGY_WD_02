let hourEl = document.getElementById('hour');
let tensEl = document.getElementById('tens');
let secEl = document.getElementById('sec');
let minEl = document.getElementById('min');
let buttonDiv = document.getElementById('btn-div');
let lapsList = document.getElementById('lapsList');
let lapCounter = 0;

let timer = false;
let interval;
let lapNumber = 1;
let tens = 0;
let sec = 0;
let min = 0;
let hour = 0;

function buttonOp() {
    createStopBtn();
}

function createStopBtn() {
    startBtn.remove();
    let stop = document.createElement('button');
    stop.textContent = "STOP";
    stop.classList.add('btn-stop');
    buttonDiv.prepend(stop);
    stop.addEventListener('click', function() {
        stopTimer();
        stop.remove();
        createStartBtn();
    });
}

function createStartBtn() {
    let start = document.createElement('button');
    start.textContent = "START";
    start.classList.add('btn-start');
    buttonDiv.prepend(start);
    start.addEventListener('click', function() {
        start.remove();
        createStopBtn();
        startTimer();
    });
}

function startTimer() {
    timer = true;
    stopWatch();
}

function stopTimer() {
    timer = false;
    clearInterval(interval);
}

function resetTimer() {
    timer = false;
    tens = 0;
    sec = 0;
    min = 0;
    hour = 0;
    tensEl.textContent = "00";
    secEl.textContent = "00";
    minEl.textContent = "00";
    hourEl.textContent = "00";
    clearInterval(interval);
    lapNumber = 1;
    lapsList.innerHTML = '';
    document.body.style.backgroundColor = "#f3f3f3"; // Reset background color
}

function stopWatch() {
    if (timer === true) {
        tens++;
        tensEl.textContent = padZero(tens % 100);
        secEl.textContent = padZero(parseInt((tens / 100 + sec) % 60));
        minEl.textContent = padZero(parseInt(((tens / 100 + sec) / 60 + min) % 60));
        hourEl.textContent = padZero(parseInt((((tens / 100 + sec) / 60 + min) / 60 + hour) % 60));
        interval = setTimeout(stopWatch, 10);
    }
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function lapTimer() {
    if (timer) {
        const lapTime = `${hourEl.textContent}:${minEl.textContent}:${secEl.textContent}.${tensEl.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapNumber++;
    }
}

function changeBackgroundColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
}

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const resetBtn = document.getElementById('reset');
    const exportBtn = document.getElementById('export');
    const lightModeBtn = document.getElementById('light-mode');
    const darkModeBtn = document.getElementById('dark-mode');

    lightModeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
    });

    darkModeBtn.addEventListener('click', function() {
        document.body.classList.add('dark-mode');
    });

    exportBtn.addEventListener('click', exportData);

    function exportData() {
        const rows = [];
        const lapItems = lapsList.querySelectorAll('li');
        lapItems.forEach(item => {
            rows.push(item.textContent);
        });

        const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "stopwatch_data.csv");
        document.body.appendChild(link);
        link.click();
    }

    const lapBtn = document.createElement('button');
    lapBtn.textContent = "LAP";
    lapBtn.classList.add('btn-lap');
    buttonDiv.appendChild(lapBtn);

    lapBtn.addEventListener('click', lapTimer);
    startBtn.addEventListener('click', function() {
        if (!timer) {
            startTimer();
            buttonOp();
        }
    });
    pauseBtn.addEventListener('click', stopTimer); // Pause button stops the timer
    resetBtn.addEventListener('click', resetTimer);
});
