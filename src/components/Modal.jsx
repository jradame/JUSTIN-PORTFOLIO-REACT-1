/*
 * Modal Component - My custom split-screen modal for about/contact stuff  
 * Left side slides in from left, right side slides in from right
 * Had to get the animations just right - took a few tries but looks smooth now
 */

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHtml5, faCss3Alt, faJs, faReact, faFigma } from '@fortawesome/free-brands-svg-icons';

const Modal = ({ isOpen, onClose, loading, modalType }) => {
  // These handle the smooth open/close animations - don't want jarring popups
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  /*
   * Animation timing is tricky - need to mount component first, then trigger CSS animations
   * The delays here make everything slide in smoothly instead of just appearing
   */
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true); // Add to DOM first
      setTimeout(() => setIsVisible(true), 50); // Then start the slide-in animation
    } else {
      setIsVisible(false); // Start closing animation
      setTimeout(() => setShouldRender(false), 600); // Remove from DOM after animation finishes
    }
  }, [isOpen]);

  /*
   * Contact form state - keeping track of what user types
   * Also handles the fake form submission with loading states
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /*
   * Fake form submission - just simulates sending an email for now
   * Shows loading spinner, then success message, then auto-closes
   * TODO: Hook this up to actual email service later
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fake API call - replace with real form submission when ready
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Show success message then close modal and reset form
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };

  // Update form data as user types
  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Don't render anything if modal isn't supposed to be visible
  if (!shouldRender) return null;

  return (
    <div 
      className={`modal-overlay ${isVisible ? 'open' : 'close'}`} 
      onClick={onClose}
    >
      <div 
        className={`modal ${isVisible ? 'open' : 'close'}`} 
        onClick={(e) => e.stopPropagation()} // Don't close when clicking inside the modal
      >
        {/* X button in top right corner */}
        <button className="modal__exit" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        {/* 
         * LEFT SIDE - Changes based on what type of modal we're showing
         * About modal = personal stuff and tech stack icons
         * Contact modal = sales pitch about custom work
         */}
        <div className={`modal__half modal__left ${isVisible ? 'slide-in' : 'slide-out'}`}>
          {modalType === 'about' ? (
            // ABOUT MODAL - All my personal info and skills
            <div className="modal__about">
              <div className="about-content--balanced">
                <div className="about-content__header">
                  <h1 className="modal__title--about">I'm Justin Adame</h1>
                  <h2 className="modal__sub-title--about">
                    A <span className="blue">Frontend Developer</span> passionate about creating amazing web experiences
                  </h2>
                </div>

                <div className="about-content__body">
                  <p className="modal__para">
                    I specialize in building modern, responsive web applications using <span className="blue">React</span>, 
                    JavaScript, and CSS. I love turning complex problems into simple, beautiful, and intuitive designs.
                  </p>
                  <p className="modal__para">
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                    or enjoying a good cup of coffee while planning my next project.
                  </p>
                </div>

                {/* Tech stack with hover effects - looks pretty cool */}
                <div className="about-content__footer">
                  <div className="modal__languages">
                    <div className="tech-icon html-icon">
                      <FontAwesomeIcon icon={faHtml5} />
                      <span className="tech-name">HTML5</span>
                    </div>
                    <div className="tech-icon css-icon">
                      <FontAwesomeIcon icon={faCss3Alt} />
                      <span className="tech-name">CSS3</span>
                    </div>
                    <div className="tech-icon js-icon">
                      <FontAwesomeIcon icon={faJs} />
                      <span className="tech-name">JavaScript</span>
                    </div>
                    <div className="tech-icon react-icon">
                      <FontAwesomeIcon icon={faReact} />
                      <span className="tech-name">React</span>
                    </div>
                    <div className="tech-icon figma-icon">
                      <FontAwesomeIcon icon={faFigma} />
                      <span className="tech-name">Figma</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // CONTACT MODAL - Sales pitch for custom work
            <div className="modal__contact-info">
              <div className="contact-info-content">
                <div className="contact-info__header">
                  <h1 className="modal__title--contact-info">Let Me Build Something Amazing for You</h1>
                  <h2 className="modal__sub-title--contact-info">
                    Custom <span className="blue">Web Solutions</span> tailored to your unique needs
                  </h2>
                </div>

                <div className="contact-info__body">
                  <p className="modal__para">
                    Every business is unique, and your website should be too. I create <span className="blue">custom web applications</span> 
                    from scratch that perfectly match your vision, goals, and brand identity.
                  </p>
                  <p className="modal__para">
                    Whether you need a stunning portfolio, a powerful e-commerce platform, or a complex web application, 
                    I'll work closely with you to bring your ideas to life with modern technologies and best practices.
                  </p>
                  <p className="modal__para">
                    No templates, no limitations – just a beautifully crafted solution built specifically for you.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 
         * RIGHT SIDE - Contact form is always here regardless of modal type
         * Handles form validation, submission states, and success messages
         */}
        <div className={`modal__half modal__right ${isVisible ? 'slide-in' : 'slide-out'}`}>
          <div className="modal__contact">
            <div className="contact-form-content">
              <div>
                <h1 className="modal__title--contact">Let's Work Together</h1>
                <h2 className="modal__sub-title--contact">
                  Ready to bring your ideas to life? Get in touch!
                </h2>
              </div>

              {/* Show either success message or the actual form */}
              {isSubmitted ? (
                // Success state - shows checkmark and auto-closes after 3 seconds
                <div className="form__success">
                  <div className="success-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>Thanks for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                // The actual contact form with validation
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form__item">
                    <label className="form__item--label">Name</label>
                    <input
                      className="input"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form__item">
                    <label className="form__item--label">Email</label>
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form__item">
                    <label className="form__item--label">Message</label>
                    <textarea
                      className="input"
                      name="message"
                      rows="4"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Submit button changes text when loading */}
                  <button 
                    className={`form__submit ${isSubmitting ? 'form__submit--loading' : ''}`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;






























