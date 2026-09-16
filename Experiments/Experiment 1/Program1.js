// Program 1 : Create custom EventEmitter that trigger "greet" or "exit".

const EventEmitter = require('events');
class myEmitter extends EventEmitter {}
const event = new myEmitter()

event.on("greet", (name) => {
    console.log(`Hello $(name)`);        // template literals `$()`
});

event.on("exit", () => {
    console.log("Exits my custom event emitter...");        
});

event.emit("greet","cse25");
event.emit("exit");