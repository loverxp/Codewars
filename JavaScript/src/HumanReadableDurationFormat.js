// https://www.codewars.com/kata/52742f58faf5485cae000b9a/train/javascript
function formatDuration (seconds) {
    let times = [];
    // seconds = seconds % 3600;
    const days = parseInt(seconds / 86400);
    if (days > 0) {
        times.push(days + " " + (days == 1 ? "day" : "days"));
    }
    seconds = seconds % 86400;

    const hours = parseInt(seconds / 3600);
    if(hours > 0){
        times.push(hours + " " + (hours == 1? "hour":"hours"));
    }
     seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    if(minutes > 0){
        times.push(minutes + " " + (minutes == 1? "minute":"minutes"));
    }
    seconds = seconds % 60;
    if(seconds > 0){
        times.push(seconds + " " + (seconds == 1? "second":"seconds"));
    }
    return times.join(" ");
}
  
console.log(formatDuration(3662));
