import Link from "next/link";
import { nav } from "@/data/nav";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="t-hero mt-4">Nothing at this address.</h1>
        <p className="t-lede mt-5">The page you were after isn&apos;t here. These are:</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {nav.map((item, i) => (
            <Link key={item.href} href={item.href} className={`btn ${i === 0 ? "btn-pine" : "btn-line"}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
