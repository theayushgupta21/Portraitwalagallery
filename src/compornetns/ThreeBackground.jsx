import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Particles = ({ color, count, radius }) => {
    const ref = useRef();

    const positions = useMemo(
        () =>
            random.inSphere(new Float32Array(count), {
                radius,
            }),
        [count, radius]
    );

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        
        // Gentle constant rotation
        ref.current.rotation.y = time * 0.05;
        ref.current.rotation.x = time * 0.02;

        // Smooth mouse follow
        const targetX = state.mouse.x * 0.2;
        const targetY = state.mouse.y * 0.2;
        
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.05);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.05);
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color={color}
                size={0.008}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
            <Canvas
                camera={{ position: [0, 0, 1.5], fov: 75 }}
                dpr={[1, 2]}
            >
                <Particles
                    color="#4f46e5" // Indigo
                    count={3000}
                    radius={1.5}
                />
                <Particles
                    color="#06b6d4" // Cyan
                    count={1500}
                    radius={1}
                />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;