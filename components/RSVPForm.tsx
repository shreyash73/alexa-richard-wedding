"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [intolerances, setIntolerances] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Load existing RSVP from localStorage if present
  useEffect(() => {
    const savedRSVP = localStorage.getItem("alexa-richard-rsvp");
    if (savedRSVP) {
      try {
        const parsed = JSON.parse(savedRSVP);
        setName(parsed.name || "");
        setAttendance(parsed.attendance || "");
        setIntolerances(parsed.intolerances || "");
        setIsSubmitted(true);
      } catch (e) {
        console.error("Error reading RSVP cache:", e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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

    // Mock API call submission
    setTimeout(() => {
      const rsvpData = { name, attendance, intolerances, date: new Date().toISOString() };
      localStorage.setItem("alexa-richard-rsvp", JSON.stringify(rsvpData));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <section className="py-24 px-4 bg-bg-primary flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
            RSVP
          </span>
          <h2 className="font-serif italic text-4xl text-text-primary mt-2">
            Confirm Your Attendance
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed font-light mt-4 px-4">
            To help us prepare for a joyful celebration, kindly confirm your attendance before September 30.
          </p>
        </div>

        {/* Outer Form Card */}
        <div className="bg-bg-secondary/40 border border-border/30 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden select-text">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Input */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-text-secondary font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-border hover:border-accent/40 focus:border-accent px-4 py-3 rounded-lg text-sm transition-premium outline-none placeholder:text-text-secondary/40"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Attendance Radios */}
                <div className="flex flex-col select-none">
                  <span className="text-xs uppercase tracking-wider text-text-secondary font-medium mb-3">
                    Will you come?
                  </span>
                  
                  <div className="space-y-2.5">
                    {[
                      { value: "yes", label: "Yes, I will attend" },
                      { value: "no", label: "Unfortunately, I can't come :(" },
                      { value: "later", label: "I'll tell you a bit later" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-premium text-sm ${
                          attendance === option.value
                            ? "bg-accent/5 border-accent text-accent font-medium shadow-sm"
                            : "bg-white border-border text-text-secondary hover:bg-bg-secondary/60"
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
                              ? "border-accent bg-accent"
                              : "border-border bg-white"
                          }`}
                        >
                          {attendance === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Food Intolerances Input */}
                <div className="flex flex-col">
                  <label htmlFor="intolerances" className="text-xs uppercase tracking-wider text-text-secondary font-medium mb-2">
                    Do you have any food intolerances?
                  </label>
                  <textarea
                    id="intolerances"
                    value={intolerances}
                    onChange={(e) => setIntolerances(e.target.value)}
                    placeholder="E.g. vegetarian, nut allergies, gluten-free (optional)"
                    rows={3}
                    className="w-full bg-white border border-border hover:border-accent/40 focus:border-accent px-4 py-3 rounded-lg text-sm transition-premium outline-none placeholder:text-text-secondary/40 resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Validation message */}
                {validationError && (
                  <p className="text-xs text-rose-500 font-medium bg-rose-50 border border-rose-100 rounded-lg px-4 py-2.5">
                    {validationError}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold select-none shadow-md shadow-accent/15 hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed transition-premium"
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
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif italic text-2xl text-accent font-medium mb-3">
                  Response Submitted!
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-light mb-8 max-w-sm">
                  Thank you, <span className="font-semibold text-text-primary">{name}</span>! We have successfully received your RSVP response. We look forward to celebrating with you!
                </p>

                <button
                  onClick={handleEdit}
                  className="px-5 py-2.5 rounded-full border border-border text-text-secondary text-xs hover:text-text-primary hover:bg-white transition-premium"
                >
                  Edit Response
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
