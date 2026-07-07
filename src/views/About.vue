<template>
  <div class="mx-auto max-w-4xl px-4 py-8 pb-16 sm:px-6">
    <section class="mb-12 text-center">
      <div
        class="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-2xl border
               border-gold-light/30 bg-gold-bg font-mono text-4xl font-bold text-gold-light
               shadow-lg shadow-gold-light/10 backdrop-blur-sm"
      >
        &lt;/&gt;
      </div>
      <h1 class="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        极客开发者
      </h1>
      <p class="mb-4 text-sm font-medium text-gold-light">
        Full-Stack Engineer · AI Automation Enthusiast
      </p>
      <p class="mx-auto max-w-2xl leading-relaxed text-white/60">
        热爱用代码解决问题，痴迷于自动化与工程效率。专注于 Vue 生态、Node.js 后端
        以及 AI Agent 工作流的实践与探索。相信好的架构应该是简单而优雅的。
      </p>

      <div class="mt-6 flex items-center justify-center gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card flex h-11 w-11 items-center justify-center text-white/50
                 transition-all hover:text-gold-light"
          :title="link.name"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path :d="link.icon" />
          </svg>
        </a>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="mb-5 flex items-center gap-2 text-xl font-semibold text-white">
        <span class="font-mono text-gold-light">const</span>
        techStack =
      </h2>
      <div class="glass-card grid gap-5 p-7 sm:grid-cols-2">
        <div v-for="tech in techStack" :key="tech.name" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-white/90">{{ tech.name }}</span>
            <span class="text-xs text-white/40">{{ tech.level }}%</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              class="h-full rounded-full transition-all duration-1000"
              :class="tech.color"
              :style="{ width: `${tech.level}%` }"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="mb-5 flex items-center gap-2 text-xl font-semibold text-white">
        <span class="font-mono text-gold-light">//</span>
        经历
      </h2>
      <div class="space-y-4">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="glass-card flex flex-col gap-2 p-6 sm:flex-row sm:gap-6"
        >
          <time class="shrink-0 text-xs font-medium text-gold-light sm:w-32 sm:pt-1">
            {{ exp.period }}
          </time>
          <div>
            <h3 class="mb-1 text-sm font-semibold text-white">{{ exp.role }}</h3>
            <p class="text-sm leading-relaxed text-white/60">{{ exp.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="glass-card border-gold-light/10 p-8 text-center">
      <blockquote class="text-sm italic leading-relaxed text-white/60">
        "Talk is cheap. Show me the code."
      </blockquote>
      <p class="mt-3 text-xs text-white/40">— Linus Torvalds</p>
    </section>
  </div>
</template>

<script setup lang="ts">
const techStack = [
  { name: 'Vue 3', level: 95, color: 'bg-emerald-500' },
  { name: 'TypeScript', level: 90, color: 'bg-blue-500' },
  { name: 'Node.js', level: 88, color: 'bg-green-600' },
  { name: 'Vite', level: 92, color: 'bg-violet-500' },
  { name: 'Tailwind CSS', level: 85, color: 'bg-sky-500' },
  { name: 'AI Agent', level: 80, color: 'bg-amber-500' },
]

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.125-.585-2.25-.195-2.85.12-.915.465-1.74.63-2.64.315-1.005-.345-1.77-.96-2.685-2.205-1.455-2.025-2.1-4.755-1.395-6.75.405-1.125 1.41-2.04 2.655-2.52 1.23-.465 2.55-.36 3.75.12 1.005.405 1.86 1.065 2.55 1.86.69-.795 1.545-1.455 2.55-1.86 1.2-.48 2.52-.585 3.75-.12 1.245.48 2.25 1.395 2.655 2.52.705 1.995.06 4.725-1.395 6.75-.915 1.245-1.68 1.86-2.685 2.205-.9.315-1.725.15-2.64-.315-.6-.315-1.725-.705-2.85-.12-.51.285-1.095 1.35-1.23 1.695-.24.675-1.02 1.965-4.035 1.41 0 1.005-.015 1.95-.015 2.235 0 .315.225.675.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
  },
  {
    name: 'Email',
    url: 'mailto:hello@example.com',
    icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
]

const experiences = [
  {
    period: '2024 — 至今',
    role: '全栈工程师 / AI 自动化',
    desc: '构建 AI Agent 工作流，探索 LLM 辅助开发与自动化运维。',
  },
  {
    period: '2022 — 2024',
    role: '前端架构师',
    desc: '主导 Vue 3 微前端架构迁移，设计组件库与工程化体系。',
  },
  {
    period: '2020 — 2022',
    role: '高级前端开发',
    desc: '负责中大型 SPA 应用开发与性能优化，推动 TypeScript 全面落地。',
  },
]
</script>
