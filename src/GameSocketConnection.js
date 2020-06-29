import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';


// function disconnect() {
//     if (stompClient !== null) {
//         stompClient.disconnect();
//     }
//     console.log("Disconnected");
// }

// function sendName() {
//     stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
// }

// function showGreeting(message) {
//     $("#greetings").append("<tr><td>" + message + "</td></tr>");
// }

class GameSocketConnection {

    // constructor for singleton pattern.  See https://dev.to/tomekbuszewski/singleton-in-javascript-1d5i
    // constructor() {
    //     if (!!GameSocketConnection.instance) {
    //         return GameSocketConnection.instance;
    //     }

    //     GameSocketConnection.instance = this;
    //     GameSocketConnect.initializeConnection()
    //     return this;
    // }

    static async initializeConnection() {
        return new Promise((resolve, reject) => {
            const socket = new SockJS('http://localhost:8080/socket-endpoint');
            this.stompClient = Stomp.over(socket);
            this.userInfo = {user: ''}
            console.log('Connecting')
            this.stompClient.connect(
                this.userInfo, 
                frame => resolve (frame),
                error => reject (error)
            )
        })
    }

    }
export default GameSocketConnection