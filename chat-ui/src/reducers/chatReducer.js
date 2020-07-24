export function chatReducer (state, action) {
  switch (action.type) {
    case 'SET_MY_CONTACTS' :
      return {
        ...state,
        myContacts: {
          ...action.myContacts
        }
      };
    case 'SET_CURRENT_CHAT':
      return {
        ...state,
        currentChat: {
          ...action.currentChat
        }
      };
    default:
      return state;
  }
}