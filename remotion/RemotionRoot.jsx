"use client";

import React from "react";
import { Composition } from "remotion";
import { VideoTemplate } from "./VideoTemplate";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MainComp"
        component={VideoTemplate}
        width={390}            // ✅ Match editor video width
        height={580}           // ✅ Match editor video height
        fps={30}
        durationInFrames={450} // 15s video (30fps * 15s)
        defaultProps={{
          frames: [
            { id: 1, start: 0, end: 5, type: "intro" },
            { id: 2, start: 5, end: 10, type: "couple", bride: "Bride Name", groom: "Groom Name" },
            { id: 3, start: 10, end: 15, type: "details", venue: "Venue Name", date: "01 Jan 2025" },
          ],
        }}
      />
    </>
  );
};

export default RemotionRoot;
