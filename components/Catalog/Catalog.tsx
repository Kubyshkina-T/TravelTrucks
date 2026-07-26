"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import CamperList from "../CamperList/CamperList";
import Filters from "@/components/Filters/Filters";
import Loader from "@/components/Loader/Loader";
import type { CamperFilters } from "@/app/types/camper";
import css from "./Catalog.module.css";

const initialFilters: CamperFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

const PER_PAGE = 4;

export default function Catalog() {
  const [filters, setFilters] = useState<CamperFilters>(initialFilters);
  const [filtersResetKey, setFiltersResetKey] = useState(0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      getCampers({
        page: Number(pageParam),
        perPage: PER_PAGE,
        filters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  function handleSearch(newFilters: CamperFilters) {
    setFilters(newFilters);
  }

  function handleClearFilters() {
    setFilters(initialFilters);
    setFiltersResetKey((prevKey) => prevKey + 1);
  }

  return (
    <>
      {isPending && <Loader />}

      <div className={css.container}>
        <Filters
          key={filtersResetKey}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
        />

        <div className={css.results}>
          {error && (
            <p className={css.errorText}>
              Something went wrong. Please try again.
            </p>
          )}

          {!error && !isPending && (
            <CamperList campers={campers} onClearFilters={handleClearFilters} />
          )}

          {!error && !isPending && hasNextPage && (
            <button
              className={css.loadMoreButton}
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
