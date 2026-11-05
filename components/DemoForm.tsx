"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import Icon from "@/components/Icon";
import { concerns } from "@/data/home";
import { plans } from "@/data/plans";
import { site } from "@/data/site";

type Variant = "contact" | "visit" | "plan";

const submitLabel: Record<Variant, string> = {
  contact: "Send message",
  visit: "Request a visit",
  plan: "Sign me up",
};

const PREFILL = "qa:prefill-booking";

/** Fill the "visit" form's message box (used by the repair-or-replace result). */
export function prefillBooking(message: string) {
  window.dispatchEvent(new CustomEvent(PREFILL, { detail: message }));
}

/**
 * Front-end only. Submitting never sends anything anywhere: it swaps the form
 * for a thank-you note that says so.
 */
export default function DemoForm({ variant }: { variant: Variant }) {
  const id = useId();
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (variant !== "visit") return;
    const onPrefill = (e: Event) => {
      setSent(false);
      setMessage((e as CustomEvent<string>).detail);
    };
    window.addEventListener(PREFILL, onPrefill);
    return () => window.removeEventListener(PREFILL, onPrefill);
  }, [variant]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="card border-pine/30 bg-pine-soft">
        <p className="flex items-start gap-3 text-lg font-bold text-pine">
          <Icon name="check" className="mt-1 h-6 w-6" />
          <span>{site.formThanks}</span>
        </p>
        <button type="button" className="btn btn-line mt-5" onClick={() => setSent(false)}>
          Reset the demo form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid content-start gap-5 self-start">
      <p className="w-fit rounded-full bg-sand px-3 py-1 text-sm font-bold text-slate">Demo form</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="field-label">
            Name
          </label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="field-label">
            Best number to reach you <span className="font-normal text-slate">(required)</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" required className="field" />
        </div>
      </div>

      {variant === "contact" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-email`} className="field-label">
              Email <span className="font-normal text-slate">(optional)</span>
            </label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" className="field" />
          </div>
          <div>
            <label htmlFor={`${id}-concern`} className="field-label">
              What&apos;s going on?
            </label>
            <select id={`${id}-concern`} name="concern" className="field" defaultValue={concerns[0]}>
              {concerns.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {variant === "plan" && (
        <div>
          <label htmlFor={`${id}-plan`} className="field-label">
            Plan
          </label>
          <select id={`${id}-plan`} name="plan" className="field" defaultValue={plans[0].name}>
            {plans.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      )}

      {variant !== "plan" && (
        <div>
          <label htmlFor={`${id}-message`} className="field-label">
            {variant === "visit" ? "Anything we should know?" : "Message"}
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={variant === "visit" ? 3 : 4}
            className="field"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}

      <div>
        <button type="submit" className="btn btn-pine w-full sm:w-auto">
          {submitLabel[variant]}
        </button>
      </div>
    </form>
  );
}
