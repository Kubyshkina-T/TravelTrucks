"use client";

import { FormEvent, useState } from "react";
import type { CamperFilters } from "@/app/types/camper";
import css from "./Filters.module.css";
import { LiaMapSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";

interface FiltersProps {
  onSearch: (filters: CamperFilters) => void;
  onClearFilters: () => void;
}

const initialFilters: CamperFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function Filters({ onSearch, onClearFilters }: FiltersProps) {
  const [filters, setFilters] = useState<CamperFilters>(initialFilters);

  function updateFilter(name: keyof CamperFilters, value: string) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(filters);
  }

  function handleClearFilters() {
    setFilters(initialFilters);
    onClearFilters();
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value.trim() !== "",
  );

  return (
    <form className={css.filters} onSubmit={handleSubmit}>
      <label className={css.locationLabel}>
        Location
        <div className={css.inputWrapper}>
          <LiaMapSolid className={css.locationIcon} />

          <input
            className={css.locationInput}
            type="text"
            placeholder="City"
            value={filters.location}
            onChange={(event) => updateFilter("location", event.target.value)}
          />
        </div>
      </label>

      <p className={css.filtersLabel}>Filters</p>

      <fieldset className={css.filterGroup}>
        <legend>Camper form</legend>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="form"
            value="alcove"
            checked={filters.form === "alcove"}
            onChange={(event) => updateFilter("form", event.target.value)}
          />
          <span className={css.camperForm}>Alcove</span>
        </label>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="form"
            value="panel_van"
            checked={filters.form === "panel_van"}
            onChange={(event) => updateFilter("form", event.target.value)}
          />
          <span className={css.camperForm}>Panel Van</span>
        </label>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="form"
            value="integrated"
            checked={filters.form === "integrated"}
            onChange={(event) => updateFilter("form", event.target.value)}
          />
          <span className={css.camperForm}>Integrated</span>
        </label>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="form"
            value="semi_integrated"
            checked={filters.form === "semi_integrated"}
            onChange={(event) => updateFilter("form", event.target.value)}
          />
          <span className={css.camperForm}>Semi Integrated</span>
        </label>
      </fieldset>

      <fieldset className={css.filterGroup}>
        <legend>Engine</legend>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="engine"
            value="diesel"
            checked={filters.engine === "diesel"}
            onChange={(event) => updateFilter("engine", event.target.value)}
          />
          <span>Diesel</span>
        </label>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="engine"
            value="petrol"
            checked={filters.engine === "petrol"}
            onChange={(event) => updateFilter("engine", event.target.value)}
          />
          <span>Petrol</span>
        </label>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="engine"
            value="hybrid"
            checked={filters.engine === "hybrid"}
            onChange={(event) => updateFilter("engine", event.target.value)}
          />
          <span>Hybrid</span>
        </label>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="engine"
            value="electric"
            checked={filters.engine === "electric"}
            onChange={(event) => updateFilter("engine", event.target.value)}
          />
          <span>Electric</span>
        </label>
      </fieldset>

      <fieldset className={css.filterGroup}>
        <legend>Transmission</legend>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="transmission"
            value="automatic"
            checked={filters.transmission === "automatic"}
            onChange={(event) =>
              updateFilter("transmission", event.target.value)
            }
          />
          <span>Automatic</span>
        </label>

        <label className={css.filterOption}>
          <input
            type="radio"
            name="transmission"
            value="manual"
            checked={filters.transmission === "manual"}
            onChange={(event) =>
              updateFilter("transmission", event.target.value)
            }
          />
          <span>Manual</span>
        </label>
      </fieldset>

      <button className={css.searchButton} type="submit">
        Search
      </button>

      <button
        className={css.clearButton}
        type="button"
        onClick={handleClearFilters}
        disabled={!hasActiveFilters}
      >
        <IoMdClose />
        Clear filters
      </button>
    </form>
  );
}
