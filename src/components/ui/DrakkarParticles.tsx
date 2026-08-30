"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Faithful port of https://github.com/brunoimbrizi/interactive-particles
// Adapted for DRAKKAR LABS — Drakkar silhouette generated procedurally into a CanvasTexture
// Uses InstancedBufferGeometry + RawShaderMaterial + TouchTexture trail (shader displacement)

// --- easing (same as src/utils/easing.utils.js) ---
function easeOutSine(t: number, b: number, c: number, d: number) {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
}

// --- TouchTexture (src/scripts/webgl/particles/TouchTexture.js) ---
class TouchTexture {
  size = 64;
  maxAge = 120;
  radius = 0.15;
  trail: { x: number; y: number; age: number; force: number }[] = [];
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  texture!: THREE.Texture;

  constructor() {
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new THREE.Texture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
  }

  update() {
    this.clear();
    // age and cull
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i];
      p.age++;
      if (p.age > this.maxAge) this.trail.splice(i, 1);
    }
    for (const p of this.trail) this.drawTouch(p);
    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point: { x: number; y: number }) {
    let force = 0;
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
    }
    this.trail.push({ x: point.x, y: point.y, age: 0, force });
  }

  drawTouch(point: { x: number; y: number; age: number; force: number }) {
    const pos = {
      x: point.x * this.size,
      y: (1 - point.y) * this.size,
    };
    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = easeOutSine(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
    }
    intensity *= point.force;
    const radius = this.size * this.radius * intensity;
    const grd = this.ctx.createRadialGradient(pos.x, pos.y, radius * 0.25, pos.x, pos.y, radius);
    grd.addColorStop(0, "rgba(255, 255, 255, 0.2)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");
    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// --- generate Drakkar silhouette — premium cinematic version (matches hero-drakkar-cinematic.jpg) ---
function createDrakkarCanvas(w = 900, h = 380): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // --- HULL: long, low, sleek — like the reference (dark wood/metal but for particles we keep white for density) ---
  // Main hull volume — lower keel + upper sheer
  ctx.beginPath();
  ctx.moveTo(82, 212); // stern top
  ctx.bezierCurveTo(145, 208, 260, 202, 360, 200); // mid top edge (slight sheer)
  ctx.bezierCurveTo(480, 198, 580, 195, 642, 188); // bow deck
  ctx.bezierCurveTo(658, 186, 682, 180, 702, 162); // dragon neck rise
  ctx.bezierCurveTo(694, 172, 680, 178, 666, 186); // back of neck
  ctx.bezierCurveTo(645, 205, 640, 218, 640, 218); // bow stem down
  ctx.bezierCurveTo(580, 245, 520, 268, 410, 270); // keel belly (lowest point)
  ctx.bezierCurveTo(280, 270, 150, 260, 84, 228); // stern run
  ctx.closePath();
  ctx.fill();

  // Hull planks — 5 horizontal streaks for wood/metal segmentation (adds particle density variation)
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 1.1;
  for (let p = 0; p < 5; p++) {
    const y = 214 + p * 9;
    ctx.beginPath();
    ctx.moveTo(100, y);
    ctx.bezierCurveTo(240, y + 6, 420, y + 8, 620, y - 2);
    ctx.stroke();
  }

  // Blue light strips along hull (reference: 2 electric strips) — brighter white so particles there are larger
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3.2;
  ctx.shadowColor = "rgba(255,255,255,0.9)";
  ctx.shadowBlur = 0;
  // lower strip (long)
  ctx.beginPath();
  ctx.moveTo(170, 238);
  ctx.bezierCurveTo(320, 252, 480, 254, 620, 236);
  ctx.stroke();
  // upper strip (shorter, near waterline)
  ctx.beginPath();
  ctx.moveTo(520, 228);
  ctx.bezierCurveTo(560, 226, 600, 224, 640, 222);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // --- DRAGON HEAD: more sculpted, premium ---
  // Neck column with scales suggestion
  ctx.beginPath();
  ctx.moveTo(702, 162);
  ctx.bezierCurveTo(718, 142, 728, 124, 714, 106); // snout tip up
  ctx.bezierCurveTo(708, 116, 703, 128, 698, 140); // upper jaw
  ctx.bezierCurveTo(690, 130, 682, 118, 666, 112); // crest/horn
  ctx.bezierCurveTo(674, 120, 680, 134, 686, 146); // crest back
  ctx.bezierCurveTo(678, 148, 670, 152, 664, 162); // lower jaw
  ctx.bezierCurveTo(672, 168, 686, 172, 695, 168); // throat
  ctx.closePath();
  ctx.fill();
  // Eye — small cutout for highlight (will be a hole? keep white, eye will be bright particle)
  // Nostril detail
  ctx.fillStyle = "rgba(255,255,255,0.98)";
  ctx.beginPath();
  ctx.arc(710, 122, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";

  // Stern tail — more elegant, higher curl
  ctx.beginPath();
  ctx.moveTo(82, 212);
  ctx.bezierCurveTo(64, 198, 48, 176, 58, 148);
  ctx.bezierCurveTo(62, 162, 68, 178, 80, 190);
  ctx.bezierCurveTo(72, 194, 64, 200, 82, 212);
  ctx.closePath();
  ctx.fill();
  // stern post detail
  ctx.fillRect(58 - 2, 148 - 14, 4, 28);

  // --- SHIELDS: 10 along hull, with rim — like reference (round shields on side) ---
  const shieldY = 221;
  for (let i = 0; i < 10; i++) {
    const sx = 142 + i * 50;
    // outer
    ctx.beginPath();
    ctx.arc(sx, shieldY, 15, 0, Math.PI * 2);
    ctx.fill();
    // inner boss (slightly smaller, creates double ring when sampled — but keep white for density)
    // we keep solid for particle density; rim effect will come from spacing
  }

  // --- MAST + RIGGING ---
  ctx.fillRect(384 - 3.5, 52, 7, 168); // mast
  // yard (horizontal at top of sail)
  ctx.fillRect(368, 62, 182, 3);
  // rigging lines mast→hull
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(384, 62);
  ctx.lineTo(200, 202);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(384, 62);
  ctx.lineTo(580, 196);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(384, 85);
  ctx.lineTo(580, 196);
  ctx.stroke();

  // --- SAIL: large, dark but for particles we keep white; add emblem ---
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(384, 58); // top yard
  ctx.lineTo(552, 66); // top leech
  ctx.bezierCurveTo(558, 108, 546, 158, 518, 202); // leech curve
  ctx.lineTo(384, 202); // foot to mast
  ctx.bezierCurveTo(394, 142, 390, 92, 384, 58);
  ctx.closePath();
  ctx.fill();

  // Sail emblem — hexagonal tech emblem like reference (center of sail, faint but dense)
  const ex = 466;
  const ey = 132;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.4;
  // outer hexagon
  for (let r = 0; r < 3; r++) {
    const rad = 34 - r * 9;
    ctx.beginPath();
    for (let a = 0; a < 6; a++) {
      const ang = (Math.PI / 3) * a - Math.PI / 6;
      const x = ex + Math.cos(ang) * rad;
      const y = ey + Math.sin(ang) * rad;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  // inner diamond
  ctx.beginPath();
  ctx.moveTo(ex, ey - 14);
  ctx.lineTo(ex + 12, ey);
  ctx.lineTo(ex, ey + 14);
  ctx.lineTo(ex - 12, ey);
  ctx.closePath();
  ctx.stroke();
  // horizontal tech lines inside emblem
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(ex - 22, ey - 6);
  ctx.lineTo(ex + 22, ey - 6);
  ctx.moveTo(ex - 22, ey + 6);
  ctx.lineTo(ex + 22, ey + 6);
  ctx.stroke();

  // Sail wind folds — 4 subtle curves
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 1;
  for (let k = 0; k < 4; k++) {
    const y = 84 + k * 26;
    ctx.beginPath();
    ctx.moveTo(384, y);
    ctx.bezierCurveTo(420, y + 4, 490, y + 6, 548, y - 1);
    ctx.stroke();
  }

  // --- OARS: 8, more slender, with correct perspective ---
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.6;
  for (let i = 0; i < 8; i++) {
    const ox = 168 + i * 54;
    const oy = 232;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    // oar blade extends outward/down with slight curve
    ctx.lineTo(ox - 20, oy + 28 + Math.sin(i * 0.9) * 3);
    ctx.stroke();
    // oarlock
    ctx.fillRect(ox - 2.5, oy - 3, 5, 6);
  }

  // --- WATERLINE + mist base (adds low dense particles for reflection) ---
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(72, 260, 648, 2.5);
  // mist puff under hull (adds soft dense base)
  const grad = ctx.createRadialGradient(380, 262, 10, 380, 262, 180);
  grad.addColorStop(0, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(380, 262, 180, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

// --- shaders (verbatim from src/shaders/* with inlined snoise) ---
const vertexShader = `
precision highp float;

attribute float pindex;
attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute float angle;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform sampler2D uTouch;

varying vec2 vPUv;
varying vec2 vUv;

// glsl-noise simplex 2d (hughsk) — inlined
vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec2 mod289(vec2 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float random(float n){ return fract(sin(n) * 43758.5453123); }

void main(){
  vUv = uv;
  vec2 puv = offset.xy / uTextureSize;
  vPUv = puv;

  vec4 colA = texture2D(uTexture, puv);
  float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;

  vec3 displaced = offset;
  displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
  float rndz = (random(pindex) + snoise(vec2(pindex * 0.1, uTime * 0.1)));
  displaced.z += rndz * (random(pindex) * 2.0 * uDepth);
  displaced.xy -= uTextureSize * 0.5;

  float t = texture2D(uTouch, puv).r;
  displaced.z += t * 20.0 * rndz;
  displaced.x += cos(angle) * t * 20.0 * rndz;
  displaced.y += sin(angle) * t * 20.0 * rndz;

  float psize = (snoise(vec2(uTime, pindex) * 0.5) + 2.0);
  psize *= max(grey, 0.2);
  psize *= uSize;

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  mvPosition.xyz += position * psize;
  vec4 finalPosition = projectionMatrix * mvPosition;
  gl_Position = finalPosition;
}
`;

const fragmentShader = `
precision highp float;
uniform sampler2D uTexture;
varying vec2 vPUv;
varying vec2 vUv;
void main(){
  vec4 color = vec4(0.0);
  vec2 uv = vUv;
  vec2 puv = vPUv;
  vec4 colA = texture2D(uTexture, puv);
  float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
  vec4 colB = vec4(grey, grey, grey, 1.0);
  float border = 0.3;
  float radius = 0.5;
  float dist = radius - distance(uv, vec2(0.5));
  float t = smoothstep(0.0, border, dist);
  color = colB;
  color.a = t;
  gl_FragColor = color;
}
`;

export default function DrakkarParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // --- scene ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 700);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- generate Drakkar texture ---
    const isMobile = window.innerWidth < 768;
    const texW = 900;
    const texH = 380;
    const drakkarCanvas = createDrakkarCanvas(texW, texH);
    const drakkarTexture = new THREE.CanvasTexture(drakkarCanvas);
    drakkarTexture.minFilter = THREE.LinearFilter;
    drakkarTexture.magFilter = THREE.LinearFilter;
    // important: flipY false because we drew with top-left origin and shader expects puv = offset.xy / size
    // Our canvas is already top-left, but original code does ctx.scale(1,-1) then drawImage flipped.
    // We keep as-is (no flip) and shader's offset.y is bottom-origin? Original offset is x%width, floor(y/width) from top=0.
    // We'll keep identical to original: offset.y = floor(i/width) where y=0 is top, and puv = offset.xy / size, so puv.y 0=top, 1=bottom.
    // Texture sampling with CanvasTexture default flipY true would invert. Set flipY false to keep consistent.
    drakkarTexture.flipY = false;

    const width = texW;
    const height = texH;

    // --- initPoints (discard) ---
    const numPoints = width * height;
    let numVisible = 0;
    const threshold = 34;
    // read canvas data
    const ctx2d = drakkarCanvas.getContext("2d", { willReadFrequently: true })!;
    const imgData = ctx2d.getImageData(0, 0, width, height).data;
    const originalColors = new Uint8Array(imgData); // keep as Uint8Array, only need R channel

    for (let i = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] > threshold) numVisible++;
    }

    // cap for mobile if still huge — keep Bruno's density but limit to avoid 300k points
    // Bruno's 320x180 = 57k total, visible ~30k. Our 900x380 = 342k total, visible ~ maybe 40k — too many for instanced quads.
    // We downsample by skipping every Nth visible point to keep < 12k instances (good perf)
    const MAX_VISIBLE = isMobile ? 8500 : 14500;
    let stride = 1;
    if (numVisible > MAX_VISIBLE) stride = Math.ceil(numVisible / MAX_VISIBLE);

    // Recompute with stride: we will collect then stride-sample
    const allOffsets: number[] = [];
    const allIndices: number[] = [];
    for (let i = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] <= threshold) continue;
      allOffsets.push(i % width, Math.floor(i / width));
      allIndices.push(i);
    }
    // stride sample
    const offsetsArr: number[] = [];
    const indicesArr: number[] = [];
    for (let k = 0; k < allIndices.length; k += stride) {
      offsetsArr.push(allOffsets[k * 2], allOffsets[k * 2 + 1]);
      indicesArr.push(allIndices[k]);
    }
    numVisible = indicesArr.length;

    const uniforms: Record<string, THREE.IUniform> = {
      uTime: { value: 0 },
      uRandom: { value: 1.8 },
      uDepth: { value: 3.2 },
      uSize: { value: 1.25 },
      uTextureSize: { value: new THREE.Vector2(width, height) },
      uTexture: { value: drakkarTexture },
      uTouch: { value: null as unknown as THREE.Texture },
    };

    // Touch texture
    const touch = new TouchTexture();
    uniforms.uTouch.value = touch.texture;

    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      transparent: true,
    });

    const geometry = new THREE.InstancedBufferGeometry();

    const positions = new THREE.BufferAttribute(new Float32Array([-0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0]), 3);
    geometry.setAttribute("position", positions);
    const uvs = new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), 2);
    geometry.setAttribute("uv", uvs);
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let j = 0; j < numVisible; j++) {
      offsets[j * 3 + 0] = offsetsArr[j * 2];
      offsets[j * 3 + 1] = offsetsArr[j * 2 + 1];
      offsets[j * 3 + 2] = 0;
      indices[j] = indicesArr[j];
      angles[j] = Math.random() * Math.PI;
    }

    geometry.setAttribute("pindex", new THREE.InstancedBufferAttribute(indices, 1, false));
    geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3, false));
    geometry.setAttribute("angle", new THREE.InstancedBufferAttribute(angles, 1, false));

    const mesh = new THREE.Mesh(geometry, material);
    // scale to fit viewport — same as Particles.resize()
    const fovHeight = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * Math.abs(camera.position.z);
    const scale = fovHeight / height;
    mesh.scale.set(scale, scale, 1);

    const hitArea = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 1, 1), new THREE.MeshBasicMaterial({ visible: false, depthTest: false }));
    (hitArea.material as THREE.Material).visible = false;
    hitArea.scale.set(scale, scale, 1);

    const group = new THREE.Group();
    group.add(mesh);
    group.add(hitArea);
    scene.add(group);

    // slight tilt to feel more cinematic (match hero image angle)
    group.rotation.z = -0.02;

    // --- interactivity (raycaster) ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(hitArea);
      if (intersects[0] && (intersects[0] as THREE.Intersection).uv) {
        touch.addTouch((intersects[0] as THREE.Intersection).uv as THREE.Vector2);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(hitArea);
      if (intersects[0] && (intersects[0] as THREE.Intersection).uv) {
        touch.addTouch((intersects[0] as THREE.Intersection).uv as THREE.Vector2);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // --- resize ---
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      // rescale
      const newFovH = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * Math.abs(camera.position.z);
      const s = newFovH / height;
      mesh.scale.set(s, s, 1);
      hitArea.scale.set(s, s, 1);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    onResize();

    // --- intro tween (replace TweenLite) ---
    let intro = 0;
    uniforms.uRandom.value = 5.0;
    uniforms.uDepth.value = 38.0;
    uniforms.uSize.value = 0.0;

    let raf = 0;
    let last = performance.now();
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (intro < 1) {
        intro = Math.min(1, intro + delta * 0.48);
        const t = 1 - Math.pow(1 - intro, 3);
        uniforms.uRandom.value = 5.0 + (1.8 - 5.0) * t;
        uniforms.uDepth.value = 38.0 + (3.2 - 38.0) * t;
        uniforms.uSize.value = 0.4 + (1.25 - 0.4) * t;
      }

      uniforms.uTime.value += delta;
      touch.update();
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      geometry.dispose();
      material.dispose();
      drakkarTexture.dispose();
      touch.texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse 85% 70% at 50% 42%, transparent 38%, rgba(5,8,22,0.42) 68%, #050816 92%)" }} />
    </div>
  );
}
