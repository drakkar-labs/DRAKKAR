"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HologramDrakkar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 1000);
    camera.position.set(0, 0.2, 6.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lighting for hologram depth
    const ambient = new THREE.AmbientLight(0x4a6bff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0x00e5ff, 1.2);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const rim = new THREE.PointLight(0x7c3aed, 2.5, 12);
    rim.position.set(-2, 1.5, 3);
    scene.add(rim);

    const loader = new THREE.TextureLoader();
    // Hologram source — realistic wooden ship (user provided)
    // Fallback to cinematic if hologram not yet saved
    const texUrl = "/hologram-drakkar.jpg";
    const fallbackUrl = "/hero-drakkar-cinematic.jpg";

    let mesh: THREE.Mesh | null = null;
    let baseGlow: THREE.Mesh | null = null;
    let raf = 0;

    const createHologram = (texture: THREE.Texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const img = texture.image as HTMLImageElement;
      const aspect = (img.width || 1200) / (img.height || 800);
      // Plane sized to match ship: wide sail + hull, 16:10 roughly, scaled to hero
      const h = 3.1;
      const w = h * aspect * 1.05;
      const geo = new THREE.PlaneGeometry(w, h, 48, 48);

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uOpacity: { value: 0.96 },
          uScan: { value: 0.18 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main(){
            vUv = uv;
            vec3 p = position;
            // subtle hull floating + sail breeze
            float t = uTime * 0.55;
            // vertical bob
            p.y += sin(t + uv.x * 2.2) * 0.04;
            // sail wind ripple (top of plane)
            float sail = smoothstep(0.45, 0.92, uv.y);
            p.x += sin(t * 1.2 + uv.y * 8.0) * 0.025 * sail;
            p.z += cos(t * 0.7 + uv.y * 6.0) * 0.02 * sail;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform float uOpacity;
          varying vec2 vUv;

          void main(){
            vec4 tex = texture2D(uTexture, vUv);
            // luminance for mask
            float luma = dot(tex.rgb, vec3(0.2126, 0.7152, 0.0722));
            // discard deep transparent / sky
            float mask = smoothstep(0.12, 0.45, luma) * tex.a;
            // also cut upper sky bleed
            mask *= smoothstep(0.0, 0.12, vUv.y);
            mask *= smoothstep(1.0, 0.82, vUv.y);

            // hologram palette — wood -> cyan/violet shift
            vec3 wood = tex.rgb;
            vec3 cyan = vec3(0.05, 0.9, 1.0);
            vec3 violet = vec3(0.48, 0.38, 0.98);
            vec3 deep = vec3(0.02, 0.08, 0.22);
            // lerp wood to hologram based on luminance + vertical
            float tint = smoothstep(0.2, 0.85, luma);
            vec3 holo = mix(deep, mix(cyan, violet, vUv.y * 0.7 + sin(uTime*0.6+vUv.x*3.0)*0.08), tint);
            // keep wood pattern faint underneath
            vec3 col = mix(holo, wood * 0.35 + holo * 0.65, 0.22);

            // scanlines
            float scan = sin(vUv.y * 720.0 - uTime * 6.0) * 0.5 + 0.5;
            scan = pow(scan, 22.0) * 0.55;
            float scan2 = sin(vUv.y * 420.0 + uTime * 2.5) * 0.5 + 0.5;
            scan2 = smoothstep(0.96, 1.0, scan2) * 0.35;

            // vertical glitch streaks (very subtle)
            float streak = sin(vUv.x * 120.0 + uTime * 1.1) * 0.5 + 0.5;
            streak = pow(streak, 60.0) * step(0.7, luma) * 0.18;

            // fresnel edge glow — distance from center
            vec2 c = vUv - 0.5;
            float dist = length(c * vec2(1.1, 0.9));
            float edge = pow(smoothstep(0.35, 0.72, dist), 1.8) * 0.0; // keep subtle, not rim light
            float hullEdge = smoothstep(0.15, 0.75, luma) * (1.0 - smoothstep(0.55, 0.85, dist));
            float glow = hullEdge * 0.22 + edge;

            // flicker
            float flicker = sin(uTime * 9.0 + vUv.y * 12.0) * 0.03 + 1.0;
            // chromatic micro
            float chrom = sin(uTime * 1.5 + vUv.y * 30.0) * 0.02;

            col += vec3(chrom * 0.5, 0.0, -chrom * 0.5);
            col += scan + scan2 + streak + glow;
            col *= flicker;

            float alpha = mask * uOpacity;
            // fade edges
            alpha *= smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
            // scan alpha mod
            alpha *= 0.78 + scan * 0.22;
            // overall hologram translucency
            alpha *= 0.92;
            // boost alpha where wood is bright (sail patterns, shields)
            alpha *= mix(0.85, 1.15, tint);

            gl_FragColor = vec4(col, alpha);
            // additive: premultiply
            gl_FragColor.rgb *= gl_FragColor.a;
          }
        `,
      });

      mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0.35, 0.05, 0);
      mesh.rotation.y = -0.14;
      mesh.rotation.z = 0.02;
      scene.add(mesh);

      // Base projector glow — elliptical
      const baseGeo = new THREE.CircleGeometry(1.45, 48);
      const baseMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main(){
            vec2 c = vUv - 0.5;
            float d = length(c);
            float ring = smoothstep(0.42, 0.38, d) * smoothstep(0.28, 0.32, d);
            float core = smoothstep(0.5, 0.15, d);
            float pulse = sin(uTime * 1.8) * 0.08 + 0.92;
            vec3 col = vec3(0.0, 0.85, 1.0) * ring * 0.9 + vec3(0.45, 0.35, 1.0) * core * 0.18;
            float alpha = (ring * 0.55 + core * 0.22) * pulse;
            gl_FragColor = vec4(col, alpha);
          }
        `,
      });
      baseGlow = new THREE.Mesh(baseGeo, baseMat);
      baseGlow.rotation.x = -Math.PI / 2;
      baseGlow.position.set(0.35, -1.55, 0.2);
      baseGlow.scale.set(1.3, 0.85, 1);
      scene.add(baseGlow);

      return { mat, baseMat };
    };

    let hologramMats: any = null;

    loader.load(
      texUrl,
      (tex) => {
        hologramMats = createHologram(tex);
        animate();
      },
      undefined,
      () => {
        // fallback to cinematic
        loader.load(fallbackUrl, (tex) => {
          hologramMats = createHologram(tex);
          animate();
        });
      }
    );

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    onResize();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      if (hologramMats) {
        hologramMats.mat.uniforms.uTime.value = t;
        if (hologramMats.baseMat) hologramMats.baseMat.uniforms.uTime.value = t;
      }
      if (mesh) {
        mesh.rotation.y = -0.14 + Math.sin(t * 0.22) * 0.03;
        mesh.position.y = 0.05 + Math.sin(t * 0.45) * 0.04;
      }
      if (baseGlow) {
        baseGlow.rotation.z = t * 0.15;
      }
      // subtle camera drift
      camera.position.x = Math.sin(t * 0.12) * 0.18;
      camera.lookAt(0.2, -0.1, 0);
      renderer.render(scene, camera);
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      scene.traverse((o: any) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m: any) => m.dispose());
          else o.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* volumetric haze under hologram */}
      <div className="absolute left-[48%] right-[8%] bottom-[14%] top-[18%] bg-gradient-to-t from-cyan-500/[0.06] via-transparent to-violet-500/[0.04] blur-2xl pointer-events-none" />
    </div>
  );
}
