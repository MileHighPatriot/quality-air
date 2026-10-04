import Link from "next/link";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Ridge from "@/components/Ridge";
import { nav } from "@/data/nav";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-8">
      <Ridge className="h-12 text-pine md:h-20" fill="#1f4d3a" />
      <div className="on-dark -mt-px bg-pine text-white">
        <div className="wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-5 max-w-sm text-white/85">{site.tagline}</p>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.08em] text-white/75 uppercase">Get in touch</h2>
            <ul className="mt-3 grid gap-1">
              <li>
                <a href={site.phoneHref} className="flex min-h-11 items-center gap-2.5 font-bold hover:underline">
                  <Icon name="phone" className="h-4 w-4" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-2.5 break-all hover:underline">
                  <Icon name="mail" className="h-4 w-4" /> {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-3 grid gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-white/85 hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.08em] text-white/75 uppercase">Where we work</h2>
            <p className="mt-3 text-white/85">
              Based in {site.homeCity}. Serving {site.cities.join(", ")}.
            </p>
            <p className="mt-4 text-white/85">{site.license}</p>
          </div>
        </div>

        <div className="border-t border-white/15">
          <p className="wrap py-6 text-base text-white/80">
            <strong className="text-white">Concept project.</strong> {site.name} is a fictional company designed as a
            portfolio piece by{" "}
            <a href="https://5280webs.com" className="tap font-bold text-white underline underline-offset-4">
              5280 Web Solutions
            </a>
            . Prices, reviews and license numbers are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
