import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  className?: string
}

// Three.js neural network particle background — interconnected nodes with animated lines
// Matches the "Hardware-as-Software" depth philosophy of Aegis Core design
export function ThreeBackground({ className = '' }: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 80

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // transparent
    mount.appendChild(renderer.domElement)

    // Particle nodes (neural network nodes)
    const NODE_COUNT = 80
    const positions: THREE.Vector3[] = []
    const nodeGeometry = new THREE.BufferGeometry()
    const nodePositions = new Float32Array(NODE_COUNT * 3)

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 180
      const y = (Math.random() - 0.5) * 120
      const z = (Math.random() - 0.5) * 60
      positions.push(new THREE.Vector3(x, y, z))
      nodePositions[i * 3] = x
      nodePositions[i * 3 + 1] = y
      nodePositions[i * 3 + 2] = z
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x0059b5,
      size: 1.2,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial)
    scene.add(nodes)

    // Connection lines between nearby nodes
    const CONNECTION_DISTANCE = 35
    const linePositions: number[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = positions[i].distanceTo(positions[j])
        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z,
          )
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0059b5,
      transparent: true,
      opacity: 0.08,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Ambient glow sphere in the center
    const sphereGeo = new THREE.SphereGeometry(8, 32, 32)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0071e3,
      transparent: true,
      opacity: 0.03,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // Animation loop
    let animFrame: number
    const clock = new THREE.Clock()

    const animate = () => {
      animFrame = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Slow rotation of entire scene
      nodes.rotation.y = elapsed * 0.04
      nodes.rotation.x = Math.sin(elapsed * 0.02) * 0.1
      lines.rotation.y = elapsed * 0.04
      lines.rotation.x = Math.sin(elapsed * 0.02) * 0.1

      // Gentle camera drift
      camera.position.x = Math.sin(elapsed * 0.06) * 8
      camera.position.y = Math.cos(elapsed * 0.04) * 4
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      nodeGeometry.dispose()
      lineGeometry.dispose()
      sphereGeo.dispose()
    }
  }, [])

  return <div ref={mountRef} className={`w-full h-full ${className}`} />
}
