'use client';

import { useRef } from 'react';
import { Model } from './Keyboard';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// 🔹 Type for your animated ref
type YRefType = React.MutableRefObject<{
    value: number;
}>;

// 🔹 Props type
interface MySkillSceneProps {
    yRef: YRefType,
    onClick: () => void

}

const MySkillScene: React.FC<MySkillSceneProps> = ({ yRef, onClick }) => {

    // 🔹 Three.js group ref
    const modelRef = useRef<THREE.Group | null>(null);

    useFrame(() => {
        if (!modelRef.current) return;

        modelRef.current.position.y = THREE.MathUtils.lerp(
            modelRef.current.position.y,
            yRef.current.value,
            0.1
        );
    });

    return (
        <group ref={modelRef}>
            <Model onClick={onClick} />
        </group>
    );
};

export default MySkillScene;