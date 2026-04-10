'use client'
import { Environment, Lightformer, ScrollControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { useControls } from 'leva'
import React, { useRef } from 'react'
import { debug } from 'util'
import DraggableCard from './DraggableCard'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from "three"
import KeyboardCube from './Keyboard'

const Scene = () => {
    const { debug } = useControls({ debug: false })
    const { camera } = useThree()
    const keyboardRef = useRef()


    useFrame(() => {


        const progress = window.scrollY / window.innerHeight
        console.log('cameara', progress)
        // keyboardRef.current.position.y = -2
        // keyboardRef.current.position.x = 0
        // keyboardRef.current.position.z = 0
        // keyboardRef.current.rotation.y = 0
        // keyboardRef.current.rotation.z = 0
        // keyboardRef.current.rotation.x = progress * 2
        // camera.position.y += (progress - camera.position.y) * 0.1;

        if (progress > 0.5) {
            // keyboardRef.current.visible = true
            camera.position.y = -progress
            const targetY = THREE.MathUtils.lerp(5, 0, progress)
            // keyboardRef.current.position.z = targetY * 4
            // keyboardRef.current.position.y = -targetY


            // // Spin effect
            // keyboardRef.current.rotation.z = progress * Math.PI
        } else {
            //keyboardRef.current.visible = false
        }
    })

    return (
        <>

            <ambientLight intensity={Math.PI} />
            <Physics debug={debug} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                <DraggableCard minSpeed={5} maxSpeed={20} />
            </Physics>
            {/* <mesh ref={keyboardRef} position={[0, -2, - 10]} >

                    <boxGeometry args={[8, 3, 2]} />
                    <meshStandardMaterial metalness={1} roughness={0.2} />
                </mesh> */}
            <Environment blur={0.75}>
                <color attach="background" args={['black']} />
                <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
            </Environment>

        </>

    )
}

export default Scene