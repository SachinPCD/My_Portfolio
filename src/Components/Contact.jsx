import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import '../Styles/Contact.css'

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1500)
  }

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="contact-container">
        <motion.h2 
          className="contact-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          Get In <span className="highlight">Touch</span>
        </motion.h2>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.6 }}
            className="contact-info"
          >
            <h3 className="contact-subtitle">Contact Information</h3>
            <p className="contact-description">
              Feel free to reach out for any questions or opportunities. I'm open to new ideas, projects, or collaborations.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="icon-circle"><FaMapMarkerAlt /></div>
                <div>
                  <h4 className="contact-label">Location</h4>
                  <p>Hyderabad, India</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon-circle"><FaEnvelope /></div>
                <div>
                  <h4 className="contact-label">Email</h4>
                  <p>gandusachin937@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon-circle"><FaPhone /></div>
                <div>
                  <h4 className="contact-label">Phone</h4>
                  <p>+91 9347986673</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="submit-btn"
              >
                {isSubmitting ? (
                  <span className="sending-spinner">
                    <svg className="spinner" viewBox="0 0 24 24">
                      <circle className="circle" cx="12" cy="12" r="10" />
                      <path className="path" d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="send-text">
                    <FaPaperPlane className="plane-icon" />
                    Send Message
                  </span>
                )}
              </motion.button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="success-msg"
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
