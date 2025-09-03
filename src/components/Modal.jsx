import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCode, faPalette, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faHtml5, faCss3Alt, faJs, faReact, faFigma } from '@fortawesome/free-brands-svg-icons';


const Modal = ({ isOpen, onClose, modalType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  /* MODAL VISIBILITY */
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 600);
    }
  }, [isOpen]);


  /* FORM HANDLERS */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);


    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };


  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  if (!shouldRender) return null;


  /* RENDER */
  return (
    <div
      className={`modal-overlay ${isVisible ? 'open' : 'close'}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease-in-out'
      }}
    >
      <div
        className={`modal ${isVisible ? 'open' : 'close'}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1f2937',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          maxWidth: '1000px',
          minHeight: '500px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
          transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        <button
          className="modal__exit"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 10001
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>


        {/* --- LEFT SIDE --- */}
        <div
          className="modal__half modal__left"
          style={{
            flex: 1,
            padding: '2rem',
            background: '#111827',
            color: '#fff',
            overflowY: 'auto',
            transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.5s ease'
          }}
        >
          {modalType === 'about' ? (
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
                    I specialize in building modern, responsive web applications using <span className="blue">React</span>, JavaScript, and CSS. I love turning complex problems into simple, beautiful, and intuitive designs.
                  </p>
                  <p className="modal__para">
                    When I'm not coding, you can find me exploring new technologies, or enjoying a good cup of coffee.
                  </p>
                </div>
                <div className="about-content__footer">
                  <div className="modal__languages">
                    <div className="tech-icon html-icon"><FontAwesomeIcon icon={faHtml5} /><span className="tech-name">HTML5</span></div>
                    <div className="tech-icon css-icon"><FontAwesomeIcon icon={faCss3Alt} /><span className="tech-name">CSS3</span></div>
                    <div className="tech-icon js-icon"><FontAwesomeIcon icon={faJs} /><span className="tech-name">JavaScript</span></div>
                    <div className="tech-icon react-icon"><FontAwesomeIcon icon={faReact} /><span className="tech-name">React</span></div>
                    <div className="tech-icon figma-icon"><FontAwesomeIcon icon={faFigma} /><span className="tech-name">Figma</span></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal__contact-info">
              <div className="contact-info-content">
                {/* --- TOP PART --- */}
                <div>
                  <div className="contact-info__header">
                    <h1 className="modal__title--contact-info">Let Me Build Something Amazing for You</h1>
                    <h2 className="modal__sub-title--contact-info">Custom <span className="blue">Web Solutions</span> tailored to your needs</h2>
                  </div>
                  <div className="contact-info__body">
                    <p className="modal__para">
                      Every business is unique. I create <span className="blue">custom web applications</span> from scratch that perfectly match your vision and brand.
                    </p>
                    <p className="modal__para">
                      No templates, no limitations – just a beautifully crafted solution built for you.
                    </p>
                    {/* --- NEW PARAGRAPH --- */}
                    <p className="modal__para">
                      From stunning UI/UX designs to seamless and responsive development, I provide the expertise to bring your ideas to life.
                    </p>
                  </div>
                </div>


                {/* --- BOTTOM PART (SERVICES) --- */}
                <div className="contact-info__footer">
                  <h3 className="services-title">My Services</h3>
                  <div className="modal__services">
                    <div className="tech-icon code-icon">
                      <FontAwesomeIcon icon={faCode} />
                      <span className="tech-name">Web Dev</span>
                    </div>
                    <div className="tech-icon design-icon">
                      <FontAwesomeIcon icon={faPalette} />
                      <span className="tech-name">UI/UX</span>
                    </div>
                    <div className="tech-icon responsive-icon">
                      <FontAwesomeIcon icon={faMobileAlt} />
                      <span className="tech-name">Responsive</span>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          )}
        </div>


        {/* --- RIGHT SIDE --- */}
        <div
          className="modal__half modal__right"
          style={{
            flex: 1,
            padding: '2rem',
            background: '#1f2937',
            color: '#fff',
            overflowY: 'auto',
            transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.5s ease'
          }}
        >
          <div className="modal__contact">
            <div className="contact-form-content">
              <div>
                <h1 className="modal__title--contact">Let's Work Together</h1>
                <h2 className="modal__sub-title--contact">Ready to bring your ideas to life? Get in touch!</h2>
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
                    <input className="input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="form__item">
                    <label className="form__item--label">Email</label>
                    <input className="input" type="email" name="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="form__item">
                    <label className="form__item--label">Message</label>
                    <textarea className="input" name="message" rows="4" placeholder="Tell me about your project..." value={formData.message} onChange={handleInputChange} required />
                  </div>
                  <button className={`form__submit ${isSubmitting ? 'form__submit--loading' : ''}`} type="submit" disabled={isSubmitting}>
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
































