import React, { useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import VideoJS from "./VideoPlayer";

const App = () => {
  const [changeSrc, setChangeSrc] = useState(
    "https://d8vtuwhyjdgx2.cloudfront.net/GF/1.1+FINAL.m3u8"
  );
  const [changeCc, setChangeCc] = useState(
    "https://d8vtuwhyjdgx2.cloudfront.net/GF/1.2+FINAL.vtt"
  );

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    tracks: [
      {
        kind: "captions",
        label: "English",
        srclang: "en",
        src: changeCc,
        default: true,
      },
    ],

    sources: [
      {
        src: changeSrc,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>
        {AllData?.map((d) => {
          return (
            <h1
              style={{ cursor: "pointer", border: "1px solid black" }}
              onClick={() => {
                setChangeCc(d.urlSubtitle);
                setChangeSrc(d.hlsUrl);
              }}
            >
              {d.name}
            </h1>
          );
        })}
      </div>
    </div>
  );
};

export default App;

export const AllData = [
  {
    name: "Topic 1: Key financial concepts for expanding businesses",
    urlSubtitle:
      "https://d8vtuwhyjdgx2.cloudfront.net/Global/SFE+Global+Financial+Literacy+-+Topic+1+Masterclass+(Final).vtt",
    hlsUrl:
      "https://d8vtuwhyjdgx2.cloudfront.net/Global/SFE+Global+Financial+Literacy+-+Topic+1+Masterclass+(Final).m3u8",
  },
  {
    name: "Topic 2: New online and offline business models for SME success",
    urlSubtitle:
      "https://d8vtuwhyjdgx2.cloudfront.net/Global/SFE+Global+Financial+Literacy+-+Topic+2+(Final).vtt",
    hlsUrl:
      "https://d8vtuwhyjdgx2.cloudfront.net/Global/SFE+Global+Financial+Literacy+-+Topic+2+(Final).m3u8",
  },
];
