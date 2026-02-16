import PostList from "./post-list";
import { client } from "../../tina/__generated__/client";

export default async function Page() {
  try {
    const pages = await client.queries.postConnection();

    return <PostList {...pages} />;
  } catch {
    return <PostList data={{ postConnection: { edges: [] } }} />;
  }
}
