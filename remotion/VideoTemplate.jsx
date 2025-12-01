"use client";

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Video, staticFile } from "remotion";

export const VideoTemplate = ({ frames = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const secToFrame = (sec) => sec * fps;

  // Find active frame based on current frame
  const active = frames.find(
    (f) => frame >= secToFrame(f.start) && frame < secToFrame(f.end)
  );

  const videoSrc = staticFile("Wed2.mp4");

  const baseStyle = {
    width: "100%",
    textAlign: "center",
    position: "absolute",
    fontFamily: "Georgia",
    lineHeight: 1.2,
  };

  return (
    <AbsoluteFill style={{ width: 370, height: 580, overflow: "hidden", borderRadius: 10 }}>
      <Video src={videoSrc} style={{ width: "100%", height: "100%", borderRadius: 10 }} />

      {/* Couple Names */}
      {active?.type === "couple" && (
        <>
          <div
            style={{
              ...baseStyle,
              bottom: "32%",
              fontSize: "25px",
              color: "lightpink",
              fontFamily: "'Great Vibes', cursive",
              textShadow: "0px 0px 10px black",
              animation: "slideDown 1s ease-out",
            }}
          >
            {active.bride}
          </div>
          <div
            style={{
              ...baseStyle,
              bottom: "25%",
              fontSize: "25px",
              color: "lightpink",
              fontFamily: "'Great Vibes', cursive",
              animation: "slideUp 1s ease-out",
            }}
          >
            &
          </div>
          <div
            style={{
              ...baseStyle,
              bottom: "18%",
              fontSize: "25px",
              color: "lightpink",
              fontFamily: "'Great Vibes', cursive",
              animation: "slideLeft 1s ease-out",
            }}
          >
            {active.groom}
          </div>
        </>
      )}

      {/* Venue & Date */}
      {active?.type === "details" && (
        <>
          <div
            style={{
              ...baseStyle,
              top: "55%",
              fontSize: "22px",
              color: "white",
              textShadow: "0px 0px 10px black",
              animation: "slideRight 1s ease-out",
            }}
          >
            {active.venue}
          </div>
          <div
            style={{
              ...baseStyle,
              top: "36%",
              fontSize: "17px",
              color: "#ffd9e6",
              textShadow: "0px 0px 10px black",
              animation: "slideDown 1s ease-out",
            }}
          >
            {active.date}
          </div>
        </>
      )}

      {/* Animations CSS */}
      <style>
        {`
          @keyframes slideDown { 0% { transform: translateY(-50px); opacity:0 } 100% { transform: translateY(0); opacity:1 } }
          @keyframes slideUp { 0% { transform: translateY(50px); opacity:0 } 100% { transform: translateY(0); opacity:1 } }
          @keyframes slideLeft { 0% { transform: translateX(-50px); opacity:0 } 100% { transform: translateX(0); opacity:1 } }
          @keyframes slideRight { 0% { transform: translateX(50px); opacity:0 } 100% { transform: translateX(0); opacity:1 } }
        `}
      </style>
    </AbsoluteFill>
  );
};
