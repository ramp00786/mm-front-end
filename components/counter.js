import * as React from "react";

function calculateTimeLeft(upcoming_date_time) {
    console.log(upcoming_date_time)
    const year = new Date().getFullYear();
    const difference = +new Date(upcoming_date_time) - +new Date();
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
}

export default function Counter(upcoming_date_time) {
    //console.log(upcoming_date_time.upcoming_date_time);
    //console.log(calculateTimeLeft(upcoming_date_time.upcoming_date_time));

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(upcoming_date_time.upcoming_date_time));

    React.useEffect(() => {
        const id = setTimeout(() => {
          setTimeLeft(calculateTimeLeft(upcoming_date_time.upcoming_date_time));
        }, 1000);
    
        return () => {
          clearTimeout(id);
        };
    });

    const timerComponents = Object.keys(timeLeft).map( (interval, k) => {
        
    
        return (
           <span key={k}>
            {timeLeft[interval]} {interval}{" "}
           </span>
          
        )
    });

    return (
        <span className="glowing-text">
            {timerComponents.length ? timerComponents : "is ongoing"}
        </span>
        
    );
}