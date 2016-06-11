export default function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_MESSAGES': {
      let msgHolder = null;

      if (state.messages[action.message.senderId] === undefined) {
        msgHolder = Object.assign({}, state.messages, { [action.message.senderId]: [action.message] });
      } else {
        msgHolder = Object.assign({}, state.messages, { [action.message.senderId]: [...state.messages[action.message.senderId], action.message] });
      }

      return Object.assign({}, {
        users: state.users,
        meet: state.meet,
        gmap: state.gmap,
        chatBox: state.chatBox,
        chatId: state.chatId,
        messages: msgHolder,
      });
    }
    case 'UPDATE_USERLIST': {
      return Object.assign({}, {
        users: action.newUserList,
        meet: state.meet,
        gmap: state.gmap,
        chatBox: state.chatBox,
        chatId: state.chatId,
        messages: state.messages,
      });
    }

    case 'SET_CHAT': {
      return Object.assign({}, state, { chatBox: true, chatId: action.socketId });
    }

    case 'CLOSE_CHAT': {
      return Object.assign({}, state, { chatBox: false, chatId: action.socketId });
    }

    case 'UPDATE_OPENED_USER_ID': {
      return Object.assign({}, {
        users: state.users,
        meet: state.meet,
        gmap: {
          openedUserId: action.socketId,
        },
        chatBox: state.chatBox,
        chatId: state.chatId,
        messages: state.messages,
      });
    }

    case 'CLEAR_MEET': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: undefined,
          requesterId: undefined,
          acceptedId: undefined,
        },
        gmap: state.gmap,
        chatBox: state.chatBox,
        chatId: state.chatId,
        messages: state.messages,
      });
    }

    case 'SET_RECIPIENT': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: action.recipientId,
          requesterId: undefined,
          acceptedId: undefined,
        },
        gmap: state.gmap,
        chatBox: state.chatBox,
        chatId: state.chatId,
        messages: state.messages,
      });
    }

    case 'SET_REQUESTER': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: undefined,
          requesterId: action.requesterId,
          acceptedId: undefined,
        },
        gmap: state.gmap,
        chatBox: state.chatBox,
        chatId: state.chatId,
        messages: state.messages,
      });
    }

    case 'SET_ACCEPTED': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: undefined,
          requesterId: undefined,
          acceptedId: action.acceptedId,
        },
        gmap: state.gmap,
        chatBox: state.chatBox,
        chatId: state.chatId,
        messages: state.messages,
      });
    }

    case 'UPLOAD_PROFILE_IMAGE_REQUEST': {
      return Object.assign({}, state, {
        img: action.img,
        isImageUploading: true,
      });
    }

    case 'UPLOAD_PROFILE_IMAGE_SUCCESS': {
      window.socket.api.user.image = action.url;
      return Object.assign({}, state, {
        isImageUploading: false,
      });
    }

    case 'UPLOAD_PROFILE_IMAGE_FAILURE': {
      return Object.assign({}, state, {
        imageUpload: {
          isUploading: false,
          uploadErrorMsg: 'Could not upload image',
        },
      });
    }

    default:
      return state;
  }
}
