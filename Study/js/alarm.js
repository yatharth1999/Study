var timerInterval;

function startTimer(time, timerId) {
    let remainingTime = time * 60;
    const timerElement = document.getElementById(timerId);

    // Initial display
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Time is up!';
            // Play alarm and show button
            const alarmSound = document.getElementById('alarm');
            const turnOffButton = document.getElementById('turnOffAlarmButton');
            if (alarmSound) {
                alarmSound.play();
            }
            if (turnOffButton) {
                turnOffButton.style.display = 'block'; // Show the button
            }
        } else {
            minutes = Math.floor(remainingTime / 60);
            seconds = remainingTime % 60;
            timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    // Stop alarm and hide button
    const alarmSound = document.getElementById('alarm');
    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Reset to start
    }
    const turnOffButton = document.getElementById('turnOffAlarmButton');
    if (turnOffButton) {
        turnOffButton.style.display = 'none'; // Hide the button
    }
}

function turnOffAlarm() {
    const alarmSound = document.getElementById('alarm');
    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
    const turnOffButton = document.getElementById('turnOffAlarmButton');
    if (turnOffButton) {
        turnOffButton.style.display = 'none';
    }
}