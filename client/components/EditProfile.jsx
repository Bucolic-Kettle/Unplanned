import React, { Component } from 'react';
import actions from '../redux/actions.js';
import { connect } from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.user = window.socket.api.user;
    this.state = {
      shouldRender: window.editProfile,
      bio: this.user.bio,
      isImageUploading: false,
    };
  }

  componentWillMount() {
    window.showProfile = (e) => {
      e.preventDefault();
      this.setState({ shouldRender: true });
    };
  }

  hideProfile(e) {
    e.preventDefault();
    this.state.shouldRender = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.user.bio = e.target.bio.value;
    window.socket.api.updateBio();
  }

  handleChange() {
    this.setState(this.state);
  }

  render() {
    let editProfilePage;
    if (this.state.shouldRender) {
      editProfilePage = (
        <div className="overlay">
          <div className="popup">

            <div>Edit Your Profile</div>

            <img alt="" src={this.user.image} />

            <div>Change Profile Picture:</div>

            <input
              className="fileInput"
              type="file"
              onChange={(e) => {
                this.setState({ isImageUploading: true });
                actions.uploadProfileImage(e.target.files[0]);
              }}
            />

            <strong>{!!this.state.isImageUploading ? 'Uploading...' : ''}</strong>

            <h2>{this.user.name}</h2>
            <form
              className="pure-form pure-form-stacked"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <fieldset className="pure-group">
                <textarea
                  name="bio" defaultValue={this.state.bio} className="pure-input-1-2"
                  placeholder={`About ${this.user.name}`}
                />
              </fieldset>
              <button
                className="pure-button" type="submit"
              >Save</button>{' '}
              <button className="pure-button" onClick={this.hideProfile.bind(this)}>Close</button>
            </form>
          </div>
        </div>
      );
    } else {
      editProfilePage = (<div></div>);
    }

    return (editProfilePage);
  }
}

const mapStateToProps = function (state) {
  return {
    isImageUploading: state.isImageUploading,
  };
};

export default connect(mapStateToProps)(EditProfile);
