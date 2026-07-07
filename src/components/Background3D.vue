<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const PARTICLE_COUNT = 15_000
const SPREAD = 500
// 屏幕空间判定半径（NDC 坐标，0~1 量级；约 0.12 ≈ 屏幕宽度 12%）
const SCREEN_INFLUENCE_RADIUS = 0.12
const SCREEN_INFLUENCE_RADIUS_SQ = SCREEN_INFLUENCE_RADIUS * SCREEN_INFLUENCE_RADIUS
const ATTRACT_LERP_MAX = 0.3
const RECOVERY_LERP = 0.035
const MOUSE_IDLE_MS = 120

const CYAN = new THREE.Color(0x00ffcc)
const GOLD = new THREE.Color(0xffd700)

const containerRef = useTemplateRef<HTMLDivElement>('container')

let animationId = 0
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let particles: THREE.Points | null = null
let hitPlane: THREE.Mesh | null = null
let positionAttr: THREE.BufferAttribute | null = null
let basePositions: Float32Array | null = null

let resizeHandler: (() => void) | null = null
let mouseMoveHandler: ((e: MouseEvent) => void) | null = null
let mouseLeaveHandler: (() => void) | null = null

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const mouseWorld = new THREE.Vector3()
const mouseLocal = new THREE.Vector3()
const worldPos = new THREE.Vector3()

let mouseActive = false
let lastMouseMove = 0

function createParticleSystem(): THREE.Points {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() * 2 - 1) * SPREAD
    positions[i3 + 1] = (Math.random() * 2 - 1) * SPREAD
    positions[i3 + 2] = (Math.random() * 2 - 1) * SPREAD

    const color = Math.random() < 0.7 ? CYAN : GOLD
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  basePositions = new Float32Array(positions)

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute(
    'basePosition',
    new THREE.BufferAttribute(new Float32Array(basePositions), 3),
  )

  positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute

  const material = new THREE.PointsMaterial({
    size: 2.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  })

  return new THREE.Points(geometry, material)
}

function updateMouseLocal(): boolean {
  if (!camera || !particles || !hitPlane) return false

  hitPlane.quaternion.copy(camera.quaternion)

  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObject(hitPlane)
  if (hits.length === 0) return false

  mouseWorld.copy(hits[0].point)
  mouseLocal.copy(mouseWorld)
  particles.worldToLocal(mouseLocal)
  return true
}

function applyMagneticField(active: boolean): void {
  if (!positionAttr || !basePositions || !particles || !camera) return

  particles.updateMatrixWorld()

  const posArr = positionAttr.array as Float32Array
  const matrix = particles.matrixWorld
  const mx = mouseLocal.x
  const my = mouseLocal.y
  const mz = mouseLocal.z
  const px = pointer.x
  const py = pointer.y

  for (let i3 = 0; i3 < posArr.length; i3 += 3) {
    const bx = basePositions[i3]
    const by = basePositions[i3 + 1]
    const bz = basePositions[i3 + 2]

    let cx = posArr[i3]
    let cy = posArr[i3 + 1]
    let cz = posArr[i3 + 2]

    if (active) {
      // 用屏幕投影距离判定，而非纯 3D 距离——避免深度差导致"视觉在鼠标下却不吸附"
      worldPos.set(cx, cy, cz)
      worldPos.applyMatrix4(matrix)
      worldPos.project(camera)

      const sdx = worldPos.x - px
      const sdy = worldPos.y - py
      const screenDistSq = sdx * sdx + sdy * sdy

      if (screenDistSq < SCREEN_INFLUENCE_RADIUS_SQ) {
        const screenDist = Math.sqrt(screenDistSq)
        const strength = 1 - screenDist / SCREEN_INFLUENCE_RADIUS
        const lerpFactor = strength * strength * ATTRACT_LERP_MAX
        cx += (mx - cx) * lerpFactor
        cy += (my - cy) * lerpFactor
        cz += (mz - cz) * lerpFactor
      } else {
        cx += (bx - cx) * RECOVERY_LERP
        cy += (by - cy) * RECOVERY_LERP
        cz += (bz - cz) * RECOVERY_LERP
      }
    } else {
      cx += (bx - cx) * RECOVERY_LERP
      cy += (by - cy) * RECOVERY_LERP
      cz += (bz - cz) * RECOVERY_LERP
    }

    posArr[i3] = cx
    posArr[i3 + 1] = cy
    posArr[i3 + 2] = cz
  }

  positionAttr.needsUpdate = true
}

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    3000,
  )
  camera.position.z = 900

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  container.appendChild(renderer.domElement)

  hitPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }),
  )
  scene.add(hitPlane)

  particles = createParticleSystem()
  scene.add(particles)

  mouseMoveHandler = (event: MouseEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    mouseActive = true
    lastMouseMove = performance.now()
  }

  mouseLeaveHandler = () => {
    mouseActive = false
  }

  window.addEventListener('mousemove', mouseMoveHandler)
  window.addEventListener('mouseleave', mouseLeaveHandler)

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    if (particles) {
      particles.rotation.y += 0.0003
      particles.rotation.x += 0.00015
    }

    const isIdle = performance.now() - lastMouseMove > MOUSE_IDLE_MS
    const magneticActive = mouseActive && !isIdle && updateMouseLocal()
    applyMagneticField(magneticActive)

    renderer!.render(scene!, camera!)
  }
  animate()

  resizeHandler = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)

  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
  if (mouseLeaveHandler) window.removeEventListener('mouseleave', mouseLeaveHandler)

  if (hitPlane) {
    hitPlane.geometry.dispose()
    ;(hitPlane.material as THREE.Material).dispose()
    hitPlane = null
  }

  if (particles) {
    particles.geometry.dispose()
    ;(particles.material as THREE.Material).dispose()
    particles = null
  }

  renderer?.dispose()
  if (containerRef.value) containerRef.value.innerHTML = ''

  renderer = null
  scene = null
  camera = null
  positionAttr = null
  basePositions = null
})
</script>

<template>
  <div ref="container" class="background-3d" />
</template>

<style scoped>
.background-3d {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
