import axios from 'axios';

const actions = {
  uploadProfileImage(img) {
    
    const data = new FormData();
    data.append('image', img);

    const config = {
      headers: {
        'Content-Type': img.type,
      },
    };

    const request = axios.post('http://localhost:8000/api/v1/upload', data, config);

    return (dispatch) => {
      dispatch({
        type: 'UPLOAD_PROFILE_IMAGE_REQUEST',
        img,
      });

      return request
        .then((data) => {
          dispatch({
            type: 'UPLOAD_PROFILE_IMAGE_SUCCESS',
            url: data.data.path,
          });
        })
        .catch((err) => {

          console.log('Image upload failure:', err);

          dispatch({
            type: 'UPLOAD_PROFILE_IMAGE_FAILURE'
          });
        }
      );
    }
  },
  updateMessages(message) {
    return {
      type: 'UPDATE_MESSAGES',
      message,
    };
  },
  setChat(socketId) {
    return {
      type: 'SET_CHAT',
      socketId,
    };
  },
  closeChat(socketId) {
    return {
      type: 'CLOSE_CHAT',
      socketId,
    };
  },
  updateUserList(newUserList) {
    return {
      type: 'UPDATE_USERLIST',
      newUserList,
    };
  },
  updateOpenedUserId(socketId) {
    return {
      type: 'UPDATE_OPENED_USER_ID',
      socketId,
    };
  },
  clearMeet() {
    return {
      type: 'CLEAR_MEET',
    };
  },
  clearAccept() {
    return {
      type: 'CLEAR_ACCEPT',
    };
  },
  setRecipient(recipientId) {
    return {
      type: 'SET_RECIPIENT',
      recipientId,
    };
  },
  setRequester(requesterId) {
    return {
      type: 'SET_REQUESTER',
      requesterId,
    };
  },
  setAccepted(acceptedId) {
    return {
      type: 'SET_ACCEPTED',
      acceptedId,
    };
  },
};

export default actions;
