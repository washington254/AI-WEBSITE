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
import fragmentShader2 from "./shader2/fragment2.glsl"
import { useStore } from "../../templates/hooks/useStore"; 



export function Globe(props) {
  const globeRef = useRef();
  const { camera, size, scene } = useThree();
  const currentTheme = useStore((state) => state.theme);
  const opacityVal = currentTheme === "dark" ? 0.4 : 0.7
  
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
    .atmosphereAltitude(0.25);


    const globeMaterial = g.globeMaterial();
    globeMaterial.shininess = 0.8;
    globeMaterial.opacity = opacityVal;
    globeMaterial.transparent = true;
    
    g.rotateY(-Math.PI * (5 / 9));
    g.rotateZ(-Math.PI / 6);
    return g;
  }, []);

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
    if (!globe) return;
    
    const globeMaterial = globe.globeMaterial();
    const highlightedCountries = ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"];
    
    if (currentTheme === "dark") {
      // Dark theme settings
      globeMaterial.color = new THREE.Color(0x3a228a);
      globeMaterial.emissive = new THREE.Color(0x220038);
      globeMaterial.emissiveIntensity = 0.3;
      globe.atmosphereColor("#3a228a");
      
      // Dark theme hex polygon colors
      globe.hexPolygonColor((e) =>
        highlightedCountries.includes(e.properties.ISO_A3)
          ? "rgba(255,255,255, 1)"
          : "rgba(255,255,255, 0.7)"
      );
    } else {
      globeMaterial.color = new THREE.Color(0x0000ff); 
      globe.atmosphereColor("#ffffff"); 
      
      globe.hexPolygonColor((e) =>
        highlightedCountries.includes(e.properties.ISO_A3)
          ? "rgba(0, 25, 85, 1)"  
          : "rgba(0, 25, 85, 1)" 
      );
      
    }
  }, [globe, currentTheme]);

  useEffect(() => {
    camera.position.set(0, 4, size.height / 2 + 25);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [globe, size, camera]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y -= 0.01;
    }
  });

  return <primitive object={globe} {...props} ref={globeRef} />;
}


export function Box2(props) {
  const meshRef = useRef()
  const dpr = window.devicePixelRatio;
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const materialRef = useRef()


  const uniforms = useMemo(() => ({
    iTime: { value: 0.0 },
    iTimeDelta: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(1, 1) },
    iMouse: { value: new THREE.Vector3(0, 0, 1) },
    iSampleRate: { value: 44100.0 },
    iDate: { value: new THREE.Vector4(0, 0, 0, 0) },
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
    if (materialRef.current) {
      const { uniforms } = materialRef.current;
      const { elapsedTime } = state.clock;

      uniforms.iTime.value = elapsedTime / 2;
      uniforms.iTimeDelta.value = elapsedTime - uniforms.iTime.value;
      uniforms.iResolution.value.set(
        window.innerWidth * dpr,
        window.innerHeight * dpr,
        1
      );
      uniforms.iMouse.value.set(mouse.x, mouse.y, 1);
    }
    if (!materialRef.current) return
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
          baseMaterial={THREE.MeshBasicMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader2}
          uniforms={uniforms}
        />
        <boxGeometry args={[1.7, 1.7, 1.7]} />
      </mesh>

  )
}


export function TorusKnot(props) {
  
  const meshRef = useRef()
  const dpr = window.devicePixelRatio;
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    iTime: { value: 0.0 },
    iTimeDelta: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(1, 1) },
    iMouse: { value: new THREE.Vector3(0, 0, 1) },
    iSampleRate: { value: 44100.0 },
    iDate: { value: new THREE.Vector4(0, 0, 0, 0) },
    waveFrequency: { value: 9.0 },
    waveAmplitude: { value: 1.0 },
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
    if (materialRef.current) {
      const { uniforms } = materialRef.current;
      const { elapsedTime } = state.clock;

      uniforms.iTime.value = elapsedTime / 4;
      uniforms.iTimeDelta.value = elapsedTime - uniforms.iTime.value;
      uniforms.iResolution.value.set(
        window.innerWidth * 30,
        window.innerHeight * 30,
        1
      );
      uniforms.iMouse.value.set(mouse.x, mouse.y, 1);
    }
    if (!materialRef.current) return
  })


  return (
    <mesh
      {...props}
      ref={meshRef}
      rotation={[0, Math.PI / 4, Math.PI / 8]}
      position={[0, 0, 0.5]}
    >
      <torusKnotGeometry args={[1, 0.4, 90, 20]} />
      <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshBasicMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
    </mesh>
  )
}

