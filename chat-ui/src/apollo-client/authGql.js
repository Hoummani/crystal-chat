import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const LOAD_USER = gql`
  query {
    loadUser{
      _id
      firstName
      lastName
      email
      avatar
    }
  }
`;


export const RESET_PASSWORD = gql`
  mutation(
    $password: String!,
    $confirmPassword: String!
  ) {
    resetPassword(
      password: $password
      confirmPassword: $confirmPassword
    ) {
      status
    }
  }
`;

// logout
export const LOG_OUT = gql`
  mutation{
    logout{
      status
    }
  }

`;
// check token
export const CHECK_TOKEN_IS_VALID = gql`
  query{
    checkTokenIsValid{
      status
    }
  }
`;

// get my notifications
export const GET_MY_NOTIFICATIONS = gql`
  query{
    getMyNotifications{
      _id
      sender{
        _id
        firstName
        lastName
        avatar
      }
      content
      createdAt
    }
  }
`;

// real time notifications
export const NEW_NOTIFICATION = gql`
  subscription{
    newNotification{
      _id
      sender{
        _id
        firstName
        lastName
        avatar
      }
      content
      createdAt
    }
  }
`;