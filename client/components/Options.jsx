import React, { Component } from 'react';

class Options extends Component {

  constructor(props) {
    super(props);
    this.user = window.socket.api.user;
  }

  toggleOption(optionType) {
    this.user[optionType] = !this.user[optionType];
  }

  handleText() {
    const msg = this.refs.chatTest.value;
    window.socket.emit('test', msg);
    this.refs.chatTest.value = '';
  }

  render() {
    const availStyle = this.user.available ? 'pure-button pure-button-active button-success' :
      'pure-button button-error';
    const coffeeStyle = this.user.coffee ? 'pure-button pure-button-active button-success' :
      'pure-button button-error';
    const foodStyle = this.user.food ? 'pure-button pure-button-active button-success' :
      'pure-button button-error';
    const beerStyle = this.user.beer ? 'pure-button pure-button-active button-success' :
      'pure-button button-error';
    return (
      <div className="options">
        <button
          value="available" className={`${availStyle} optionType`}
          onClick={this.toggleOption.bind(this, 'available')}
        >
          <i
            className={this.user.available ? 'fa fa-smile-o' : 'fa fa-meh-o'}
            aria-hidden="true"
          >
          </i>
          {this.user.available ? ' Online' : ' Offline'}
        </button>
        <button
          value="coffee" className={`${coffeeStyle} optionType`}
          onClick={this.toggleOption.bind(this, 'coffee')}
        >
          <i className="fa fa-coffee" aria-hidden="true"></i>
          {' '}Coffee
        </button>
        <button
          value="food" className={`${foodStyle} optionType`}
          onClick={this.toggleOption.bind(this, 'food')}
        >
          <i className="fa fa-cutlery" aria-hidden="true"></i>
          {' '}Food
        </button>
        <button
          value="beer" className={`${beerStyle} optionType`}
          onClick={this.toggleOption.bind(this, 'beer')}
        >
          <i className="fa fa-beer" aria-hidden="true"></i>
          {' '}Beer
        </button>

      </div>
    );
  }
}

export default Options;
