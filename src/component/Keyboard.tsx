import React, { useEffect, useRef, useState } from 'react'
import { Text, useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.preload('/keyboard.glb')

interface ModelPropsType {
    onClick: () => void
}

// 🔥 safer shader type
type CustomShader = {
    uniforms: Record<string, { value: any }>
    vertexShader: string
    fragmentShader: string
}

// 🔥 GLTF typing
type GLTFResult = {
    nodes: Record<string, THREE.Object3D>
    materials: Record<string, THREE.Material>
}

export function Model({ onClick }: ModelPropsType) {
    const { nodes, materials } = useGLTF('/keyboard.glb') as GLTFResult

    const [label, setLabel] = useState<string>("")
    const [mode, setMode] = useState<number>(0)

    const shaderRef = useRef<CustomShader | null>(null)
    const activeKey = useRef<THREE.Mesh | null>(null)

    // 🔥 cleaner label mapping
    const labelMap: Record<string, string> = {
        Plane001: 'HTML5',
        Plane020: 'CSS3',
        Plane: 'JavaScript',
        Plane013: 'React.Js',
        Plane002: 'Vite',
        Plane004: 'Next.JS',
        Plane022: 'Redux',
        Plane003: 'Socket.io',
        Plane014: 'Bootstrap',
        Plane015: 'Tailwind Css',
        Plane016: 'Rest Api',
        Plane010: 'React Native',
        Plane006: 'CI/CD',
        Plane024: 'Node.Js',
        Plane005: 'Express.JS',
        Plane017: 'NPM',
        Plane018: 'Bit Bucket',
        Plane008: 'Github Action',
        Plane026: 'GIT',
        Plane009: 'MySQL',
        Plane007: 'Slack',
        Plane019: 'GSAP',
    }

    const isInteractive = (mesh: THREE.Mesh) => {
        return !(mesh.name === "Cylinder" || mesh.name === "Plane011")
    }

    const playSound = () => {
        const sound = new Audio('/blue-3.mp3')
        sound.volume = 0.4
        sound.play().catch(() => { })
    }

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()

        onClick?.()
        handlePointerUp()

        setMode((prev) => (prev + 1) % 3)

        const obj = e.object

        // ✅ proper narrowing
        if (!(obj instanceof THREE.Mesh)) return
        if (!isInteractive(obj)) return

        const mesh = obj

        activeKey.current = mesh

        if (mesh.userData.originalY === undefined) {
            mesh.userData.originalY = mesh.position.y
        }

        playSound()

        gsap.to(mesh.position, {
            y: mesh.userData.originalY - 0.08,
            duration: 0.1,
            ease: "power2.out",
        })

        setLabel(labelMap[mesh.name] || 'Click')
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

        activeKey.current = null
    }

    useEffect(() => {
        const mat = materials.Keyb

        mat.onBeforeCompile = (shader: any) => {
            shader.uniforms.uTime = { value: 0 }
            shader.uniforms.uMode = { value: 0 }

            shader.vertexShader =
                `
        varying vec3 vPos;
        ` + shader.vertexShader

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
        #include <begin_vertex>
        vPos = position;
        `
            )

            shader.fragmentShader =
                `
        uniform float uTime;
        uniform float uMode;
        varying vec3 vPos;
        ` + shader.fragmentShader

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
        vec3 finalColor = vec3(0.0);

        if (uMode < 0.5) {
        }
        else if (uMode < 1.5) {
          float wave = sin(vPos.x * 3.0 + uTime * 2.0);

          vec3 rgb = vec3(
            0.5 + 0.5 * sin(uTime + vPos.x * 2.0),
            0.5 + 0.5 * sin(uTime + vPos.x * 2.0 + 2.0),
            0.5 + 0.5 * sin(uTime + vPos.x * 2.0 + 4.0)
          );

          finalColor = rgb * wave;
        }
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
        if (!shaderRef.current) return

        shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
        shaderRef.current.uniforms.uMode.value = mode
    })

    return (
        <group
            dispose={null}
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
            scale={[2, 2, 2]}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMissed={handlePointerUp}
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
                // ✅ safe narrowing
                if (!(node instanceof THREE.Mesh)) return null

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