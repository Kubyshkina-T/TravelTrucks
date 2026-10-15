"use client";

import { useEffect, useRef, useState } from "react";
import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    }
    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    function handleFocusIn(event: FocusEvent) {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    const tablet = window.matchMedia("(min-width: 768px)");
    function handleBreakpoint() {
      setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    tablet.addEventListener("change", handleBreakpoint);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
      tablet.removeEventListener("change", handleBreakpoint);
    };
  }, [isMenuOpen]);
  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav ref={navigationRef} className={css.headerNavigation}>
          <Link className={css.logo} href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/Logo.svg"
              alt="Лого"
              width={136}
              height={16}
              priority
            />
          </Link>

          <button
            ref={buttonRef}
            className={css.menuButton}
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="m6 6 12 12M6 18 18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <ul
            id="primary-navigation"
            className={`${css.headerList} ${isMenuOpen ? css.headerListOpen : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
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
