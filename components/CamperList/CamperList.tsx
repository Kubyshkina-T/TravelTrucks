import Image from "next/image";
import Link from "next/link";
import type { Camper } from "@/app/types/camper";
import css from "./CamperList.module.css";

import { FaStar } from "react-icons/fa";
import { LiaMapSolid } from "react-icons/lia";
import { BsFillFuelPumpDieselFill, BsGearWideConnected } from "react-icons/bs";
import { TbCamper } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

interface CamperListProps {
  campers: Camper[];
  onClearFilters: () => void;
}

const engineLabels: Record<string, string> = {
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  electric: "Electric",
};

const transmissionLabels: Record<string, string> = {
  automatic: "Automatic",
  manual: "Manual",
};

const camperFormLabels: Record<string, string> = {
  alcove: "Alcove",
  panel_truck: "Panel Van",
  fully_integrated: "Integrated",
  semi_integrated: "Semi Integrated",
};

function getCamperImage(camper: Camper) {
  return (
    camper.coverImage ||
    camper.gallery?.[0]?.thumb ||
    camper.gallery?.[0]?.original ||
    "/not-found.jpg"
  );
}

export default function CamperList({
  campers,
  onClearFilters,
}: CamperListProps) {
  if (campers.length === 0) {
    return (
      <div className={css.emptyState}>
        <Image
          className={css.emptyImage}
          src="/not-found.png"
          alt="No campers found"
          width={488}
          height={463}
        />

        <h2 className={css.emptyTitle}>No campers found</h2>

        <p className={css.emptyText}>
          We couldn&apos;t find any campers that match your filters.
          <br />
          Try adjusting your search or clearing some filters.
        </p>

        <div className={css.emptyActions}>
          <button
            className={css.clearButton}
            type="button"
            onClick={onClearFilters}
          >
            <IoMdClose />
            Clear filters
          </button>

          <button
            className={css.viewAllButton}
            type="button"
            onClick={onClearFilters}
          >
            View all campers
          </button>
        </div>
      </div>
    );
  }

  return (
    <ul className={css.camperList}>
      {campers.map((camper) => (
        <li className={css.camperItem} key={camper.id}>
          <Image
            className={css.camperImage}
            src={getCamperImage(camper)}
            alt={camper.name}
            width={219}
            height={240}
          />

          <div className={css.camperInfo}>
            <div className={css.camperHeader}>
              <h2 className={css.camperTitle}>{camper.name}</h2>

              <p className={css.camperPrice}>€{camper.price.toFixed(2)}</p>
            </div>

            <div className={css.meta}>
              <p className={css.camperRating}>
                <FaStar className={css.starIcon} />
                {camper.rating} ({camper.totalReviews} Reviews)
              </p>

              <p className={css.camperLocation}>
                <LiaMapSolid />
                {camper.location}
              </p>
            </div>

            <p className={css.description}>{camper.description}</p>

            <ul className={css.features}>
              <li className={css.feature}>
                <BsFillFuelPumpDieselFill />
                {engineLabels[camper.engine] || camper.engine}
              </li>

              <li className={css.feature}>
                <BsGearWideConnected />
                {transmissionLabels[camper.transmission] || camper.transmission}
              </li>

              <li className={css.feature}>
                <TbCamper />
                {camperFormLabels[camper.form] || camper.form}
              </li>
            </ul>

            <Link href={`/catalog/${camper.id}`} className={css.showMoreButton}>
              Show more
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
