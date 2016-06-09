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

  handleText(chatId) {

    const text = this.refs.chatTest.value;
//    console.log(window.socket.id, chatId);

    window.socket.api.handleMessage(chatId, {text, time: this.getDateTime()});

    this.props.dispatch(actions.updateMessages({senderId: chatId, text, time: this.getDateTime()}));
    //window.socket.emit('test', msg);
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
        >
          X
        </button>
        <div>
          <ul>
            {list ? list.map((message, i) => <li key={i}> {this.props.users[this.props.chatWith].name} {message.text}</li> ) : null}
          </ul>
        </div>
        <input ref="chatTest" type="text" />
        <button
          value="test"
          onClick={() => { this.handleText(this.props.chatWith); }}
        >
        Send Message
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TextChat);
