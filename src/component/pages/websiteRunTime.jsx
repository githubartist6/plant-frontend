import React, { useEffect, useState } from "react";
import "../CSS/websiteRunTime.css";

const WebsiteRunTime = () => {
  const [timePassed, setTimePassed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date("Jun 1, 2025 00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const gap = now - startDate;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const year = day * 365;

      const years = Math.floor(gap / year);
      const days = Math.floor((gap % year) / day);
      const hours = Math.floor((gap % day) / hour);
      const minutes = Math.floor((gap % hour) / minute);
      const seconds = Math.floor((gap % minute) / second);

      setTimePassed({ years, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Year", value: timePassed.years },
    { label: "Day", value: timePassed.days },
    { label: "Hour", value: timePassed.hours },
    { label: "Minute", value: timePassed.minutes },
    { label: "Second", value: timePassed.seconds }
  ];

  return (
    <>
      <section className="deal" id="deal">
        <h1 className="heading">Website Live Time</h1>

        <div className="row">
          <div className="content">
            <h3 className="title">how long has the website been running</h3>
            <p>
              Our website has been online since <strong>June 1, 2025</strong>. Below, you can see how much time has passed since then.
            </p>


            <div className="count-down">
              {timeUnits.map((unit, index) => (
                <div className="box" key={index}>
                  <h3>{unit.value}</h3>
                  <span>{unit.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsLGc1y2UwlaGy08vONo7BIjYqXRGs9Lzntg&s"
              alt="website running"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WebsiteRunTime;
