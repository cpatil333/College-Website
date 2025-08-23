import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation ($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        fullName
        email
        imageUrl
        role
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        fullName
        role
      }
    }
  }
`;
