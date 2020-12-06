'use strict';


//airline ticket: destination -> city string, departure -> city string

let tickets = new Map();

function method(airlineTickets, startingCity){
    for(let airlineTicket of airlineTickets){
        tickets.set(airlineTicket.departure, airlineTicket.destination);
    }

    let path = [startingCity];
    let city = tickets.get(startingCity);
    while(city){
        city = tickets.get(city);
        path.push(city);
    }
    console.log(path);
}
