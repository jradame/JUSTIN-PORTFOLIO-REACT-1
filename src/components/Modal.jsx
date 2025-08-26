import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCode, faPalette, faRocket } from '@fortawesome/free-solid-svg-icons';
import { faHtml5, faCss3Alt, faJs, faReact, faFigma } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';

const Modal = ({ isOpen, onClose, loading, modalType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 600);
    }
  }, [isOpen]);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`modal-overlay ${isVisible ? 'open' : 'close'}`} 
      onClick={onClose}
    >
      <div 
        className={`modal ${isVisible ? 'open' : 'close'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__exit" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        {/* LEFT HALF - DIFFERENT CONTENT BASED ON MODAL TYPE */}
        <div className={`modal__half modal__left ${isVisible ? 'slide-in' : 'slide-out'}`}>
          {modalType === 'about' ? (
            /* ABOUT MODAL - LEFT SIDE */
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
            /* CONTACT MODAL - LEFT SIDE */
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
        
        {/* RIGHT HALF - CONTACT FORM (SAME FOR BOTH MODALS) */}
        <div className={`modal__half modal__right ${isVisible ? 'slide-in' : 'slide-out'}`}>
          <div className="modal__contact">
            <div className="contact-form-content">
              <div>
                <h1 className="modal__title--contact">Let's Work Together</h1>
                <h2 className="modal__sub-title--contact">
                  Ready to bring your ideas to life? Get in touch!
                </h2>
              </div>

              {isSubmitted ? (
                <div className="form__success">
                  <div className="success-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>Thanks for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
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



























