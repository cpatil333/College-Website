import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar DateTime

  enum Role {
    STUDENT
    FACULTY
    ADMIN
    ALUMNI
  }
  type User {
    id: ID!
    fullName: String!
    email: String!
    password: String!
    imageUrl: String!
    role: Role!
  }

  type Program {
    id: ID
    name: String!
    description: String!
    durationYears: Int!
    courses: [Course!]!
  }

  type Course {
    id: ID!
    code: String!
    title: String!
    description: String!
    programId: Int!
    teacherId: Int!
    enrollments: [Enrollment!]!
  }

  type Enrollment {
    id: ID!
    userId: Int!
    courseId: Int!
    isCompleted: Boolean
    user: User!
    course: Course!
  }

  type Notice {
    id: ID!
    title: String!
    body: String!
    visible: Boolean!
    authorId: Int!
    author: User!
  }

  type Event {
    id: ID!
    title: String!
    details: String!
    date: DateTime!
    location: String!
  }

  type ContactMessage {
    id: ID!
    name: String!
    email: String!
    message: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  input SignupInput {
    fullName: String!
    email: String!
    password: String!
    imageUrl: String!
    role: Role
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ProgramInput {
    name: String!
    description: String!
    durationYears: Int!
  }
  input CourseInput {
    code: String!
    title: String!
    description: String!
    programId: ID!
    teacherId: Int!
  }
  input NoticeInput {
    title: String!
    body: String!
    visible: Boolean
  }
  input EventInput {
    title: String!
    details: String!
    date: String!
    location: String!
  }
  input ContactInput {
    name: String!
    email: String!
    message: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    programs: [Program!]!
    program(id: ID!): Program
    courses(programId: ID): [Course!]!
    notices: [Notice!]!
    events(upcomingOnly: Boolean = true): [Event!]!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    createProgram(input: ProgramInput!): Program! @auth(role: ADMIN)
    createCourse(input: CourseInput!): Course! @auth(role: ADMIN)
    postNotice(input: NoticeInput!): Notice! @auth(role: FACULTY)
    createEvent(input: EventInput!): Event! @auth(role: FACULTY)
    enroll(courseId: ID!): Enrollment! @auth(role: STUDENT)
    contact(input: ContactInput!): Boolean!
  }
  directive @auth(role: Role) on FIELD_DEFINITION
`;
