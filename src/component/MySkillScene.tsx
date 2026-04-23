'use client';
import { Canvas, useThree } from '@react-three/fiber'
import React from 'react'
import { Model } from './Keyboard'
import { Environment, OrbitControls, Text } from '@react-three/drei'
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new Vector3()

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.1, mouse.y * 0.1, camera.position.z), 0.1)
        camera.lookAt(0, 0, 0)
    })
}

const MySkillScene = () => {
    return (
        <Canvas className='h-full w-full' shadows camera={{ position: [2, 2, 2], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <Rig />
            <pointLight color={'red'} position={[0, 0, 0]} distance={10} intensity={1} castShadow />
            <Environment preset="city" />
            <Text
                fontSize={0.08}
                position={[0, 0.8, 0]}
            >
                Tech Skills
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#FFFFFF"
                    emissiveIntensity={1.2}
                    toneMapped={false}
                />
            </Text>
            <Model scale={3} />
            {/* <EffectComposer>
                <Noise opacity={0.02} />
            </EffectComposer>  */}
        </Canvas>
    )
}

export default MySkillScene