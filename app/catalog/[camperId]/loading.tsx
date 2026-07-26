import Image from "next/image";
import css from "./loading.module.css";

export default function Loading() {
  return (
    <div className={css.loaderOverlay}>
      <div className={css.loaderCard}>
        <div className={css.road}>
          <Image
            className={css.carIcon}
            src="/loader.png"
            alt="Loading"
            width={66}
            height={34}
            priority
          />
        </div>

        <p className={css.loaderText}>Please wait...</p>
      </div>
    </div>
  );
}
