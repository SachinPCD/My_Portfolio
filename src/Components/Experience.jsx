import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../Styles/Experience.css'

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description: [
      "Lead the development of responsive web applications using React and TypeScript",
      "Implemented advanced animations and 3D visualizations with Three.js",
      "Optimized application performance, reducing load times by 40%",
      "Mentored junior developers and conducted code reviews"
    ]
  },
  {
    role: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    period: "2018 - 2021",
    description: [
      "Developed and maintained company websites and web applications",
      "Collaborated with designers to implement pixel-perfect UIs",
      "Integrated RESTful APIs and implemented state management solutions",
      "Participated in agile development processes"
    ]
  },
  {
    role: "Web Developer Intern",
    company: "StartUp Ventures",
    period: "2017 - 2018",
    description: [
      "Assisted in building and testing web applications",
      "Learned modern web development practices and frameworks",
      "Fixed bugs and implemented small features",
      "Participated in team meetings and code reviews"
    ]
  }
]

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" ref={ref} className="experience-section">
      <div className="experience-container">
        <motion.h2 
          className="experience-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          Work <span className="highlight">Experience</span>
        </motion.h2>

        <div className="timeline-wrapper">
          <div className="timeline-line" />

          <div className="timeline-events">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (index % 2 === 0 ? -50 : 50) }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`timeline-item ${index % 2 === 0 ? 'left-align' : 'right-align'}`}
              >
                <div className="timeline-dot" />

                <div className={`experience-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="experience-box"
                  >
                    <h3 className="role">{exp.role}</h3>
                    <h4 className="company">{exp.company}</h4>
                    <p className="period">{exp.period}</p>
                    <ul className="description-list">
                      {exp.description.map((item, i) => (
                        <li key={i} className="description-item">{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
