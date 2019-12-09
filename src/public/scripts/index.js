localStorage.debug = '*';
const socket = io(`${location.host}/debug`);
const el = document.getElementById("m");
socket.on('connect', function(){
    el.innerText += `\nconnected (ID: ${socket.id})`;
});
socket.on('event', function(data){
    el.innerText += "\n";
    el.innerText += JSON.stringify(data);
});
socket.on('disconnect', function(){
    el.innerText += `\ndisconnected`;
});