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

  if (images.length === 0) {
    return (
      <div className={css.mainImageWrapper}>
        <Image
          className={css.mainImage}
          src="/not-found.jpg"
          alt={camperName}
          fill
          priority
        />
      </div>
    );
  }

  return (
    <div className={css.gallery}>
      <Swiper
        className={css.mainSwiper}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className={css.mainImageWrapper}>
              <Image
                className={css.mainImage}
                src={image.original || image.thumb}
                alt={camperName}
                fill
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className={css.thumbsSwiper}
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className={css.thumbnailImageWrapper}>
              <Image
                className={css.thumbnailImage}
                src={image.thumb || image.original}
                alt={camperName}
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
