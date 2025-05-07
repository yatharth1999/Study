var timerInterval;


function startTimer(time, timerId){
    let remainingTime = time * 60;
    const timerElement = document.getElementById(timerId);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Time is up!';
            document.getElementById('alarm').play();

        } else {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
}