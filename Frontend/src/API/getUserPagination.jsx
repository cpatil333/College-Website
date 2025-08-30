import { client } from "../apollo/apolloClient";
import { GET_USER_PAGINATION } from "../apollo/Query";
import { useQuery } from "@apollo/client";

export async function getUserPagination(pageOptions) {
  try {
    const { data, loading, error } = useQuery(GET_USER_PAGINATION, {
      variables: {
        options: { page: pageOptions.page, limit: pageOptions.limit },
      },
    });
    return { data, loading, error };
  } catch (error) {
    throw new Response("Fetching data error ", { status: 500 });
  }
}
