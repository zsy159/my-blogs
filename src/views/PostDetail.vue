<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Comment from '@/components/Comment.vue'
import { usePosts } from '@/composables/usePosts'
import type { Post } from '@/types/post'
import { renderMarkdown } from '@/utils/markdown'
import 'highlight.js/styles/github-dark.css'

const route = useRoute()
const router = useRouter()
const { getPostById } = usePosts()

const post = ref<Post | null>(null)
const loading = ref(true)

const renderedHtml = computed(() => {
  if (!post.value) return ''
  return renderMarkdown(post.value.content)
})

async function loadPost(id: string) {
  loading.value = true
  const result = await getPostById(id)
  if (!result) {
    router.replace('/')
    return
  }
  post.value = result
  loading.value = false
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  loadPost(route.params.id as string)
})

watch(
  () => route.params.id,
  (id) => {
    if (id) loadPost(id as string)
  },
)
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8 pb-16 sm:px-6">
    <RouterLink
      to="/"
      class="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors
             hover:text-gold-light"
    >
      ← 返回首页
    </RouterLink>

    <div v-if="loading" class="flex items-center justify-center py-32">
      <div class="text-sm text-white/50">
        <span class="text-gold-light">▋</span> loading...
      </div>
    </div>

    <article v-else-if="post" class="glass-card p-7 sm:p-10">
      <header class="mb-10 border-b border-white/10 pb-8">
        <h1 class="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {{ post.title }}
        </h1>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time class="text-sm text-white/40">{{ formatDate(post.date) }}</time>
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="glass-tag pointer-events-none py-1 text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <div class="prose-geek" v-html="renderedHtml" />

      <Comment />
    </article>
  </div>
</template>
