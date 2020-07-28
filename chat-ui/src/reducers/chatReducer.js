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
    case 'SET_CHATS':
      return {
        ...state,
        chat: [
          ...action.chats
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