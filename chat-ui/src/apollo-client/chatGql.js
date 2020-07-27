import gql from 'graphql-tag';


// get users
export const GET_USERS = gql`
  query {
    getUsers{
      _id
      firstName
      lastName
      isOnline
      avatar
      createdAt
    }
  }
`;

// get my contacts
export const GET_MY_CONTACTS = gql`
  query{
    getMyContacts{
      _id
      friend {
        _id
        firstName
        lastName
        avatar
        isOnline
        lastLogIn
      }
    }
  }
`;

// join user to contact list
export const JOIN_USER = gql`
  mutation($friendId: ID!) {
    joinUser(friendId: $friendId) {
      _id
      friend {
        _id
        firstName
        lastName
        isOnline
        avatar
        createdAt
      }
    }
  }
`;

// get my Notifications
export const GET_MY_NOTIFICATIONS = gql`
  query{
    getMyNotifications{
      _id
      content
      contactAbout{
        _id
      }
      sender {
        _id
        firstName
        lastName
        avatar
      }
      createdAt
    }
  }
`;

// accept friendship
export const ACCEPT_FRIENDSHIP = gql`
  mutation($contactId: ID!) {
    acceptFrienship(contactId: $contactId){
      status
    }
  }
`;