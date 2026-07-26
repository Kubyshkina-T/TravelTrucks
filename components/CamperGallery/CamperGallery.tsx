"use client";

import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const images = gallery.filter((image) => image.original || image.thumb);
  const canLoop = images.length > 4;

  if (images.length === 0) {
    return (
      <div className={css.mainImageWrapper}>
        <Image
          className={css.mainImage}
          src="/not-found.jpg"
          alt={camperName}
          fill
          sizes="(max-width: 1024px) 100vw, 631px"
          priority
        />
      </div>
    );
  }

  return (
    <div className={css.gallery}>
      <Swiper
        className={css.mainSwiper}
        loop={canLoop}
        spaceBetween={10}
        navigation={images.length > 1}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className={css.mainImageWrapper}>
              <Image
                className={css.mainImage}
                src={image.original || image.thumb}
                alt={`${camperName} photo ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 631px"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          className={css.thumbsSwiper}
          onSwiper={setThumbsSwiper}
          loop={canLoop}
          spaceBetween={10}
          slidesPerView={Math.min(4, images.length)}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <div className={css.thumbnailImageWrapper}>
                <Image
                  className={css.thumbnailImage}
                  src={image.thumb || image.original}
                  alt={`${camperName} thumbnail ${index + 1}`}
                  fill
                  sizes="120px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
