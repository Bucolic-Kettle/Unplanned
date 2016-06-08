const actions = {
  profile: {
    uploadProfileImage(img) {
      return {
        type: 'UPLOAD_PROFILE_IMAGE',
        img,
      };
    },
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
