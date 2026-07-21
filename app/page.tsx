"use client";

import { useEffect, useState } from "react";
import EnvelopeReveal from "@/components/EnvelopeReveal";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import SaveTheDate from "@/components/SaveTheDate";
import InvitationSection from "@/components/InvitationSection";
import EventsSection from "@/components/EventsSection";
import CountdownSection from "@/components/CountdownSection";
import PhotoSlider from "@/components/PhotoSlider";
import VenueSection from "@/components/VenueSection";
import RSVPForm from "@/components/RSVPForm";
import ClosingEnvelope from "@/components/ClosingEnvelope";

export default function Home() {
  const [envelopeComplete, setEnvelopeComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Try to start the music as soon as the envelope screen loads. Browsers
  // that block audio before the first interaction simply reject this
  // (MusicPlayer resets the state), and the envelope tap starts it instead.
  useEffect(() => {
    setIsMusicPlaying(true);
  }, []);

  return (
    // Phone-format stage: on wide screens the experience renders in a
    // centered 9:16 column so the artwork never gets vertically cropped —
    // section seams (Main 3 → carpet) depend on top/bottom edges meeting.
    <main
      className="relative min-h-screen bg-bg-primary overflow-x-hidden mx-auto"
      style={{ maxWidth: "56.25vh", boxShadow: "0 0 80px rgba(0,0,0,0.55)" }}
    >
      {/* 1. Envelope intro (locks until opened) */}
      {!envelopeComplete && (
        <EnvelopeReveal
          onOpenComplete={() => setEnvelopeComplete(true)}
          onPlayMusic={() => setIsMusicPlaying(true)}
        />
      )}

      {/* 2. Floating audio controller — always mounted so the audio can
             start on the envelope tap; its button sits beneath the envelope
             overlay until the reveal finishes */}
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />

      {/* 3. Main contents — keyed so entrance animations replay once the
             envelope opens instead of running invisibly behind it */}
      <div
        key={envelopeComplete ? "revealed" : "sealed"}
        className={`transition-all duration-1000 ${envelopeComplete ? "opacity-100" : "opacity-0"}`}
      >

        {/* Shared background container for Hero and Save the Date */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/alexa-richard-wedding/combined-first-page-bg.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                userSelect: "none",
              }}
            />
          </div>
          
          <div className="relative z-10">
            {/* Hero — ambience and the couple, scrolls normally */}
            <HeroSection />

            {/* Save the Date — scratch the petal heart to reveal the date */}
            <SaveTheDate />
          </div>
        </div>

        {/* Formal invitation from the families */}
        <InvitationSection />

        {/* Couple photo slider */}
        <PhotoSlider />

        {/* Haldi, Sangeet, Wedding & Reception cards — one per screen on the
            BH5 gradient */}
        <EventsSection />

        {/* Countdown to the festivities */}
        <CountdownSection />

        {/* Venue */}
        <VenueSection />

        {/* Closing Envelope scroll reveal card */}
        <ClosingEnvelope />

        {/* RSVP */}
        <div id="rsvp">
          <RSVPForm />
        </div>

      </div>
    </main>
  );
}
