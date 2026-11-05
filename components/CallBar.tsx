"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/data/site";
import { statusText, useOfficeStatus } from "@/lib/useOfficeStatus";

/** Phone-only call bar pinned to the bottom of the screen, so the number is always one tap away. */
export default function CallBar() {
  const status = useOfficeStatus();

  return (
    <div className="callbar on-dark fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-pine-deep text-white lg:hidden">
      <div className="wrap flex items-center gap-2.5 py-2.5">
        <a href={site.phoneHref} className="btn btn-ember min-w-0 flex-1 flex-col !gap-0 py-1.5 leading-tight">
          <span className="flex items-center gap-2 text-lg">
            <Icon name="phone" className="h-4.5 w-4.5" /> Call {site.phone}
          </span>
          <span className="text-xs font-semibold text-ink">
            {status ? statusText[status].short : `Hours: ${site.hours.label}`}
          </span>
        </a>
        <Link href="/#contact" className="btn border-white/40 px-4 text-white hover:bg-white/10">
          Book
        </Link>
      </div>
    </div>
  );
}
