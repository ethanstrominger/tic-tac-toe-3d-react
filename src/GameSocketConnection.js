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
        const subscribeUrl = "/message-from-server-to-client/uuser"
        this.userSubscription = this.stompClient.subscribe(subscribeUrl, function (greeting) {console.log(greeting)})
        // TODO: this.userSubscription is not used anywhere - make a note somewhere?
        return this.userSubscription
    }

    static sendMessage(message) {
        console.log('Sendingcad2',this.stompClient,'asdf')
        this.stompClient.send("/message-from-client-to-server/user", {}, JSON.stringify({'name': `${message.fromNickname} ${message.toNickName} ${message.messageText}`}));
    }

    static async initializeConnection(user) {
        // return new Promise((resolve, reject) => {
            const url = `${this.server}/message-endpoint` 
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
                    const subscribeUrl = "/message-from-server-to-client/user"
                    console.log('Subscribing',subscribeUrl)
                    this.userSubscription = this.stompClient.subscribe(subscribeUrl, function (greeting) {console.log("Received".greeting)})
                    // TODO: this.userSubscription is not used anywhere - make a note somewhere?
                    // resolve (frame)
                }
            )
            
        // })
    }

    }
export default GameSocketConnection