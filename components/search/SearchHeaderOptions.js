import { useRouter } from "next/router";
import SearchHeaderOption from "./SearchHeaderOption";
import { SearchIcon, PhotographIcon } from "@heroicons/react/outline";
export default function SearchHeaderOptions() {
  const router = useRouter();
  const { searchType } = router.query;
  return (
    <div className="flex space-x-8 select-none w-full justify-center text-sm text-gray-700 lg:pl-52 lg:justify-start border-b">
      <SearchHeaderOption
        title="All"
        Icon={SearchIcon}
        selected={searchType === "" || !searchType}
      />
      <SearchHeaderOption
        title="Images"
        Icon={PhotographIcon}
        selected={searchType === "image"}
      />
    </div>
  );
}
