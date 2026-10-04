import type { Metadata } from "next";
import Advisor from "@/components/Advisor";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Repair or replace?",
  description:
    "Answer 3 questions about your furnace, AC, or heat pump. You'll get a straight answer and a sample price range.",
};

export default function RepairOrReplacePage() {
  return (
    <>
      <section className="pt-10 pb-8 md:pt-16">
        <div className="wrap max-w-3xl">
          <p className="eyebrow">Free tool, about 30 seconds</p>
          <h1 className="t-hero mt-4">Repair or replace?</h1>
          <p className="t-lede mt-5">Answer 3 questions. You&apos;ll get a straight answer and a sample price range.</p>
        </div>
      </section>

      <section className="pb-14">
        <div className="wrap max-w-3xl">
          <Advisor />
        </div>
      </section>

      <section id="book" className="section bg-sand">
        <div className="wrap max-w-3xl">
          <h2 className="t-h2">Book a visit</h2>
          <p className="t-lede mt-3 mb-7">Leave a number and the office calls back to set a time.</p>
          <DemoForm variant="visit" />
        </div>
      </section>
    </>
  );
}
