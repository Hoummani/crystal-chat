export function authReducer (state, action) {
  switch (action.type) {
    case 'SET_AUTH_DATA':
      return {
        ...state,
        authData: {
          ...action.authData
        }
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: {
          ...action.currentUser
        }
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: [
          ...action.notifications
        ]
      }
    default:
      return state;
  }
}