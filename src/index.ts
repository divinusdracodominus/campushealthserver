import { events } from '@prisma/client';

function sayHello(message: string) {
    window.alert(message);
}

function displayEvent(event: events) {
    console.log("title: " + event.title);
}