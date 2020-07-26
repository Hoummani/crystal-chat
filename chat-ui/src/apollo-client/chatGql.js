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
`