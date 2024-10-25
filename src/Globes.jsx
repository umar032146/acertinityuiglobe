import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "three-globe";
import * as THREE from "three";
import texture from "./8k_earth_daymap.jpg";
function GlobePoints() {
  const globeRef = useRef();

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // Load Earth texture from local assets
    const earthTexture = textureLoader.load(
     texture,  // Path to your local daymap texture
      () => {
        console.log("Earth texture loaded successfully.");
      },
      undefined,
      (error) => {
        console.error("Error loading Earth texture: ", error);
      }
    );

    // Load bump map from local assets
    const bumpTexture = textureLoader.load(
      texture// Path to your local bump texture
    );

    // Initialize the Globe object
    const globe = new Globe()
      .globeImageUrl(null) // Disable default globe image
      .bumpImageUrl(null)  // Disable default bump image
      .pointsData(generatePointsData()) // Add sample points data
      .pointAltitude(() => Math.random() * 0.0) // Point altitude
      .pointColor(() => "#ff5733"); // Point color

    // Create a MeshPhongMaterial with texture and bump map
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,          // Earth day texture
      bumpMap: bumpTexture,       // Earth bump map for terrain
      bumpScale: 0.05,            // Bump map scale to make terrain noticeable
      specular: new THREE.Color("grey"), // Specular highlight for a realistic effect
    });

    // Apply the material to the globe
    globe.globeMaterial(globeMaterial);

    // Add the globe to the scene
    if (globeRef.current) {
      globeRef.current.add(globe);
    }

    // Add atmospheric glow
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(101, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(12 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
            gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0) * intensity;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      })
    );
    globeRef.current.add(atmosphere);

    return () => {
      if (globeRef.current) {
        globeRef.current.remove(globe);
        globeRef.current.remove(atmosphere);
      }
    };
  }, []);

  // Rotate the globe
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.4; // Slow rotation
    }
  });

  // Sample points data
  const generatePointsData = () => {
    return [...Array(50)].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() * 0.2 + 0.05, // Point size
    }));
  };

  return <group ref={globeRef} />;
}

function GlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 400], fov: 45 }}>
      <ambientLight intensity={1} /> {/* Increased ambient light */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} /> {/* Stronger directional light */}
      <GlobePoints />
      <OrbitControls enableZoom={true} autoRotate={false} />
    </Canvas>
  );
}

export default GlobeScene;
