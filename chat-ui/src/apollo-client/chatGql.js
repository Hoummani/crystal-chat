import gql from 'graphql-tag';


// get all users
export const GET_USERS = gql`
  query {
    getUsers{
      _id
      firstName
      lastName
      isOnline
      avatar
    }
  }
`;