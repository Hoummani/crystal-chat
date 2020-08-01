export function chatReducer (state, action) {
  switch (action.type) {
    case 'SET_MY_CONTACTS' :
      return {
        ...state,
        myContacts: [
          ...action.myContacts
        ]
      };
    case 'SET_CURRENT_CONTACT':
      return {
        ...state,
        currentContact: action.currentContact
      };
    case 'SET_CURRENT_RECEIVER':
    return {
      ...state,
      currentReceiver: action.currentReceiver
    };
    case 'SET_CHATS':
      return {
        ...state,
        chats: [
          ...action.chats
        ]
      }
    case 'ADD_CHAT':
      return {
        ...state,
        chats: [
          ...action.chats,
          action.newChat
        ]
      }
    case 'CLEAR_CHATS':
      return {
        ...state,
        chats: []
      }
    default:
      return state;
  }
}