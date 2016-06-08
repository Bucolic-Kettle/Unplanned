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

    // console.log('request:', request);

    console.log('img:', img);

    return (dispatch) => {
      /*const request = */axios.put('/api/v1/upload', data, config).catch(err => console.log(err));

     // console.log('returned function');
      // dispatch({
      //   type: 'UPLOAD_PROFILE_IMAGE_REQUEST',
      //   img,
      // });

      // return request
      //   .then(() => {

      //     dispatch({
      //       type: 'UPLOAD_PROFILE_IMAGE_SUCCESS',
      //     });

      //   })
      //   .catch((err) => {

      //     console.log('Image upload failure:', err);

      //     dispatch({
      //       type: 'UPLOAD_PROFILE_IMAGE_FAILURE'
      //     });

      //   }
      // );
    };
  },
  setChat(socketId) {
    return {
      type: 'SET_CHAT',
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
