localStorage.debug = '*';
const socket = io(`${location.host}/Freezer`);
const el = document.getElementById("m");
const broadcast = function() {
    const model = {
        status: faker.random.words()
    };
    el.innerText += `\nPublishing: ${JSON.stringify(model)}`;
    socket.emit("event", model);
    window.setTimeout(broadcast, Math.random()*500);
};
socket.on('connect', function(){
    el.innerText += `\nconnected (ID: ${socket.id})`;
    window.setTimeout(broadcast, 2000);
});
socket.on('disconnect', function(){
    el.innerText += `\ndisconnected`;
});