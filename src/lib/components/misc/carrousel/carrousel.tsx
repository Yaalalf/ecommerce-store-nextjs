"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import "./style/mobile.css";

export default function Carrousel({
  imgUrls = [],
  autoplay = false,
  buttonImage = false,
  animationEnter = "moveIn",
  animationExit = "moveOut",
}: {
  imgUrls: string[];
  autoplay?: boolean;
  animationEnter?: string;
  animationExit?: string;
  buttonImage?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const previousSelected = useRef(0);
  const previousSlider = imgUrls[previousSelected.current];
  const currentSlider = imgUrls[selected];
  // const nextSlider = imgUrls[imgUrls.length > selected + 1 ? selected + 1 : 0];

  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    let autoPlayInterval: NodeJS.Timeout;
    if (autoplay) {
      autoPlayInterval = setInterval(() => {
        if (selected < imgUrls.length - 1) {
          previousSelected.current = selected;
          setSelected(selected + 1);
        } else {
          previousSelected.current = selected;
          setSelected(0);
        }
      }, 5000);
    }

    return () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="carrousel">
      <div className="tabs_container">
        {imgUrls.map((el, index) => (
          <button
            key={el}
            className={`tab ${selected == index ? "selected" : ""}`}
            onClick={() => {
              setIsPlay(true);
              previousSelected.current = selected;

              setSelected(index);
            }}
          >
            {buttonImage ? (
              <div
                className="ButtonImage"
                style={{
                  backgroundImage: `url(${el})`,
                }}
              ></div>
            ) : (
              <span className="Icon"></span>
            )}
          </button>
        ))}
      </div>

      <div className="slider_container">
        <div className="slider">
          <div
            className={`transition_marker exited ${isPlay ? "play" : "stop"} `}
            key={selected - 1}
          >
            <div
              className="ImageBackground"
              style={
                {
                  backgroundImage: `url(${previousSlider})`,
                  "--animation-exit": animationExit,
                } as CSSProperties
              }
            ></div>
          </div>

          <div
            className={`transition_marker entered ${
              isPlay ? "play" : "stop"
            }   `}
            key={selected}
          >
            <div
              className="ImageBackground"
              style={
                {
                  backgroundImage: `url(${currentSlider})`,
                  "--animation-enter": animationEnter,
                } as CSSProperties
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
