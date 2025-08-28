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
export const USER_UPDATE = gql`
  mutation ($input: UpdateUserInput!) {
    editUser(input: $input) {
      id
      fullName
      email
      imageUrl
      role
    }
  }
`;

export const USER_DELETE = gql`
  mutation ($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
      fullName
      email
    }
  }
`;

export const CREATE_PROGRAMS = gql`
  mutation ($input: ProgramInput!) {
    createProgram(input: $input) {
      id
      name
      description
      durationYears
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation ($input: ProgramUpdateInput!) {
    updateProgram(input: $input) {
      id
      name
      description
      durationYears
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation ($input: CourseInput!) {
    createCourse(input: $input) {
      id
      code
      teacherId
      description
      programId
      teacherId
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation ($input: CourseUpdateInput!) {
    updateCourse(input: $input) {
      id
      code
      title
      description
      programId
      teacherId
    }
  }
`;

//for Faculty
export const POST_NOTICE = gql`
  mutation ($input: NoticeInput!) {
    postNotice(input: $input) {
      id
      title
      body
      authorId
      title
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation ($input: EventInput!) {
    createEvent(input: $input) {
      id
      title
      details
      date
      authorId
    }
  }
`;

//for Student
export const STUDENT_ENROLLMENT = gql`
  mutation ($courseId: ID!, $input: EnrollInput!) {
    enroll(courseId: $courseId, input: $input) {
      id
      courseId
      userId
    }
  }
`;
