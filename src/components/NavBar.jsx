import { useState, useEffect } from 'react';
import { MdOutlineQuestionMark } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Logo } from '../utils/design';

const NavBar = () => {
  const [remainingTime, setRemainingTime] = useState('');
  useEffect(() => {
    if(remainingTime === '00:00:00') localStorage.clear();
    const updateRemainingTime = () => {
      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
      });
      const endTime = new Date(currentTime);
      endTime.setHours(24, 0, 0, 0);
      const timeDifference = endTime - new Date(currentTime);
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setRemainingTime(formattedTime);
    };
    const timerID = setInterval(updateRemainingTime, 1000);
    updateRemainingTime();
    return () => clearInterval(timerID);
  }, []);

  return (
    <nav className="flex justify-evenly items-center bg-design-white font-inter design-color px-40 p-4">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold flex items-center">
          <Logo />
          Cricquest
        </Link>
      </div>
      <span className='px-4 font-inter'>{remainingTime} </span>
      <div className="flex items-center">
        <Link to="/about" className="mr-4">
          <i className="fas fa-info-circle"></i> <MdOutlineQuestionMark />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
