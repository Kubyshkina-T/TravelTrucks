"use client";

import { useEffect, useState } from "react";
import { getCampers } from "@/lib/api";
import CamperList from "../CamperList/CamperList";
import Filters from "@/components/Filters/Filters";
import Loader from "@/components/Loader/Loader";
import type { Camper, CamperFilters } from "@/app/types/camper";
import css from "./Catalog.module.css";

const initialFilters: CamperFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

const PER_PAGE = 4;

export default function Catalog() {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<CamperFilters>(initialFilters);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(newFilters: CamperFilters) {
    setCampers([]);
    setPage(1);
    setFilters(newFilters);
  }
  function handleClearFilters() {
    setCampers([]);
    setPage(1);
    setFilters(initialFilters);
  }

  function handleLoadMore() {
    setPage((previousPage) => previousPage + 1);
  }

  useEffect(() => {
    async function loadCampers() {
      try {
        setIsLoading(true);

        const data = await getCampers({
          page,
          perPage: PER_PAGE,
          filters,
        });

        setCampers((previousCampers) =>
          page === 1 ? data.campers : [...previousCampers, ...data.campers],
        );

        setTotal(data.total);
      } catch (error) {
        console.error("Failed to load campers:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCampers();
  }, [filters, page]);

  const hasMoreCampers = campers.length > 0 && campers.length < total;

  return (
    <>
      {isLoading && <Loader />}

      <div className={css.container}>
        <Filters onSearch={handleSearch} onClearFilters={handleClearFilters} />

        <div className={css.results}>
          <CamperList campers={campers} onClearFilters={handleClearFilters} />

          {hasMoreCampers && campers.length > 0 && (
            <button
              className={css.loadMoreButton}
              type="button"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </>
  );
}
