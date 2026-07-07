<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: '首页', path: '/' },
  { name: '关于', path: '/about' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/5 bg-black/10 backdrop-blur-sm"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <RouterLink to="/" class="group flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-light/30
                 bg-gold-bg font-mono text-sm font-bold text-gold-light transition-colors
                 group-hover:border-gold-light/50 group-hover:bg-gold-bg-active"
        >
          &gt;_
        </div>
        <div>
          <p class="text-base font-bold tracking-tight text-white">dev.log</p>
          <p class="text-xs text-white/40">Technical Blog</p>
        </div>
      </RouterLink>

      <div class="flex flex-col items-end gap-2">
        <ul class="flex items-center gap-2">
          <li v-for="item in navItems" :key="item.path">
            <RouterLink
              :to="item.path"
              class="nav-pill"
              :class="isActive(item.path) ? 'nav-pill-active' : 'nav-pill-inactive'"
            >
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
        <div
          class="flex items-center gap-1.5 rounded-full border border-white/5 bg-black/10
                 px-3 py-1 backdrop-blur-sm"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-status-green" />
          <span class="font-mono text-[10px] text-white/50">system.online</span>
        </div>
      </div>
    </nav>
  </header>
</template>
