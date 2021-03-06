import React from "react";
import io from "socket.io-client";
import './chat.scss'

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.users.handle,
            message: '',
            messages: [],
        };
        let url = `${window.location.hostname}:${window.location.port}`;
        
        this.socket = io.connect(url);
        
    }
    componentDidMount() {
    
        this.socket.on('RECEIVE_MESSAGE', function (data) {
            data['timestamp'] = new Date().getTime();
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({
                messages: [...this.state.messages, data]
            });
            if (this.refs && this.state.messages && this.state.messages.length > 0) {

                let messages = this.state.messages;
                let lastMessage = messages[messages.length - 1];

                if (lastMessage.timestamp) {
                    let lastTimestamp = lastMessage.timestamp;

                    if (this.refs[lastTimestamp]) {
                        this.refs[lastTimestamp].scrollIntoView({
                            block: 'end',
                            behavior: 'smooth'
                        });
                    }
                }
            }
        };

        this.sendMessage = ev => {
          ev.preventDefault();
          this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
          })
          this.setState({
            message: ''
          });
        }
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }

    componentWillReceiveProps(newState) {
        this.setState({username: this.props.users.handle});
    }

    render() {
        return (
            <div className="chat-container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title"> CHAT</div>
                                <hr />
                                <div className="messages">
                                    {   
                                        this.state.messages.map(message => {
                                        return (
                                            <section key={`${message.author}:${message.message}:${message.timestamp}`} ref={message.timestamp} id='chat-total'>
                                                <div className="from-me">{message.author}: {message.message}</div>
                                            </section>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                <br />
                                <button onClick={this.sendMessage} className="start-button-two">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
