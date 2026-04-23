import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { useControls } from 'leva'
import React, { useEffect, useRef, useState } from 'react'
import { debug } from 'util'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { useFrame } from '@react-three/fiber'
extend({ MeshLineGeometry, MeshLineMaterial })

const Card = ({ position = [0, 4, 0], maxSpeed = 50, minSpeed = 10 }) => {
    const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
    const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
    const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
    const { width, height } = useThree((state) => state.size)
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
    const [dragged, drag] = useState(false)
    const [hovered, hover] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore

    // useEffect(() => {
    //     if (hovered) {
    //         document.body.style.cursor = dragged ? 'grabbing' : 'grab'
    //         return () => void (document.body.style.cursor = 'auto')
    //     }
    // }, [hovered, dragged])

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
        }
        if (fixed.current) {
            // Fix most of the jitter when over pulling the card
            ;[j1, j2].forEach((ref) => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
                ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
            })
            // Calculate catmul curve
            curve.points[0].copy(j3.current.translation())
            curve.points[1].copy(j2.current.lerped)
            curve.points[2].copy(j1.current.lerped)
            curve.points[3].copy(fixed.current.translation())
            band.current.geometry.setPoints(curve.getPoints(32))
            // Tilt it back towards the screen
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
        }
    })

    return (
        <>
            <group position={position}>
                <RigidBody ref={fixed} {...segmentProps} type='fixed' />
                <RigidBody ref={j1} position={[0.5, 0, 0]} {...segmentProps} >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody ref={j2} position={[1, 0, 0]} {...segmentProps} >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody ref={j3} position={[1.5, 0, 0]} {...segmentProps} >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody ref={card} position={[2.5, 0, 0]} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'} >
                    <CuboidCollider args={[0.5, 0.75, 0.01]} />
                    <group
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                        onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}
                    >
                        <mesh
                            castShadow>
                            <boxGeometry args={[1, 1.5, 0.01]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                    </group>
                </RigidBody>
            </group>
            {/* <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[3, 4, 0.2]} />
                <meshStandardMaterial color="white" />
            </mesh> */}
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    resolution={[width, height]}
                    lineWidth={0.5}
                    depthTest={false}
                />
            </mesh>
        </>
    )
}

const ExperienceCard = () => {
    const { debug } = useControls({ debug: false })
    return (
        <Canvas style={{ touchAction: 'none' }} className='h-full w-full' camera={{ position: [0, 0, 13], fov: 25 }}>
            <ambientLight intensity={Math.PI} />
            <Physics debug={debug} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                <Card position={[0, 4.6, 0]} />
            </Physics>
            {/* <Environment background blur={0.75}>
                <color attach="background" args={['black']} />
                <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
            </Environment> */}
        </Canvas>
    )
}

export default ExperienceCard