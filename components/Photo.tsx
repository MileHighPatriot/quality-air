import { photos, type PhotoKey } from "@/data/photos";
import { asset } from "@/lib/asset";

/** Responsive photo from the prebuilt WebP widths. Plain <img>, since the static export has no resizer. */
export default function Photo({
  name,
  sizes,
  className = "",
  priority = false,
  alt,
}: {
  name: PhotoKey;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Pass "" for decorative use. */
  alt?: string;
}) {
  const p = photos[name];
  const srcSet = p.widths.map((w) => `${asset(`${p.src}-${w}.webp`)} ${w}w`).join(", ");
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, widths are prebuilt
    <img
      src={asset(`${p.src}-${p.widths[1]}.webp`)}
      srcSet={srcSet}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt ?? p.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
