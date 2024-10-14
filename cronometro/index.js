let s;
let display = document.getElementById('display');
let interval;

function startTime(){
    s = parseInt(document.getElementById('timeInput').value);
    return new Promise((resolve) => {

        clearInterval(interval);

        interval = setInterval(() => {
            if (s > 0) {
                s --;
                display.textContent = "Time: " + s + "s";
                console.log(`Segundos: ${tiempo}`)
            } else {
                clearInterval(interval);
                display.textContent = "Time ended!";
            }
        }, 1000)
    });
}