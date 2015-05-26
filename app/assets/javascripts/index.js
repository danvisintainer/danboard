$(function() {
  var uptime = Math.floor(new Date().getTime() / 1000) - gon.boot_time;

  $('#uptime').append('Server Uptime: ' + secondsToString(uptime));

  setInterval(updateUptime, 1000);
});

function updateUptime(){
  $('#uptime').empty();
  $('#uptime').append('Server Uptime: ' + secondsToString(Math.floor(new Date().getTime() / 1000) - gon.boot_time));
}

function secondsToString(seconds) {
  var numdays = Math.floor((seconds % 31536000) / 86400); 
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  return numdays + " days, " + numhours + ":" + numminutes + ":" + numseconds;
}