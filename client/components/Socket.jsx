import React from 'react';
import actions from '../redux/actions.js';

class Socket extends React.Component {

  componentDidMount() {
    // Performance optimization
    const socketClient = window.socket;
    const sendToServer = socketClient.api.sendToServer;
    const updateLocation = socketClient.api.updateLocation;

    setInterval(sendToServer, 5000);
    setInterval(updateLocation, 5000);

    socketClient.on('chatMessage', (data) => {
      console.log('Recieved: ', data);

      this.props.dispatch(actions.updateMessages({senderId:data.senderId, text: data.message.text, time: data.message.time}));

    });

    // Listens for update then changes local state
    socketClient.on('update all users', this.updateUserList.bind(this));

    // Listens for meeting requests and updates the component's state depending on decision
    socketClient.on('receive meeting request', this.receivedMeetingRequest.bind(this));
    socketClient.on('confirm meeting request', this.receivedConfirmation.bind(this));
    socketClient.on('reject meeting request', this.receivedRejection.bind(this));
  }

  updateUserList(activeUsers) {
    this.props.dispatch(actions.updateUserList(activeUsers));
  }

  receivedMeetingRequest(requesterId) {
    // alert('this guy requested me');
    console.log(requesterId);
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setRequester(requesterId));
  }

  receivedConfirmation(acceptedId) {
    // alert('this guy confirmed me', acceptedId);
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setAccepted(acceptedId));
  }

  receivedRejection() {
    // alert(`i got rejected. My name is ${window.socket.api.user.name}`);
    this.props.dispatch(actions.clearMeet());
  }

  // handleMessage(chatId) {
  //   this.props.dispatch(actions.updateMessager(chatId));
  // }

  render() {
    return (<div>
    </div>);
  }
}

Socket.propTypes = {
  dispatch: React.PropTypes.func,
};

export default Socket;
