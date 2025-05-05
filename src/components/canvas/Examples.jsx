'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useMemo, useEffect, useRef, useState } from "react";
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import ThreeGlobe from "three-globe";
import countries from "../files/globe-data-min.json";
import travelHistory from "../files/my-flights.json";
import CustomShaderMaterial from "three-custom-shader-material"
import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/fragment.glsl"

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Duck(props) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}
export function Dog(props) {
  const { scene } = useGLTF('/dog.glb')

  return <primitive object={scene} {...props} />
}

export function Globe(props) {
  const globeRef = useRef();
  const { camera, size, scene } = useThree();

  const globe = useMemo(() => {
    const g = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
      animateInDuration: 3000,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e) =>
        ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
          e.properties.ISO_A3
        )
          ? "rgba(255,255,255, 1)"
          : "rgba(255,255,255, 0.7)"
      );

    // Configure globe material
    const globeMaterial = g.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.3;
    globeMaterial.shininess = 0.8;
    globeMaterial.opacity = 0.4;
    globeMaterial.transparent = true;

    g.rotateY(-Math.PI * (5 / 9));
    g.rotateZ(-Math.PI / 6);

    return g;
  }, []);

  // Set up arcs after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      globe.arcsData(travelHistory.flights)
        .arcColor((e) => (e.status ? "#00ff00" : "#ff0000"))
        .arcAltitude((e) => e.arcAlt)
        .arcStroke((e) => (e.status ? 0.5 : 0.3))
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e) => e.order * 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [globe]);

  useEffect(() => {
    camera.position.set(0, 0, size.height / 2 + 25);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [globe, size]);

  useFrame(() => {
    globe.rotation.y -= 0.01;
  });

  return <primitive object={globe} {...props} ref={globeRef} />
}



export function Box1(props) {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      rotation={[0, Math.PI / 4, Math.PI / 8]}
      position={[0, 0, 0.5]}
    >
      <boxGeometry args={[1.7, 1.7, 1.7]} />
      <meshNormalMaterial />
    </mesh>
  )
}
export function Box2(props) {
  const meshRef = useRef()
  const materialRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })


  return (
    <mesh
        {...props}
        ref={meshRef}
        rotation={[0, Math.PI / 4, Math.PI / 8]}
        position={[0, 0, 0.5]}
      >
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
          }}
        />
        <boxGeometry args={[1.5, 1.5, 1.5]} />
      </mesh>

  )
}


export function TorusKnot(props) {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      rotation={[0, Math.PI / 4, Math.PI / 8]}
      position={[0, 0, 0.5]}
    >
      <torusKnotGeometry args={[1, 0.4, 90, 20]} />
      <meshNormalMaterial />
    </mesh>
  )
}

