import React, { useEffect } from "react";
import "./growline.css";

export default function Growline() {
  useEffect(() => {
    function handleScroll() {
      let scrollPercent =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);
      let path = document.getElementById("path");
      let length = path.getTotalLength();
      path.style.strokeDasharray = length * scrollPercent + " " + length;
      path.style.strokeDashoffset = length * (1 - scrollPercent);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grow-container">
      <LineTest id="svg" />
    </div>
  );
}
