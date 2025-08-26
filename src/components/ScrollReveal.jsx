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
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, hasAnimated]);

  // Animation styles based on direction
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'scale':
        return 'translate3d(0, 0, 0) scale(0.9)';
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  const getScale = () => {
    if (direction === 'scale') {
      return isVisible ? 'scale(1)' : 'scale(0.9)';
    }
    return 'scale(1)';
  };

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: direction === 'scale' ? getScale() : getTransform(),
    transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform, opacity'
  };

  return (
    <div ref={ref} style={animationStyle}>
      {children}
    </div>
  );
};

export default ScrollReveal;
