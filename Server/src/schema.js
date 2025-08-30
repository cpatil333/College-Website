import { gql } from "apollo-server";
export const typeDefs = gql `
  scalar DateTime

  enum Role {
    STUDENT
    FACULTY
    ADMIN
    ALUMNI
    ALL
  }
  type User {
    id: ID!
    fullName: String!
    email: String!
    password: String!
    imageUrl: String!
    role: Role!
    enrollments: [Enrollment!]!
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
    program: [Program!]!
    teacher: [User!]!
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
    targetRole: Role
    courseId: Int
    course: Course!
    enrollments: [Enrollment!]!
  }

  type Event {
    id: ID!
    title: String!
    details: String!
    date: DateTime!
    authorId: Int!
    user: User!
    targetRole: String!
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
  input UpdateUserInput {
    id: ID!
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
  input ProgramUpdateInput {
    id: ID!
    name: String!
    description: String!
    durationYears: Int!
  }
  input CourseInput {
    code: String!
    title: String!
    description: String!
    programId: Int!
    teacherId: Int!
  }
  input CourseUpdateInput {
    id: ID!
    code: String!
    title: String!
    description: String!
    programId: Int!
    teacherId: Int!
  }

  input NoticeInput {
    title: String!
    body: String!
    authorId: Int!
    visible: Boolean!
    targetRole: Role
    courseId: Int
  }
  input EventInput {
    title: String!
    details: String!
    date: String!
    authorId: Int!
    targetRole: String!
  }

  input EnrollInput {
    userId: Int!
    isCompleted: Boolean
  }

  input ContactInput {
    name: String!
    email: String!
    message: String!
  }

  type userPaginationResponse {
    items: [User!]!
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  input PaginateInput {
    page: Int!
    limit: Int!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User
    programs: [Program!]!
    program(id: ID!): Program!
    eduCourses: [Course!]!
    course(id: ID!): Course!
    courses(programId: ID): [Course!]!
    # notices: [Notice!]!
    notices: [Notice!]! @auth(role: [STUDENT, ADMIN, FACULTY])
    upcomingEvents(upcomingOnly: Boolean = true): [Event!]!
    programOptions: [Program!]!
    teacherOptions: [User!]!
    facultyCourses(teacherId: Int!): [Course!]!
    events: [Event!]! @auth(role: [STUDENT, ADMIN, FACULTY])
    userPagination(options: PaginateInput!): userPaginationResponse!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    editUser(input: UpdateUserInput!): User! @auth(role: ADMIN)
    deleteUser(id: ID!): User! @auth(role: ADMIN)
    createProgram(input: ProgramInput!): Program! @auth(role: ADMIN)
    updateProgram(input: ProgramUpdateInput!): Program! @auth(role: ADMIN)
    createCourse(input: CourseInput!): Course! @auth(role: ADMIN)
    updateCourse(input: CourseUpdateInput!): Course! @auth(role: ADMIN)
    postNotice(input: NoticeInput!): Notice! @auth(role: FACULTY)
    createEvent(input: EventInput!): Event! @auth(role: FACULTY)
    enroll(courseId: ID!, input: EnrollInput!): Enrollment! @auth(role: STUDENT)
    contact(input: ContactInput!): Boolean!
  }
  directive @auth(role: Role) on FIELD_DEFINITION
`;
//# sourceMappingURL=schema.js.map