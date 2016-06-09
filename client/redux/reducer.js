export default function reducer(state, action) {
  switch (action.type) {

    case 'CHAT':
    console.log('action creator fired: ', action.type)
      return state;//{...state, action.chatId}

    case 'UPDATE_USERLIST': {
      return Object.assign({}, {
        users: action.newUserList,
        meet: state.meet,
        gmap: state.gmap,
        chatBox: state.chatBox,
        chatId: state.chatId,
      });
    }

    case 'SET_CHAT': {
      console.log('setting chat');
      return Object.assign({}, state, { chatBox: true, chatId: action.socketId});
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
      });
    }

    case 'UPLOAD_PROFILE_IMAGE_REQUEST': {
      console.log('request sent');
      return Object.assign({}, {
        img: state.img,
        isImageUploading: true,
      });
    }

    case 'UPLOAD_PROFILE_IMAGE_SUCCESS': {
      return Object.assign({}, {
        isImageUploading: false,
      });
    }

    case 'UPLOAD_PROFILE_IMAGE_FAILURE': {
      return Object.assign({}, {
        imageUpload: {
          isUploading: false,
          uploadErrorMsg: 'Could not upload image',
        }
      });
    }

    default:
      return state;
  }
}
