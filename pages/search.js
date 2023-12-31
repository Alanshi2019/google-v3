import Head from "next/head";
import SearchHeader from "../components/search/SearchHeader";
import SearchResults from "../components/search/SearchResults";
import ImageResults from "../components/search/ImageResults";
import Response from "../data/Response";
import { useRouter } from "next/router";

export default function Search({ results }) {
  const router = useRouter();
  const title = `${router.query.term} - Search page`;
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      {/* Search Header */}
      <SearchHeader />

      {/* Search web and Images Results */}
      {router.query.searchType === "image" ? (
        <ImageResults results={results} />
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Loading mock data to avoid reaching the maximum requests limit by Google.
  const mockData = false;
  const startIndex = context.query.start || "1";
  const data = mockData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${
          process.env.API_KEY
        }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
          context.query.searchType && "&searchType=image"
        }&start=${startIndex}`
      ).then((response) => response.json());
  return {
    props: {
      results: data,
    },
  };
}
