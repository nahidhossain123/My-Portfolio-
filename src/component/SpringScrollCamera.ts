import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SpringZoomIn({ defaultZ = 5, stiffness = 0.05, damping = 0.85 }) {
  const velocity = useRef(0)
  const positionOffset = useRef(0)
  
  useEffect(() => {
    // 1. Disable the actual page scrollbar via CSS
    document.body.style.overflow = 'hidden'

    const handleWheel = (e) => {
      // 2. Prevent the page from shifting/bouncing
      if (e.cancelable) e.preventDefault()
      
      // 3. Apply our custom zoom logic
      velocity.current -= e.deltaY * 0.0005
    }

    // CRITICAL: passive: false allows e.preventDefault() to work
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      document.body.style.overflow = 'auto' // Restore on unmount
    }
  }, [])

  useFrame((state) => {
    const displacement = positionOffset.current - 0
    const springForce = -stiffness * displacement

    velocity.current += springForce
    velocity.current *= damping
    positionOffset.current += velocity.current

    const targetZ = defaultZ + positionOffset.current
    // Clamp so we don't go through the object
    state.camera.position.z = THREE.MathUtils.clamp(targetZ, 1, 10)
    
    state.camera.lookAt(0, 0, 0)
  })

  return null
}