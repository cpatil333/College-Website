import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      fullName
      email
      imageUrl
      role
    }
  }
`;

export const GET_USER = gql`
  query ($userId: ID!) {
    user(id: $userId) {
      id
      fullName
      email
      imageUrl
      role
    }
  }
`;

export const GET_PROGRAMS = gql`
  query {
    programs {
      id
      name
      description
      durationYears
    }
  }
`;

export const GET_PROGRAM = gql`
  query ($programId: ID!) {
    program(id: $programId) {
      id
      name
      description
      durationYears
    }
  }
`;

export const GET_COURSES = gql`
  query {
    eduCourses {
      id
      code
      title
      description
      programId
      program {
        id
        name
      }
      teacherId
      teacher {
        id
        fullName
      }
    }
  }
`;

export const GET_COURSE = gql`
  query ($courseId: ID!) {
    course(id: $courseId) {
      id
      code
      title
      description
      programId
      teacherId
    }
  }
`;

export const GET_PROGRAMS_OPTIONS = gql`
  query {
    programOptions {
      id
      name
    }
  }
`;

export const GET_TEACHERS_OPTIONS = gql`
  query {
    teacherOptions {
      id
      fullName
    }
  }
`;

export const GET_POST_NOTICES = gql`
  query {
    notices {
      id
      title
      body
      visible
      targetRole
      course {
        title
        enrollments {
          user {
            id
            fullName
            email
          }
        }
      }
    }
  }
`;

export const GET_FACULTY_COURSES = gql`
  query ($teacherId: Int!) {
    facultyCourses(teacherId: $teacherId) {
      id
      title
      enrollments {
        user {
          id
          fullName
          email
        }
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query {
    events {
      id
      title
      details
      targetRole
      authorId
      user {
        id
        fullName
        role
      }
    }
  }
`;
