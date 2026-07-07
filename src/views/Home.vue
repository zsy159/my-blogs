<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePosts } from '@/composables/usePosts'
import type { PostMeta } from '@/types/post'

const { getPostList, getAllTags } = usePosts()

const activeTag = ref<string | null>(null)
const allPosts = getPostList()
const allTags = getAllTags()

const filteredPosts = computed<PostMeta[]>(() => {
  if (!activeTag.value) return allPosts
  return allPosts.filter((post) => post.tags.includes(activeTag.value!))
})

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
    <!-- Hero -->
    <section class="mb-14 text-center">
      <h1 class="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
        极客技术博客
      </h1>
      <p class="mx-auto max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
        记录代码、架构与 AI 自动化的探索之旅。本地 Markdown 驱动，无后端，极客专享。
      </p>
    </section>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      <!-- Tags Cloud -->
      <aside class="md:col-span-1">
        <div class="glass-card p-6 md:sticky md:top-28">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="flex items-center gap-1.5 text-sm font-semibold text-white">
              <span class="text-gold-light">#</span>
              标签筛选
            </h2>
            <span class="text-xs text-white/40">
              {{ filteredPosts.length }} / {{ allPosts.length }} 篇文章
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              class="glass-tag"
              :class="{ 'glass-tag-active': activeTag === null }"
              @click="activeTag = null"
            >
              全部
            </button>
            <button
              v-for="tag in allTags"
              :key="tag"
              class="glass-tag"
              :class="{ 'glass-tag-active': activeTag === tag }"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </aside>

      <!-- Post List -->
      <main class="min-w-0 md:col-span-2">
        <div v-if="filteredPosts.length === 0" class="glass-card p-12 text-center">
          <p class="text-white/50">暂无匹配文章</p>
        </div>

        <div v-else class="space-y-5">
          <RouterLink
            v-for="post in filteredPosts"
            :key="post.id"
            :to="`/post/${post.id}`"
            class="glass-card group block p-7 sm:p-8"
          >
            <h2
              class="mb-4 text-xl font-bold tracking-tight text-white transition-colors
                     group-hover:text-gold-light sm:text-2xl"
            >
              {{ post.title }}
            </h2>

            <div class="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <time class="text-sm text-white/40">{{ formatDate(post.date) }}</time>
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-sm text-gold-light"
              >
                #{{ tag }}
              </span>
            </div>

            <p class="mb-5 line-clamp-2 text-sm leading-relaxed text-white/55 sm:text-base">
              {{ post.summary }}
            </p>

            <p
              class="text-sm font-medium text-gold-light transition-colors group-hover:text-gold-light/80"
            >
              阅读全文 →
            </p>
          </RouterLink>
        </div>
      </main>
    </div>
  </div>
</template>
