import React from 'react';
import Accepted from './meeting/Accepted.jsx';
import RequestReceived from './meeting/RequestReceived.jsx';
import RequestSent from './meeting/RequestSent.jsx';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // secondsRemaining: 20,
    };
  }

  render() {
    if (this.props.meet.recipientId !== undefined) {
      return (
        <div className="overlay">
          <RequestSent
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
        </div>
      );
    }
    if (this.props.meet.requesterId !== undefined) {
      return (
        <div className="overlay">
          <RequestReceived
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
        </div>
      );
    }
    if (this.props.meet.acceptedId !== undefined) {
      return (
        <div className="overlay">
          <Accepted
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
        </div>
      );
    }
    return (<div></div>);
  }
}

Popover.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Popover;
