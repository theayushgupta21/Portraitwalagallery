import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* Recoloured for the new site: instead of indigo and cyan, this is dust floating in a projector beam.
   Warm off-white specks plus a few red embers (the site's one accent). Same file name and same default
   export as before, so any section that imports it keeps working.

   Optional props:  <ThreeBackground opacity={0.35} />  */

const Particles = ({ color, count, radius, size, speed, reduce }) => {
    const ref = useRef();

    const positions = useMemo(() => random.inSphere(new Float32Array(count), { radius }), [count, radius]);

    useFrame((state) => {
        if (!ref.current || reduce) return;
        const t = state.clock.getElapsedTime();

        // slow drift, like dust turning in the air
        ref.current.rotation.y = t * 0.04 * speed;
        ref.current.rotation.x = t * 0.015 * speed;

        // gentle follow of the cursor
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.mouse.x * 0.2 * speed, 0.05);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.mouse.y * 0.2 * speed, 0.05);
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </Points>
    );
};

const ThreeBackground = ({ opacity = 0.45 }) => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ opacity }} aria-hidden>
            <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "low-power" }}>
                {/* warm off-white dust (fewer, finer specks than before) */}
                <Particles color="#f2efe9" count={2200} radius={1.5} size={0.006} speed={1} reduce={reduce} />
                {/* a few red embers that drift a little faster, closer to the camera */}
                <Particles color="#ff4b3e" count={260} radius={1} size={0.011} speed={1.6} reduce={reduce} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;