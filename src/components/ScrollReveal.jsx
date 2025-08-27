/*
 * ScrollReveal Component - Custom scroll animations for when elements come into view
 * Built this from scratch instead of using a library because I wanted full control
 * Uses Intersection Observer API - way better performance than scroll event listeners
 */

import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ 
  children, 
  direction = 'up',        // Which way elements slide in from
  delay = 0,               // How long to wait before animating
  duration = 800,          // Animation speed in ms
  threshold = 0.1,         // How much of element needs to be visible to trigger
  distance = 30            // How far elements slide in from
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Intersection Observer is way more efficient than scroll listeners
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only animate once - no annoying re-triggers when scrolling back up
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger animation a bit before element is fully visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Clean up observer to prevent memory leaks
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, hasAnimated]);

  // Different animation directions - slide from any direction or scale up
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)'; // Final position
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;     // Start below, slide up
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;    // Start above, slide down
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;     // Start right, slide left
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;    // Start left, slide right
      case 'scale':
        return 'translate3d(0, 0, 0) scale(0.9)';      // Start small, grow
      default:
        return `translate3d(0, ${distance}px, 0)`;     // Default to slide up
    }
  };

  // Scale animation gets special treatment since it combines with other transforms
  const getScale = () => {
    if (direction === 'scale') {
      return isVisible ? 'scale(1)' : 'scale(0.9)';
    }
    return 'scale(1)';
  };

  // The magic happens here - smooth CSS transitions with custom easing
  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: direction === 'scale' ? getScale() : getTransform(),
    transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`, // Custom easing curve - feels really smooth
    willChange: 'transform, opacity' // Hint to browser for better performance
  };

  return (
    <div ref={ref} style={animationStyle}>
      {children}
    </div>
  );
};

export default ScrollReveal;

