<script setup lang="ts">
/**
 * Giscus 评论系统集成预留
 *
 * 接入步骤：
 * 1. 在 GitHub 仓库 Settings → General → Features 中启用 Discussions
 * 2. 访问 https://giscus.app 完成配置，获取 repo、repoId、category、categoryId
 * 3. 安装依赖：npm install @giscus/vue
 * 4. 取消下方注释并填入你的配置参数
 *
 * <Giscus
 *   repo="your-username/your-repo"
 *   repo-id="R_xxxxxxxx"
 *   category="Announcements"
 *   category-id="DIC_xxxxxxxx"
 *   mapping="pathname"
 *   reactions-enabled="1"
 *   emit-metadata="0"
 *   input-position="top"
 *   theme="dark"
 *   lang="zh-CN"
 *   crossorigin="anonymous"
 * />
 */
</script>

<template>
  <section class="mt-16 border-t border-white/10 pt-10">
    <h3 class="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
      <span class="font-mono text-gold-light">//</span>
      评论
    </h3>

    <div
      class="flex flex-col items-center justify-center rounded-xl border border-dashed
             border-white/10 bg-black/10 px-6 py-12 text-center backdrop-blur-sm"
    >
      <div class="mb-4 font-mono text-3xl text-white/20">/* */</div>
      <p class="mb-2 text-sm text-white/60">Giscus 评论系统待接入</p>
      <p class="max-w-md text-xs leading-relaxed text-white/40">
        基于 GitHub Discussions 的轻量评论方案，零后端、零数据库。
        请查看 <code class="text-gold-light">Comment.vue</code> 中的配置注释完成集成。
      </p>
    </div>
  </section>
</template>
