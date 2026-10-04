import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="t-hero mt-4">Nothing at this address.</h1>
        <p className="t-lede mt-5">The page you were after isn&apos;t here. The three that are:</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className="btn btn-pine">
            Home
          </Link>
          <Link href="/repair-or-replace/" className="btn btn-line">
            Repair or replace?
          </Link>
          <Link href="/maintenance-plan/" className="btn btn-line">
            Maintenance plan
          </Link>
        </div>
      </div>
    </section>
  );
}
