"use client";

import { useState } from "react";
import Image from "next/image";
import type { CamperGalleryImage } from "@/app/types/camper";
import css from "./CamperGallery.module.css";

interface CamperGalleryProps {
  gallery: CamperGalleryImage[];
  camperName: string;
}

export default function CamperGallery({
  gallery,
  camperName,
}: CamperGalleryProps) {
  const images = gallery.filter((image) => image.original || image.thumb);

  const [activeImage, setActiveImage] = useState(
    images[0]?.original || images[0]?.thumb || "/not-found.jpg",
  );

  return (
    <div className={css.gallery}>
      <Image
        className={css.mainImage}
        src={activeImage}
        alt={camperName}
        width={800}
        height={500}
        priority
      />

      <ul className={css.thumbnails}>
        {images.map((image) => {
          const imageSrc = image.original || image.thumb;

          return (
            <li key={image.id}>
              <button
                className={`${css.thumbnailButton} ${
                  activeImage === imageSrc ? css.activeThumbnail : ""
                }`}
                type="button"
                onClick={() => setActiveImage(imageSrc)}
              >
                <Image
                  className={css.thumbnailImage}
                  src={image.thumb || image.original}
                  alt={camperName}
                  width={120}
                  height={80}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
