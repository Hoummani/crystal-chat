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
      user {
        _id
        firstName
        lastName
        isOnline
        avatar
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
      visited
      createdAt
    }
  }
`;

// accept friendship
export const ACCEPT_FRIENDSHIP = gql`
  mutation($contactId: ID!, $notifId: ID!) {
    acceptFrienship(contactId: $contactId, notifId: $notifId){
      status
    }
  }
`;

// get chats
export const GET_CHATS = gql`
  query($receiver: ID!){
    getChats(receiver: $receiver){
      _id
      content
      sender{
        _id
        avatar
      }
      receiver {
        _id
      }
      createdAt
    }
  }
`;

// send chat to friend
export const SEND_CHAT_TO = gql`
  mutation(
    $content: String!
    $receiver: ID!
  ){
    sendChatTo(content: $content, receiver: $receiver){
      _id
      content
      sender{
        _id
      }
      createdAt
    }
  }
`;