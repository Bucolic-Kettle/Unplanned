import React from 'react';

export default class TextChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <form>
          <input type="text" />
          <input type="submit" value="Send Message" />
        </form>
      </div>
    );
  }
}
