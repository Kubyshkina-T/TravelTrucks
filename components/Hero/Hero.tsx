import css from "@/components/Hero/Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <main>
      <section className={css.heroSection}>
        <div className={css.container}>
          <div className={css.heroContent}>
            <h1 className={css.heroTitle}>Campers of your dreams</h1>
            <p className={css.heroText}>
              You can find everything you want in our catalog
            </p>
            <Link href="/catalog" className={css.heroButton}>
              View Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
