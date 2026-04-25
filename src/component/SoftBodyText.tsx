'use client';
import React, { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const SuperGlowMaterial = shaderMaterial(
    {
        uTexture: null,
        uTime: 0,
        uColor: new THREE.Color('#fff0bd') // Yellow-white glow as requested
    },
    `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime * 1.5; 

    // --- ANIMATION UPDATED FOR SMALLER TEXT ---
    // Reduced amplitude from 0.04 -> 0.012 so the waves don't "shred" the small font
    pos.x += sin(pos.y * 6.0 + t) * 0.012; 
    pos.y += cos(pos.x * 4.0 + t * 1.2) * 0.008;
    pos.z += sin(pos.x * 4.0 + pos.y * 4.0 + t) * 0.015;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
    `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec3 uColor;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    
    // --- GLOW UPDATED FOR SMALLER TEXT ---
    // Reduced offset from 0.01 -> 0.003 to keep the glow tight around thin letters
    float blur = 0.0;
    float off = 0.003; 
    blur += texture2D(uTexture, vUv + vec2(off, off)).a;
    blur += texture2D(uTexture, vUv - vec2(off, off)).a;
    blur += texture2D(uTexture, vUv + vec2(-off, off)).a;
    blur += texture2D(uTexture, vUv + vec2(off, -off)).a;
    blur *= 0.25;

    vec3 coreColor = vec3(5.0); 
    vec3 glowColor = uColor; // Using the yellow-white uniform
    
    vec3 finalRGB = (coreColor * tex.a) + (glowColor * blur * 0.8);
    float finalAlpha = clamp(tex.a + blur * 0.2, 0.0, 1.0);

    gl_FragColor = vec4(finalRGB, finalAlpha);
  }
  `
)

extend({ SuperGlowMaterial })

export default function SuperGlowText({ position = [0, 2, 0.5], args = [2.0, 0.5, 64, 64], size = '60px', text = "My Skills" }) {
    const materialRef = useRef()

    const texture = useMemo(() => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // We keep the high res canvas but use the smaller font
        canvas.width = 1024
        canvas.height = 256

        ctx.shadowColor = "white";
        ctx.shadowBlur = 8; // Reduced blur to match 30px font
        ctx.fillStyle = 'white'
        ctx.font = `Bold ${size} sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(text, 512, 128)

        const tex = new THREE.CanvasTexture(canvas)
        tex.anisotropy = 16 // Keeps thin text sharp at angles
        return tex
    }, [text])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime()
        }
    })

    return (
        <mesh position={position}>
            {/* Plane size reduced slightly to fit the 30px profile better */}
            <planeGeometry args={args} />
            <superGlowMaterial
                ref={materialRef}
                uTexture={texture}
                transparent={true}
                depthWrite={false}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}