import React, { useEffect, useRef, useState } from 'react'
import { Text, useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';


export function Model(props) {
    const texture = useLoader(THREE.TextureLoader, '/t5.png')
    const { nodes, materials } = useGLTF('/keyboard.glb')
    const [label, setLabel] = useState("")
    const shaderRef = useRef(null)
    const [mode, setMode] = useState(0) // 0 = static, 1 = wave, 2 = blink

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
        setMode((prev) => (prev + 1) % 3)
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

    useEffect(() => {
        const mat = materials.Keyb
        mat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 }
            shader.uniforms.uMode = { value: 0 }

            shader.vertexShader = `
        varying vec3 vPos;
    ` + shader.vertexShader

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
        #include <begin_vertex>
        vPos = position;
        `
            )

            shader.fragmentShader = `
        uniform float uTime;
        uniform float uMode;
        varying vec3 vPos;
    ` + shader.fragmentShader

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
        vec3 finalColor = vec3(0.0);

        // MODE 0 → static light
        if (uMode < 0.5) {
          
        }

        // MODE 1 → wave
        else if (uMode < 1.5) {
            float wave = sin(vPos.x * 3.0 + uTime * 2.0);

            vec3 rgb = vec3(
                0.5 + 0.5 * sin(uTime + vPos.x * 2.0),
                0.5 + 0.5 * sin(uTime + vPos.x * 2.0 + 2.0),
                0.5 + 0.5 * sin(uTime + vPos.x * 2.0 + 4.0)
            );

            finalColor = rgb * wave;
        }

        // MODE 2 → blink
        else {
            finalColor = vec3(
                0.5 + 0.5 * sin(uTime + vPos.x * 2.0),
                0.5 + 0.5 * sin(uTime + vPos.x * 2.0 + 2.0),
                0.5 + 0.5 * sin(uTime + vPos.x * 2.0 + 4.0)
            );
        }

        gl_FragColor.rgb += finalColor * 0.6;

        #include <dithering_fragment>
        `
            )

            shaderRef.current = shader
        }
    }, [materials])

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value =
                state.clock.elapsedTime

            shaderRef.current.uniforms.uMode.value = mode
        }
    })

    return (
        <group
            {...props}
            dispose={null}
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
            scale={[1, 1, 1]}
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
            {/* <mesh position={[0, 0, 0]}>
                <planeGeometry args={[4, 2]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={0.9}
                    blending={THREE.MultiplyBlending}
                />
            </mesh> */}
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