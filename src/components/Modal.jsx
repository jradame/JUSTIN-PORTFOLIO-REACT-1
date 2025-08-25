import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHtml5, faCss3Alt, faJs, faFigma } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';

const Modal = ({ isOpen, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your email service here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* About Section */}
        <div className="modal__half modal__about">
          <h3 className="modal__title">
            {loading ? <Skeleton /> : "A little about me"}
          </h3>
          <h4 className="modal__sub-title">
            {loading ? <Skeleton width="60%" /> : "Frontend Developer"}
          </h4>
          
          {loading ? (
            <Skeleton count={4} />
          ) : (
            <>
              <p className="modal__para">
                I'm a passionate <b className="title--secondary">Frontend Developer</b> with a focus on clean, responsive, and user-friendly interfaces.
              </p>
              <p className="modal__para">
                My journey in web development combines creativity with technical skills, always staying current with the latest technologies and best practices.
              </p>
            </>
          )}

          <div className="modal__languages">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <figure key={index} className="modal__language">
                  <Skeleton circle width={48} height={48} />
                  <Skeleton width="60px" />
                </figure>
              ))
            ) : (
              <>
                <figure className="modal__language">
                  <FontAwesomeIcon icon={faHtml5} className="modal__language--icon" />
                  <span className="language__name">HTML</span>
                </figure>
                <figure className="modal__language">
                  <FontAwesomeIcon icon={faCss3Alt} className="modal__language--icon" />
                  <span className="language__name">CSS</span>
                </figure>
                <figure className="modal__language">
                  <FontAwesomeIcon icon={faJs} className="modal__language--icon" />
                  <span className="language__name">JavaScript</span>
                </figure>
                <figure className="modal__language">
                  <FontAwesomeIcon icon={faFigma} className="modal__language--icon" />
                  <span className="language__name">Figma</span>
                </figure>
              </>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="modal__half modal__contact">
          <button className="modal__exit click" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <h3 className="modal__title">Let's chat!</h3>
          <h3 className="modal__sub-title">I am currently seeking out new opportunities.</h3>

          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input floating"
                placeholder=" "
                required
              />
              <label>Name</label>
            </div>

            <div className="form__group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input floating"
                placeholder=" "
                required
              />
              <label>Email</label>
            </div>

            <div className="form__group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="input floating"
                placeholder=" "
                rows="4"
                required
              />
              <label>Message</label>
            </div>

            <button type="submit" className="form__submit">
              Send it my way
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
