import Head from "next/head";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
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

      <SearchHeader />
      <SearchResults results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  // Loading mock data to avoid reaching the maximum requests limit by Google.
  const mockData = true;
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
