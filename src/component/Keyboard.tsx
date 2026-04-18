import React, { useRef, useState } from 'react'
import { Text, useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'

export function Model(props) {
    const { nodes, materials } = useGLTF('/keyboard.glb')
    const [label, setLabel] = useState("")

    const activeKey = useRef(null) // ✅ track pressed key

    const isInteractive = (mesh) => {
        return !(mesh.name === "Cylinder" || mesh.name === "Plane011")
    }

    const playSound = () => {
        const sound = new Audio('/blue-3.mp3')
        sound.volume = 0.4
        sound.play().catch(() => { })
    }

    const handlePointerDown = (e) => {
        e.stopPropagation()
        const mesh = e.object

        if (!mesh.isMesh || !isInteractive(mesh)) return

        activeKey.current = mesh // ✅ store pressed key

        if (mesh.userData.originalY === undefined) {
            mesh.userData.originalY = mesh.position.y
        }

        playSound()

        gsap.to(mesh.position, {
            y: mesh.userData.originalY - 0.08,
            duration: 0.1,
            ease: "power2.out",
        })
        setLabel(mesh.name)
    }

    const handlePointerUp = () => {
        const mesh = activeKey.current
        if (!mesh) return
        playSound()
        gsap.to(mesh.position, {
            y: mesh.userData.originalY,
            duration: 0.15,
            ease: "power2.out",
        })

        activeKey.current = null // ✅ reset
    }

    return (
        <group
            {...props}
            dispose={null}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMissed={handlePointerUp} // 🔥 important (release outside)
        >
            <Text
                rotation={[4.75, 0, 0]}
                position={[-0.2, 0, -0.7]}
                fontSize={0.2}
                color="white"
            >
                {label}
            </Text>
            {Object.values(nodes).map((node, i) => {
                if (!node.geometry) return null

                return (
                    <mesh
                        key={i}
                        name={node.name}
                        geometry={node.geometry}
                        material={materials.Keyb}
                        position={node.position}
                        castShadow
                        receiveShadow
                    />
                )
            })}
        </group>
    )
}

useGLTF.preload('/keyboard.glb')