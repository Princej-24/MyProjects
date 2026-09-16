// Program 2 : Simulate DOM like event handling in Node.js using events

const EventEmitter = require("events");
class Button extends EventEmitter {
    click() {
        console.log("Button clicked");
        this.emit("click");
    }

    mouseover() {
        console.log("Mouse is over the button");
        this.emit("mouseover");
    }
}

const button = new Button();          // Object creation of button
button.on("click", () => {
    console.log("Click event handled");
});

button.on("mouseover", () => {
    console.log("Mouseover event handled");
});

button.click();
button.mouseover();