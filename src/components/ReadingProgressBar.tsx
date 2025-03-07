
import { useEffect, useState } from 'react';

export const ReadingProgressBar = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setReadingProgress(Number((currentPosition / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateReadingProgress);
    
    // Initialize progress
    updateReadingProgress();
    
    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-secondary">
      <div 
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};
