import { notFound } from "next/navigation";
import Post from "./client-page";
import client from "../../../tina/__generated__/client";

function normalizeFilename(filename: string[]) {
  return filename.join("/");
}

export async function generateStaticParams() {
  try {
    const pages = await client.queries.postConnection();
    const paths = pages.data?.postConnection?.edges?.map((edge) => ({
      filename: edge?.node?._sys.breadcrumbs,
    }));

    return paths || [];
  } catch {
    return [];
  }
}

export default async function PostPage({
  params,
}: {
  params: { filename: string[] };
}) {
  try {
    const data = await client.queries.post({
      relativePath: `${normalizeFilename(params.filename)}.md`,
    });

    return <Post {...data}></Post>;
  } catch {
    notFound();
  }
}
