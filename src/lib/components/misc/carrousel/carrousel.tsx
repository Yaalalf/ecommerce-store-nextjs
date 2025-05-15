"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import "./style/base.css";
import ImageLoader from "../next-component/image-loader";
import { IResource } from "@/db/models/resource";

export default function Carrousel({
  className = "",
  imgUrls = [],
  autoplay = false,
  buttonImage = false,
  animationEnter = "moveIn",
  animationExit = "moveOut",
}: {
  className: string;
  imgUrls: IResource[];
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
  const autoPlayInterval = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isPlay, setIsPlay] = useState(true);

  useEffect(() => {
    if (autoplay) {
      autoPlayInterval.current = setInterval(() => {
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
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
        autoPlayInterval.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, setSelected]);

  return (
    <div className={`carrousel ${className}`}>
      <div className="tabs_container">
        {imgUrls.map((el, index) => (
          <button
            key={el.name}
            className={`tab ${selected == index ? "selected" : ""}`}
            onClick={() => {
              setIsPlay(true);
              previousSelected.current = selected;

              setSelected(index);
              if (autoPlayInterval.current) {
                clearInterval(autoPlayInterval.current);
                autoPlayInterval.current = undefined;
              }
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
            <ImageLoader
              key={previousSlider.name}
              className="ImageBackground"
              src={previousSlider.url}
              alt={previousSlider.name}
              width={1080}
              height={1080}
              priority
              style={
                {
                  // backgroundImage: `url(${previousSlider})`,
                  "--animation-exit": animationExit,
                } as CSSProperties
              }
            ></ImageLoader>
          </div>

          <div
            className={`transition_marker entered ${
              isPlay ? "play" : "stop"
            }   `}
            key={selected}
          >
            <ImageLoader
              key={currentSlider.name}
              className="ImageBackground"
              src={currentSlider.url}
              alt={currentSlider.name}
              width={1080}
              height={1080}
              priority
              style={
                {
                  // backgroundImage: `url(${currentSlider})`,
                  "--animation-enter": animationEnter,
                } as CSSProperties
              }
            ></ImageLoader>
          </div>
        </div>
      </div>
    </div>
  );
}
