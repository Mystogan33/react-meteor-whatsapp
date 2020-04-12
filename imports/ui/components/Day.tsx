import React from 'react';

interface DayProps {
  date: string;
};

const Day = ({ date }: DayProps) => {
  return (
    <div className="day--container">
      <div className="day--wrapper">
        <span className="day--span">{date}</span>
      </div>
    </div>
  )
};

export default Day;