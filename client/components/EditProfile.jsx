import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions.js';
import { connect } from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.user = window.socket.api.user;
    this.state = {
      shouldRender: window.editProfile,
      bio: this.user.bio,
      name: this.user.name,
      image: this.user.image,
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
    this.setState({ shouldRender: false});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.user.bio = e.target.bio.value;
    this.user.name = e.target.name.value;
    window.socket.api.updateProfile();

    this.setState({
      shouldRender: false,
      bio: this.user.bio,
      name: this.user.name,
      image: this.user.image,
    });
  }

  handleChange() {
    this.setState(this.state);
  }

  uploadProfileImage(e) {
    this.setState({ isImageUploading: true });
    this.props.uploadImage(e.target.files[0]);
  }

  render() {
    let editProfilePage;

    if (this.state.shouldRender) {
      
      editProfilePage = (
        <div className="overlay">
          <div className="popup">

            <div>Edit Your Profile</div>

            <div className="markerProfilePic">
              <img alt="" src={this.user.image} />
            </div>

            <div>Change Profile Picture:</div>

            <input
              className="fileInput"
              type="file"
              onChange={this.uploadProfileImage.bind(this)}
            />

            <strong>{!!this.props.isImageUploading ? 'Uploading...' : ''}</strong>

            <form
              className="pure-form pure-form-stacked"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <fieldset className="pure-group">
                <input type="text" className="pure-input-1-2 h2" name="name" defaultValue={this.state.name} />
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
    bio: state.bio,
    name: state.name,
    image: state.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  const profileActions = bindActionCreators(actions, dispatch);
  return {
    uploadImage: profileActions.uploadProfileImage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
