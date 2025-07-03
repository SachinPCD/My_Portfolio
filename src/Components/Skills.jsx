import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'; 
import '../Styles/Skills.css';
import { useCallback, useRef, useEffect, useState } from 'react';
const skills = [
  { name: 'React', level: 90, color: '#61DAFB' },
  { name: 'JavaScript', level: 95, color: '#F7DF1E' },
  { name: 'TypeScript', level: 85, color: '#3178C6' },
  { name: 'Node.js', level: 88, color: '#68A063' },
  { name: 'Three.js', level: 80, color: '#049EF4' },
  { name: 'CSS/SCSS', level: 92, color: '#2965F1' },
  { name: 'HTML', level: 98, color: '#E34F26' },
  { name: 'Git', level: 90, color: '#F05032' },
  { name: 'Docker', level: 75, color: '#2496ED' },
  { name: 'AWS', level: 70, color: '#FF9900' },
  { name: 'Python', level: 85, color: '#3776AB' },
  { name: 'GraphQL', level: 78, color: '#E10098' },
];

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const skillCardsRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

 const particlesInit = useCallback(async (engine) => {
  await loadFull(engine); // load tsparticles engine plugins
}, []);


  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    skillCardsRef.current.forEach((card) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills" ref={ref} className="skills-section">
      <div className="particle-background">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: {
                value: 40,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981"]
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                }
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.3,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#3b82f6",
                opacity: 0.2,
                width: 1
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 140,
                  line_linked: {
                    opacity: 0.5
                  }
                },
                push: {
                  particles_nb: 4
                }
              }
            },
            retina_detect: true
          }}
        />
      </div>
      
      <div className="skills-container">
        <motion.h2 
          className="skills-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 50,
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          My <span>Skills</span>
        </motion.h2>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              ref={el => skillCardsRef.current[index] = el}
              initial={{ 
                opacity: 0, 
                y: 80,
                rotateX: 5,
                rotateY: 5
              }}
              animate={{ 
                opacity: inView ? 1 : 0, 
                y: inView ? 0 : 80,
                rotateX: inView ? 0 : 5,
                rotateY: inView ? 0 : 5
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -15,
                boxShadow: "0 35px 90px -20px rgba(236, 72, 153, 0.5)"
              }}
              className="skill-card"
              style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}
            >
              <div className="skill-header">
                <motion.h3 
                  className="skill-name" 
                  style={{ color: skill.color }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ 
                    opacity: inView ? 1 : 0, 
                    x: inView ? 0 : -30 
                  }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    duration: 0.6
                  }}
                >
                  {skill.name}
                </motion.h3>
                <motion.span
                  className="skill-level"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: inView ? 1 : 0, 
                    scale: inView ? 1 : 0.8 
                  }}
                  transition={{ 
                    delay: index * 0.1 + 0.4,
                    duration: 0.6
                  }}
                >
                  {skill.level}%
                </motion.span>
              </div>
              
              <div className="skill-bar-container">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: inView ? `${skill.level}%` : 0 }}
                  transition={{ 
                    duration: 2, 
                    delay: index * 0.1 + 0.5,
                    ease: [0.65, 0, 0.35, 1]
                  }}
                  className="skill-bar-fill"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="signature-line"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 30 
          }}
          transition={{ 
            delay: skills.length * 0.1 + 0.5,
            duration: 0.8
          }}
        >
          <p className="signature-text">"Crafting digital experiences with precision and passion"</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;