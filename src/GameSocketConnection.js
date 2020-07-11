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

    // TODO: Singleton or static
    // constructor for singleton pattern.  See https://dev.to/tomekbuszewski/singleton-in-javascript-1d5i
    // constructor() {
    //     if (!!GameSocketConnection.instance) {
    //         return GameSocketConnection.instance;
    //     }

    //     GameSocketConnection.instance = this;
    //     GameSocketConnect.initializeConnection()
    //     return this;
    // }

    static server = 'http://localhost:8080'

    // TODO: Can I get rid of user?
    static subscribeToUser(user, callback) {
        console.log(`Subscribing to ${this.server}/socket-subscribe/user/${user}`)
        // const subscribeUrl = `${this.server}/socket-subscribe/user/${user}`
        const subscribeUrl = "/topic/greeting"
        this.userSubscription = this.stompClient.subscribe(subscribeUrl, function (greeting) {console.log("Received")})
        // TODO: this.userSubscription is not used anywhere - make a note somewhere?
        return this.userSubscription
    }

    static sendMessage(message) {
        console.log('Sending')
        this.stompClient.send("/app/hello", {}, JSON.stringify({'name': message}));
    }

    static async initializeConnection(user) {
        // return new Promise((resolve, reject) => {
            const url = `${this.server}/gs-guide-websocket` 
            console.log(url);
            const socket = new SockJS(url);
            this.stompClient = Stomp.over(socket);
            this.userInfo = {user: user}
            console.log('Connecting')
            this.stompClient.connect(
                this.userInfo, 
                frame => {
                    console.log('Subscribing')
                    // const subscribeUrl = `${this.server}/socket-subscribe/user/${user}`
                    const subscribeUrl = "/topic/greetings"
                    this.userSubscription = this.stompClient.subscribe(subscribeUrl, function (greeting) {console.log("Received")})
                    // TODO: this.userSubscription is not used anywhere - make a note somewhere?
                    // resolve (frame)
                }
            )
            
        // })
    }

    }
export default GameSocketConnection