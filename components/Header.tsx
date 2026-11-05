"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import OfficeStatus from "@/components/OfficeStatus";
import { nav } from "@/data/nav";
import { site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-3">
        <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label={`${site.name} ${site.descriptor}, home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-11 items-center rounded-lg px-3 whitespace-nowrap font-bold text-ink/80 transition-colors hover:bg-pine-soft hover:text-pine aria-[current=page]:bg-pine-soft aria-[current=page]:text-pine"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="btn btn-pine px-3.5 whitespace-nowrap sm:px-5">
            <Icon name="phone" className="h-4 w-4" />
            <span className="flex flex-col items-start leading-tight">
              <span>
                Call<span className="sr-only sm:not-sr-only"> {site.phone}</span>
              </span>
              <OfficeStatus className="hidden !text-xs font-semibold whitespace-nowrap text-white/85 xl:flex" />
            </span>
          </a>
          <button
            type="button"
            className="btn btn-line px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="phone-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="phone-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-card shadow-lg shadow-ink/10 lg:hidden"
      >
        <nav aria-label="Phone menu" className="wrap py-3">
          <ul className="grid">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-13 items-center justify-between gap-3 px-1 text-lg font-bold text-ink aria-[current=page]:text-pine"
                >
                  {item.label}
                  <Icon name="arrow" className="h-5 w-5 text-pine" />
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="btn btn-pine mt-3 w-full" onClick={() => setOpen(false)}>
            <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
