import React from 'react';
import actions from '../redux/actions.js';

export default class TextChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props)
  }

  getDateTime() {
  // http://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
   var now     = new Date();
   var year    = now.getFullYear();
   var month   = now.getMonth()+1;
   var day     = now.getDate();
   var hour    = now.getHours();
   var minute  = now.getMinutes();
   var second  = now.getSeconds();
   if(month.toString().length == 1) {
       var month = '0'+month;
   }
   if(day.toString().length == 1) {
       var day = '0'+day;
   }
   if(hour.toString().length == 1) {
       var hour = '0'+hour;
   }
   if(minute.toString().length == 1) {
       var minute = '0'+minute;
   }
   if(second.toString().length == 1) {
       var second = '0'+second;
   }
   var dateTime = month+'/'+day+'/'+year+' '+(hour > 12 ? hour - 12 : hour)+':'+minute+':'+second;
    return dateTime;
}

  handleText(chatId) {

    //this.props.dispatch(actions.updateMessager(chatId));
    console.log(this.props)
    const msg = this.refs.chatTest.value;
//    console.log(window.socket.id, chatId);

    window.socket.api.handleMessage(chatId, {msg, time: this.getDateTime()});

    //window.socket.emit('test', msg);
    this.refs.chatTest.value = '';
  }

  render() {
    const messages = [];
    messages.push('This is a message');
    messages.push('This is another message');
    return (
      <div>
        <div>
          <ul>
            {messages.map((message, i) => <li key={i}>{message}</li>)}
          </ul>
        </div>
        <input ref="chatTest" type="text" />
        <button
          value="test"
          onClick={() => { this.handleText(this.props.chatWith); }}> Send Message
        </button>
      </div>
    );
  }
}
