import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.headerNavigation}>
          <Link className={css.logo} href="/">
            <Image
              src="/Logo.svg"
              alt="Лого"
              width={136}
              height={16}
              priority
            />
          </Link>

          <ul className={css.headerList}>
            <li className={css.headerItems}>
              <Link href="/">Home</Link>
            </li>
            <li className={css.headerItems}>
              <Link href="/catalog">Catalog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
