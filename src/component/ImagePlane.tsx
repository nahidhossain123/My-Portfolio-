import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, OrbitControls, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField } from "@react-three/postprocessing";
import { useRef, useEffect } from "react";
import * as THREE from 'three';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Vector3 } from "three";
gsap.registerPlugin(ScrollTrigger);

function Model() {
    const { scene } = useGLTF("/TelePhone.glb");
    return <primitive object={scene} scale={2} rotation={[Math.PI / 6, -Math.PI / 3, 0]} position={[0, -1, 0]} castShadow />;
}

function CinematicSetup() {
    const texture = useLoader(THREE.TextureLoader, '/t5.png')
    // Reference to the Depth of Field effect
    const dofRef = useRef();

    // Tie the blur focus directly to the position of the model [0, 0, 0]
    useEffect(() => {
        if (dofRef.current) {
            dofRef.current.target = new THREE.Vector3(0, 0, 0);
        }
    }, []);

    return (
        <>
            <spotLight
                position={[0, 0.1, 0]}
                intensity={100}
                distance={2}
                decay={6}
                castShadow
            />
            <ambientLight position={[0, 2, 0]} intensity={0.1} />
            <mesh position={[0, 0, -1]}>
                <planeGeometry args={[10, 6]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={0.9}
                    blending={THREE.MultiplyBlending}
                />
            </mesh>
            <EffectComposer>
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={1.3} />
            </EffectComposer>
        </>
    );
}

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new Vector3()

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x, mouse.y * 4, camera.position.z), 0.1)
        camera.lookAt(0, 0, 0)
    })
}


export default function TelePhoneScene() {
    return (
        <div style={{ width: "100%", height: "100%", background: "#000" }}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 35 }}>
                <Text
                    fontSize={0.4}
                    position={[0, 1, 0]}
                >
                    "Hello"
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#FFFFFF"
                        emissiveIntensity={1.2}
                        toneMapped={false}
                    />
                </Text>
                <CinematicSetup />
                <Text
                    fontSize={0.4}
                    position={[0, -1, 0]}
                >
                    "Goodbye"
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#FFFFFF"
                        emissiveIntensity={1.2}
                        toneMapped={false}
                    />
                </Text>
                <Rig />
            </Canvas>
        </div>
    );
}