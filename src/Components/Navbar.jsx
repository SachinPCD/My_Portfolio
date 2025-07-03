import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import '../Styles/Navbar.css'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [ref, inView] = useInView({ threshold: 0.1 })

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <motion.nav
            ref={ref}
            initial={{ opacity: 0, y: -20 }}
            animate={{
                opacity: inView ? 1 : 0.8,
                y: inView ? 0 : -10,
                backgroundColor: scrolled ? 'rgba(17, 24, 39, 0.8)' : 'rgba(17, 24, 39, 0)',
            }}
            transition={{ duration: 0.5 }}
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
        >
            <div className="navbar-container">
                <motion.a
                    href="#home"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="navbar-logo"
                >
                    SachinPCD
                </motion.a>

                <div className="navbar-links">
                    {navItems.map((item, index) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            className="navbar-link"
                        >
                            {item.name}
                        </motion.a>
                    ))}
                </div>

                <div className="navbar-icons">
                    <motion.a
                        href="https://github.com/SachinPCD"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="navbar-icon"
                    >
                        <FaGithub />
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/sachin-gandu-5383b42a5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="navbar-icon"
                    >
                        <FaLinkedin />
                    </motion.a>
                    <motion.a
                        href="https://www.youtube.com/@SachinPCD-Telugu" // Replace with your actual channel URL if different
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="navbar-icon"
                    >
                        <FaYoutube />
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar
