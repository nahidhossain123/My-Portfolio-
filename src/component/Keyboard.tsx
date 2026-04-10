import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function KeyboardCube({ skillsRef }) {
    const meshRef = useRef()
    const [progress, setProgress] = useState(0)

    // 🎯 Track scroll relative to skills section
    useEffect(() => {
        const handleScroll = () => {
            if (!skillsRef?.current) return

            const rect = skillsRef.current.getBoundingClientRect()

            // when section enters → progress starts
            const start = window.innerHeight
            const end = -window.innerHeight

            let p = (start - rect.top) / (start - end)

            // clamp 0 → 1
            p = Math.max(0, Math.min(1, p))

            setProgress(p)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // run once on mount

        return () => window.removeEventListener('scroll', handleScroll)
    }, [skillsRef])

    // 🎬 Animate cube
    useFrame(() => {
        if (!meshRef.current) return

        // smooth easing
        let p = progress * progress * (3 - 2 * progress)

        // 🎯 Position: from back → front
        meshRef.current.position.z = THREE.MathUtils.lerp(2, 0, p)

        // 🎯 Scale
        const scale = THREE.MathUtils.lerp(0.5, 1.2, p)
        meshRef.current.scale.set(scale, scale, scale)

        // 🎯 Rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(-0.5, 0, p)
        meshRef.current.rotation.y = THREE.MathUtils.lerp(0.5, 0, p)
    })

    return (
        <mesh ref={meshRef}>
            {/* keyboard-like flat shape */}
            <boxGeometry args={[3, 0.4, 1.5]} />
            <meshStandardMaterial color="#4f46e5" />
        </mesh>
    )
}