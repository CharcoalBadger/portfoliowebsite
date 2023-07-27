import React, { useState, useEffect } from "react";
import "./opener.css";

export default function Opener() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div class="container">
          <div class="signature">
            <div class="w">W</div>
            <div class="i">i</div>
            <div class="l1">l</div>
            <div class="l2">l</div>
            <div class="i2">i</div>
            <div class="a">a</div>
            <div class="m">m</div>
            <div class="space"> </div>
            <div class="d">D</div>
            <div class="o">o</div>
            <div class="u">u</div>
            <div class="g">g</div>
            <div class="l3">l</div>
            <div class="a2">a</div>
            <div class="s">s</div>
          </div>
        </div>
      </div>
    );
  }
}
