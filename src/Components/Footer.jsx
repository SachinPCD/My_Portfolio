import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen } from 'react-icons/fa'
import '../Styles/Footer.css'

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <footer ref={ref} className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="footer-brand"
          >
            <h2 className="footer-name">Sachin Gandu</h2>
            <p className="footer-tagline">Creating digital experiences that matter</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="footer-icons"
          >
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-link"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-link"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-link"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://codepen.io/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-link"
            >
              <FaCodepen />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="footer-bottom"
        >
          <p>&copy; {new Date().getFullYear()} Sachin Gandu. All rights reserved.</p>
          <p className="footer-built-with">Built with React, Three.js, and Framer Motion</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
