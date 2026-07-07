<script setup lang="ts">
import Background3D from '@/components/Background3D.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="app-root">
    <!-- Canvas 底层：固定全屏，不随页面滚动 -->
    <div id="canvas-container" class="canvas-layer">
      <Background3D />
    </div>

    <!-- DOM 悬浮层：可滚动，背景完全透明 -->
    <div class="dom-overlay">
      <Navbar />
      <main class="flex-1">
        <RouterView />
      </main>
      <footer class="py-8 text-center">
        <p class="text-xs text-white/40">
          © {{ new Date().getFullYear() }} dev.log — Built with Vue 3 + Vite + Tailwind CSS |
          Digital Garden | 98+ Performance
        </p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.app-root {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.canvas-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.dom-overlay {
  position: relative;
  z-index: 0;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: transparent;
}
</style>
