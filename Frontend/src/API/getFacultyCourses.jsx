import { client } from "../apollo/apolloClient";
import { GET_FACULTY_COURSES } from "../apollo/Query";

export async function getFacultyCourses() {
  const storeUser = localStorage.getItem("user");
  const user = storeUser ? JSON.parse(storeUser) : null;
  const userId = user ? parseInt(user.id) : null;
  try {
    const { data } = await client.query({
      query: GET_FACULTY_COURSES,
      variables: {
        teacherId: userId,
      },
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Fetching data Faculty courses error ", { status: 500 });
  }
}
