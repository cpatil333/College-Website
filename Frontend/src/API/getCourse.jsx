import React from "react";
import { client } from "../apollo/apolloClient";
import { GET_COURSE } from "../apollo/Query";

export async function getCourse({ params }) {
  const courseId = parseInt(params.id);
  try {
    const { data } = await client.query({
      query: GET_COURSE,
      variables: {
        courseId: courseId,
      },
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Fetching data error ", { status: 500 });
  }
}
