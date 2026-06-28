"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuizOption = {
  label: string;
  scoreDelta: number;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: "checkout",
    question: "What is your standard check-out time?",
    options: [
      { label: "10:00 AM", scoreDelta: 1 },
      { label: "11:00 AM", scoreDelta: -1 },
    ],
  },
  {
    id: "flexibility",
    question: "Do you allow late check-outs or early check-ins?",
    options: [
      { label: "Yes, I try to accommodate them", scoreDelta: 2 },
      { label: "No, I strictly enforce times", scoreDelta: -2 },
    ],
  },
  {
    id: "laundry",
    question: "How is laundry handled at your property?",
    options: [
      { label: "On-site washer and dryer", scoreDelta: -1 },
      { label: "Linens must be taken off-site", scoreDelta: 2 },
    ],
  },
  {
    id: "units",
    question: "How many units are you managing?",
    options: [
      { label: "1 unit", scoreDelta: -2 },
      { label: "2–3 units", scoreDelta: 0 },
      { label: "4 or more units", scoreDelta: 3 },
    ],
  },
];

type QuizResult = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

function getResult(score: number): QuizResult {
  if (score > 0) {
    return {
      title: "Recommendation: Cleaning Company",
      body: "Your need for flexibility, tight turnarounds, or off-site laundry points toward an established cleaning company. Teams with backup staff can absorb schedule changes and scale across multiple units without missing a guest-ready deadline.",
      ctaLabel: "Browse Cleaning Companies",
      ctaHref: "/?business=Cleaning+Company",
    };
  }

  return {
    title: "Recommendation: Independent Contractor",
    body: "Your structured schedule and manageable unit count make a solo contractor a strong fit. You get a personal touch, direct communication, and often better margins — ideal when turnovers are predictable and laundry stays on-site.",
    ctaLabel: "Browse Independent Cleaners",
    ctaHref: "/?business=Cleaning+Contractor",
  };
}

export function CleanerQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[step];
  const progress = finished ? 100 : ((step + 1) / QUESTIONS.length) * 100;

  function handleAnswer(delta: number) {
    const nextScore = score + delta;

    if (step >= QUESTIONS.length - 1) {
      setScore(nextScore);
      setFinished(true);
      return;
    }

    setScore(nextScore);
    setStep((s) => s + 1);
  }

  function resetQuiz() {
    setStep(0);
    setScore(0);
    setFinished(false);
  }

  const result = finished ? getResult(score) : null;

  return (
    <section
      className="overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-md"
      style={{
        borderColor: "var(--bv-border)",
        backgroundColor: "var(--bv-bone)",
      }}
    >
      <div
        className="border-b px-5 py-4 sm:px-6"
        style={{
          borderColor: "var(--bv-border)",
          backgroundColor: "var(--bv-summit)",
          color: "var(--bv-frost)",
        }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="size-3.5" style={{ color: "var(--bv-amber)" }} />
          New Host Tool
        </div>
        <h2 className="font-playfair text-2xl tracking-tight sm:text-3xl">
          Which Cleaner is Right for Me?
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--bv-sage)" }}>
          Four quick questions to match your STR operation with the right provider type.
        </p>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <div className="mb-6 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: "var(--bv-frost)" }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: "var(--bv-amber)" }}
          />
        </div>

        {!finished && current ? (
          <div className="animate-in fade-in duration-300">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--bv-slate)" }}>
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <h3 className="mb-5 text-lg font-semibold sm:text-xl" style={{ color: "var(--bv-summit)" }}>
              {current.question}
            </h3>
            <div className="grid gap-3">
              {current.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(option.scoreDelta)}
                  className={cn(
                    "rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200",
                    "hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  )}
                  style={{
                    borderColor: "var(--bv-border)",
                    backgroundColor: "#fff",
                    color: "var(--bv-alpine)",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div
              className="rounded-xl border p-5 sm:p-6"
              style={{
                borderColor: "rgba(196, 130, 10, 0.35)",
                backgroundColor: "rgba(245, 230, 192, 0.35)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--bv-amber)" }}>
                Your Result
              </p>
              <h3 className="mt-2 font-playfair text-2xl" style={{ color: "var(--bv-summit)" }}>
                {result.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--bv-granite)" }}>
                {result.body}
              </p>
              <Link
                href={result.ctaHref}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bv-btn-primary mt-5 inline-flex w-full sm:w-auto"
                )}
              >
                {result.ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <button
              type="button"
              onClick={resetQuiz}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
              style={{ color: "var(--bv-amber)" }}
            >
              <RotateCcw className="size-3.5" />
              Retake Quiz
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
