import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { useMemo, useRef } from "react";

const Particles = ({ color, count, radius }) => {
    const ref = useRef();

    const positions = useMemo(
        () =>
            random.inSphere(new Float32Array(count), {
                radius,
            }),
        [count, radius]
    );

    useFrame(({ mouse }) => {
        if (!ref.current) return;
        ref.current.rotation.y += 0.0008;
        ref.current.rotation.x = mouse.y * 0.3;
        ref.current.rotation.y = mouse.x * 0.3;
    });

    return (
        <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
            <Points ref={ref} positions={positions} stride={3}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.012}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </Float>
    );
};

const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 2.5], fov: 75 }}
                dpr={[1, 2]}
            >
                {/* Purple Depth Layer */}
                <Particles
                    color="#7c3aed"
                    count={2000}
                    radius={1.8}
                />

                {/* Blue Foreground Layer */}
                <Particles
                    color="#3b82f6"
                    count={1200}
                    radius={1.2}
                />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;