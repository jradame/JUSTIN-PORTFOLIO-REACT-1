// Custom scroll animation component using Intersection Observer.
import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  distance = 30
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation only once when element is intersecting.
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            observer.unobserve(entry.target); // Disconnect observer after animation.
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px' // Use rootMargin to trigger slightly early if needed, e.g., '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer on component unmount.
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  // Determine the initial transform state based on direction.
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, 0)`;
      case 'down': return `translate3d(0, -${distance}px, 0)`;
      case 'left': return `translate3d(${distance}px, 0, 0)`;
      case 'right': return `translate3d(-${distance}px, 0, 0)`;
      case 'scale': return 'scale(0.9)';
      default: return `translate3d(0, ${distance}px, 0)`;
    }
  };

  // Define animation styles.
  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform, opacity' // Performance hint for the browser.
  };

  return (
    <div ref={ref} style={animationStyle}>
      {children}
    </div>
  );
};

export default ScrollReveal;


