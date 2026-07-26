"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

gsap.registerPlugin(useGSAP);

// ── Where RSVP responses are stored ─────────────────────────────────────────
// Paste the URL of your Google Apps Script Web App (see setup notes) here.
// While this is empty, responses are only kept in the guest's own browser.
const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzWejNQpcYua_Mz2vSELaTSnlLaurN-NE_DtykuZSFW0KZDHeNkRr4C72a7_S6dE0gx/exec";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Fade/slide whichever panel (form or success) is showing
  const swapRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        swapRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    },
    { dependencies: [isSubmitted] }
  );

  // Load existing RSVP from localStorage if present
  useEffect(() => {
    const savedRSVP = localStorage.getItem("harshwardhan-bhumika-rsvp");
    if (savedRSVP) {
      try {
        const parsed = JSON.parse(savedRSVP);
        setName(parsed.name || "");
        setAttendance(parsed.attendance || "");
        setIsSubmitted(true);
      } catch (e) {
        console.error("Error reading RSVP cache:", e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name.trim()) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!attendance) {
      setValidationError("Please let us know if you can come.");
      return;
    }

    setIsSubmitting(true);

    const rsvpData = { name, attendance, date: new Date().toISOString() };

    // Send to the storage endpoint if one is configured.
    if (RSVP_ENDPOINT) {
      try {
        await fetch(RSVP_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(rsvpData).toString(),
        });
      } catch (err) {
        console.error("Error sending RSVP:", err);
      }
    }

    // Keep a local copy so returning guests see their answer.
    localStorage.setItem("harshwardhan-bhumika-rsvp", JSON.stringify(rsvpData));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    // Maroon theatre backdrop — matches Invitation / Venue / ClosingEnvelope so
    // the RSVP reads as continuous with the rest of the invite; gold + cream
    // foreground mirrors the Venue section's palette on the same background.
    <section className="py-24 px-4 bg-maroon flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#e3c984] font-semibold">
            RSVP
          </span>
          <h2 className="font-display italic text-4xl md:text-5xl text-[#e3c984] mt-2">
            Confirm Your Attendance
          </h2>
          <div className="ornament-divider mt-5 mb-4 mx-auto max-w-xs">
            <span className="text-lg">✦</span>
          </div>
          <p className="text-sm text-white/75 leading-relaxed font-light mt-2 px-4">
            To help us prepare for a joyful celebration, kindly confirm your attendance before the 25th of October.
          </p>
        </div>

        {/* Outer Form Card */}
        <div className="bg-[#e3c984]/5 border border-[#e3c984]/25 rounded-2xl p-6 sm:p-10 shadow-lg shadow-black/25 relative overflow-hidden select-text">
          <div ref={swapRef}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-white/60 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white/5 border border-white/15 hover:border-[#e3c984]/50 focus:border-[#e3c984] px-4 py-3 rounded-lg text-sm text-white transition-premium outline-none placeholder:text-white/30"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Attendance Radios */}
                <div className="flex flex-col select-none">
                  <span className="text-xs uppercase tracking-wider text-white/60 font-medium mb-3">
                    Will you come?
                  </span>

                  <div className="space-y-2.5">
                    {[
                      { value: "yes", label: "Yes, I will attend" },
                      { value: "no", label: "Unfortunately, I can't come :(" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-premium text-sm ${
                          attendance === option.value
                            ? "bg-[#e3c984]/10 border-[#e3c984] text-[#e3c984] font-medium shadow-sm"
                            : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={option.value}
                          checked={attendance === option.value}
                          onChange={() => setAttendance(option.value)}
                          className="sr-only"
                          disabled={isSubmitting}
                        />
                        <div
                          className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-premium ${
                            attendance === option.value
                              ? "border-[#e3c984] bg-[#e3c984]"
                              : "border-white/30 bg-transparent"
                          }`}
                        >
                          {attendance === option.value && (
                            <div className="w-2 h-2 rounded-full bg-maroon" />
                          )}
                        </div>
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Validation message */}
                {validationError && (
                  <p className="text-xs text-rose-200 font-medium bg-rose-500/10 border border-rose-300/30 rounded-lg px-4 py-2.5">
                    {validationError}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#e3c984] hover:brightness-105 text-maroon text-sm font-semibold select-none shadow-lg shadow-black/25 hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed transition-premium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Response...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Response
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-400/10 border border-emerald-300/30 text-emerald-300 mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif italic text-2xl text-[#e3c984] font-medium mb-3">
                  Response Submitted!
                </h3>
                <p className="text-sm text-white/75 leading-relaxed font-light mb-8 max-w-sm">
                  Thank you, <span className="font-semibold text-[#e3c984]">{name}</span>! We have successfully received your RSVP response. We look forward to celebrating with you!
                </p>

                <button
                  onClick={handleEdit}
                  className="px-5 py-2.5 rounded-full border border-white/25 text-white/70 text-xs hover:text-maroon hover:bg-[#e3c984] hover:border-[#e3c984] transition-premium"
                >
                  Edit Response
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
