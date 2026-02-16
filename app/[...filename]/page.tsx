import { notFound } from "next/navigation";
import ClientPage from "./client-page";
import client from "../../tina/__generated__/client";

function normalizeFilename(filename: string[]) {
  return filename.join("/");
}

export async function generateStaticParams() {
  try {
    const pages = await client.queries.pageConnection();
    const paths = pages.data?.pageConnection?.edges?.map((edge) => ({
      filename: edge?.node?._sys.breadcrumbs,
    }));

    return paths || [];
  } catch {
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: { filename: string[] };
}) {
  try {
    const data = await client.queries.page({
      relativePath: `${normalizeFilename(params.filename)}.mdx`,
    });

    return <ClientPage {...data} />;
  } catch {
    notFound();
  }
}
