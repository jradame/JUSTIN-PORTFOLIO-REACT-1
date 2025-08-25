import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJs, faReact, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faTimes, faCode, faPaintBrush, faRocket } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';

const Modal = ({ isOpen, onClose, loading, modalType = 'about' }) => {
  const modalRef = useRef(null);
  const [animationClass, setAnimationClass] = useState('');
  const [contactForm, setContactForm] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_sv36fer';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_oc260qe';
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'HTqTsoxXu_8N9-M5H';

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, [EMAILJS_PUBLIC_KEY]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    }

    function handleEscKey(event) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      setAnimationClass('slide-in');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Smooth slide-out before closing
  const handleClose = () => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      onClose();
      setAnimationClass('');
      setErrors({});
      setSubmitSuccess(false);
    }, 500);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!contactForm.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    } else if (contactForm.user_name.trim().length < 2) {
      newErrors.user_name = 'Name must be at least 2 characters';
    }

    if (!contactForm.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.user_email)) {
      newErrors.user_email = 'Please enter a valid email address';
    }

    if (!contactForm.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (contactForm.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: contactForm.user_name,
          user_email: contactForm.user_email,
          message: contactForm.message,
          to_email: 'jradame@gmail.com'
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Success:', result);
      setSubmitSuccess(true);
      setContactForm({ user_name: '', user_email: '', message: '' });
      
      setTimeout(() => {
        handleClose();
      }, 2500);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrors({ 
        submit: error.text || error.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !animationClass) return null;

  return (
    <div className={`modal-overlay ${animationClass}`}>
      <div className={`modal ${animationClass}`} ref={modalRef}>
        {/* Left Side Content - Changes based on modalType */}
        <div className="modal__half modal__about modal__left">
          {modalType === 'about' ? (
            // ABOUT MODAL CONTENT - BALANCED HEIGHT
            <div className="about-content about-content--balanced">
              <div className="about-content__header">
                <h3 className="modal__title modal__title--about">
                  {loading ? <Skeleton width="200px" /> : "Here's a bit about me."}
                </h3>
                <h4 className="modal__sub-title modal__sub-title--about">
                  {loading ? <Skeleton width="180px" /> : "Frontend Developer | React Enthusiast | Driven by Curiosity"}
                </h4>
              </div>
              
              <div className="about-content__body">
                {loading ? (
                  <div className="modal__para">
                    <Skeleton count={4} />
                  </div>
                ) : (
                  <>
                    <p className="modal__para">
                      What started as curiosity has evolved into a passion for building lightning-fast, 
                      responsive web applications using <b className="blue">React</b>, <b className="blue">JavaScript</b>, and modern <b className="blue">CSS</b>.
                    </p>
                    <p className="modal__para">
                      I write clean, maintainable code that doesn't just work – it delights users 
                      with smooth animations and intuitive interfaces.
                    </p>
                    <p className="modal__para">
                      Ready to build something <b className="blue">extraordinary</b> together?
                    </p>
                  </>
                )}
              </div>

              <div className="about-content__footer">
                {/* TECH ICONS */}
                <div className="modal__languages">
                  {loading ? (
                    Array(5).fill(0).map((_, index) => (
                      <div key={index} className="tech-icon-skeleton">
                        <Skeleton width={60} height={60} borderRadius={12} />
                      </div>
                    ))
                  ) : (
                    <>
                      <figure className="tech-icon html-icon">
                        <FontAwesomeIcon icon={faHtml5} />
                        <span className="tech-name">HTML</span>
                      </figure>
                      <figure className="tech-icon css-icon">
                        <FontAwesomeIcon icon={faCss3Alt} />
                        <span className="tech-name">CSS</span>
                      </figure>
                      <figure className="tech-icon js-icon">
                        <FontAwesomeIcon icon={faJs} />
                        <span className="tech-name">JavaScript</span>
                      </figure>
                      <figure className="tech-icon react-icon">
                        <FontAwesomeIcon icon={faReact} />
                        <span className="tech-name">React</span>
                      </figure>
                      <figure className="tech-icon figma-icon">
                        <FontAwesomeIcon icon={faFigma} />
                        <span className="tech-name">Figma</span>
                      </figure>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // CONTACT MODAL CONTENT - CENTERED AND IMPROVED
            <div className="contact-content">
              <h3 className="modal__title modal__title--about modal__title--centered">
                {loading ? <Skeleton width="200px" /> : "Let's Work Together!"}
              </h3>
              <h4 className="modal__sub-title modal__sub-title--about modal__sub-title--centered">
                {loading ? <Skeleton width="180px" /> : "Collaborative Development | User-Focused Design | Results-Driven"}
              </h4>
              
              {loading ? (
                <div className="modal__para">
                  <Skeleton count={4} />
                </div>
              ) : (
                <>
                  <p className="modal__para modal__para--centered">
                    I partner with <b className="blue">businesses</b>, <b className="blue">startups</b>, and <b className="blue">individuals</b> to create 
                    digital experiences that make an impact and drive results.
                  </p>
                  <p className="modal__para modal__para--centered">
                    From concept to deployment, I bring technical expertise and creative problem-solving 
                    to every project, ensuring your vision comes to life exactly as imagined.
                  </p>
                  <p className="modal__para modal__para--centered">
                    Ready to turn your <b className="blue">ideas</b> into reality?
                  </p>
                </>
              )}

              {/* IMPROVED SERVICES ICONS */}
              <div className="modal__services">
                {loading ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="service-icon-skeleton">
                      <Skeleton width={70} height={70} borderRadius={12} />
                    </div>
                  ))
                ) : (
                  <>
                    <figure className="service-icon development-icon">
                      <FontAwesomeIcon icon={faCode} />
                      <span className="service-name">Development</span>
                    </figure>
                    <figure className="service-icon design-icon">
                      <FontAwesomeIcon icon={faPaintBrush} />
                      <span className="service-name">Design</span>
                    </figure>
                    <figure className="service-icon launch-icon">
                      <FontAwesomeIcon icon={faRocket} />
                      <span className="service-name">Launch</span>
                    </figure>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Contact Form (Same for both modals) */}
        <div className="modal__half modal__contact modal__right">
          <button className="modal__exit click" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div className="contact-form-content">
            <h3 className="modal__title modal__title--contact">
              {loading ? <Skeleton width="180px" /> : "Let's Build Something Amazing!"}
            </h3>
            <h4 className="modal__sub-title modal__sub-title--contact">
              {loading ? <Skeleton width="220px" /> : "Your project deserves thoughtful design and clean code."}
            </h4>

            {loading ? (
              <div className="modal__contact--loading">
                <Skeleton height={40} style={{ marginBottom: '1rem' }} />
                <Skeleton height={40} style={{ marginBottom: '1rem' }} />
                <Skeleton height={100} style={{ marginBottom: '1rem' }} />
                <Skeleton height={50} width={150} />
              </div>
            ) : (
              <>
                {submitSuccess ? (
                  <div className="form__success">
                    <div className="success-icon">✓</div>
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out. I'll get back to you soon!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="form" noValidate>
                    <div className="form__item">
                      <label className="form__item--label">Name</label>
                      <input 
                        type="text" 
                        name="user_name"
                        value={contactForm.user_name}
                        onChange={handleFormChange}
                        className={`input ${errors.user_name ? 'input--error' : ''}`}
                        placeholder="Your full name"
                        required
                      />
                      {errors.user_name && <span className="form__error">{errors.user_name}</span>}
                    </div>
                    
                    <div className="form__item">
                      <label className="form__item--label">Email</label>
                      <input 
                        type="email" 
                        name="user_email"
                        value={contactForm.user_email}
                        onChange={handleFormChange}
                        className={`input ${errors.user_email ? 'input--error' : ''}`}
                        placeholder="your.email@example.com"
                        required
                      />
                      {errors.user_email && <span className="form__error">{errors.user_email}</span>}
                    </div>
                    
                    <div className="form__item">
                      <label className="form__item--label">Message</label>
                      <textarea 
                        name="message"
                        value={contactForm.message}
                        onChange={handleFormChange}
                        className={`input ${errors.message ? 'input--error' : ''}`}
                        rows="4"
                        placeholder="Tell me about your project or just say hello!"
                        required
                      />
                      {errors.message && <span className="form__error">{errors.message}</span>}
                    </div>
                    
                    {errors.submit && (
                      <div className="form__error form__error--submit">{errors.submit}</div>
                    )}
                    
                    <button 
                      type="submit" 
                      className={`form__submit ${isSubmitting ? 'form__submit--loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;














