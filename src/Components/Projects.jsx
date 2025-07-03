import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../Styles/Projects.css';

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include product management, cart functionality, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/project1.jpeg",
    link: "#",
    github: "#"
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website built with Next.js and Tailwind CSS. Features dark mode, animations, and a contact form.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/project2.jpeg",
    link: "#",
    github: "#"
  },
  {
    title: "Task Management App",
    description: "A task management application with drag-and-drop functionality, real-time updates, and user authentication.",
    tags: ["React", "Firebase", "React DnD"],
    image: "/project3.jpeg",
    link: "#",
    github: "#"
  },
  {
    title: "3D Visualization Tool",
    description: "A web-based 3D visualization tool for architectural designs using Three.js and React Three Fiber.",
    tags: ["Three.js", "React Three Fiber", "Blender"],
    image: "/project4.jpeg",
    link: "#",
    github: "#"
  }
];

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const threeContainerRef = useRef(null);

  useEffect(() => {
    if (!threeContainerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeContainerRef.current.appendChild(renderer.domElement);

    // Add floating geometry
    const geometries = [];
    const colors = [0xec4899, 0x8b5cf6, 0x3b82f6, 0x10b981];
    
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.3, 0);
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.6,
        shininess: 100,
        emissive: 0x111111,
        specular: 0xffffff
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      geometries.push(mesh);
      scene.add(mesh);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 15;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      geometries.forEach((mesh, index) => {
        mesh.rotation.x += 0.002 * (index % 3 === 0 ? 1 : -1);
        mesh.rotation.y += 0.003 * (index % 2 === 0 ? 1 : -1);
      });
      
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      threeContainerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="projects" ref={ref} className="projects-section">
      <div ref={threeContainerRef} className="threejs-background" />
      
      <div className="projects-container">
        <motion.h2 
          className="projects-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 40,
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          Featured <span>Projects</span>
        </motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                y: 60,
                rotateX: 10,
                rotateY: 5
              }}
              animate={{ 
                opacity: inView ? 1 : 0, 
                y: inView ? 0 : 60,
                rotateX: inView ? 0 : 10,
                rotateY: inView ? 0 : 5
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -15,
                boxShadow: "0 25px 50px -15px rgba(236, 72, 153, 0.4)"
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="project-card"
            >
              <div className="project-image-wrapper">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: hoveredIndex === index ? 1.1 : 1,
                    filter: hoveredIndex === index ? 
                      "brightness(1.1) contrast(1.05)" : 
                      "brightness(1) contrast(1)"
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
                <div className="project-overlay" />
              </div>
              
              <div className="project-content">
                <motion.h3 
                  className="project-title"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: inView ? 1 : 0, 
                    x: inView ? 0 : -20 
                  }}
                  transition={{ 
                    delay: index * 0.15 + 0.3,
                    duration: 0.6
                  }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="project-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ 
                    delay: index * 0.15 + 0.4,
                    duration: 0.6
                  }}
                >
                  {project.description}
                </motion.p>
                
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8,
                        y: 10
                      }}
                      animate={{ 
                        opacity: inView ? 1 : 0, 
                        scale: inView ? 1 : 0.8,
                        y: inView ? 0 : 10
                      }}
                      transition={{ 
                        delay: index * 0.15 + i * 0.1 + 0.5,
                        duration: 0.5,
                        ease: "backOut"
                      }}
                      className="project-tag"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                <div className="project-buttons">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: inView ? 1 : 0, 
                      y: inView ? 0 : 20 
                    }}
                    transition={{ 
                      delay: index * 0.15 + 0.7,
                      duration: 0.6
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(219, 39, 119, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="project-button"
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: inView ? 1 : 0, 
                      y: inView ? 0 : 20 
                    }}
                    transition={{ 
                      delay: index * 0.15 + 0.8,
                      duration: 0.6
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(236, 72, 153, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="project-button-outline"
                  >
                    View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;