import React from 'react';
import actions from '../redux/actions.js';
import { connect } from 'react-redux';

class TextChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log(props);
  }

  getDateTime() {
  // http://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    if (month.toString().length === 1) {
      month = '0' + month;
    }
    if (day.toString().length === 1) {
      day = '0' + day;
    }
    if (hour.toString().length === 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length === 1) {
      minute = '0' + minute;
    }
    if (second.toString().length === 1) {
      second = '0' + second;
    }
    const dateTime = month + '/' + day + '/' + year + ' ' + (hour > 12 ? hour - 12 : hour) + ':' + minute + ':' + second;
    return dateTime;
  }

  handleText(event, chatId) {
    event.preventDefault();
    event.stopPropagation();
    const scrollBox = this.refs.chatBox;
    scrollBox.scrollTop = scrollBox.clientHeight;
    const text = this.refs.chatTest.value;

    window.socket.api.handleMessage(chatId, {text, time: this.getDateTime()});

    this.props.dispatch(actions.updateMessages({senderId: chatId, username: window.socket.api.user.name, text, time: this.getDateTime()}));
    this.refs.chatTest.value = '';
  }

  handleClose(socketId) {
    // send dispatch to update sender recipientId
    this.props.dispatch(actions.closeChat(socketId));
  }


  render() {
    let list = this.props.messages[this.props.chatWith];
    return (
      <div className="overlay chat">
        <button
          value="Close"
          onClick={this.handleClose.bind(this)}
          className="pure-button button-chat-close"
        >
          &times;
        </button>
        <div className="chatbox" ref="chatBox">
          <ul>
            {list ? list.map((message, i) => <li key={i}> {
              message.username === undefined ? this.props.users[this.props.chatWith].name : message.username
            } {message.text}</li> ) : null}
          </ul>
        </div>
        <form onSubmit={(event) => { this.handleText(event, this.props.chatWith); }}>
          <input ref="chatTest" type="text" className="message-input"/>
          <input
            type="submit"
            className="pure-button button-send-message"
            value="Send"
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TextChat);
