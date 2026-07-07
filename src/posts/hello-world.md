# Hello World — 极客博客启航

欢迎来到我的个人技术博客！这是基于 **Vue 3 + Vite + TypeScript** 构建的轻量化 Markdown 博客系统。

## 为什么选择本地 Markdown 方案？

> 没有数据库，没有服务器压力，只有纯粹的文本与代码。  
> 每一篇文章都是一个 `.md` 文件，版本可控，迁移自由。

核心优势：

- **零后端依赖** — 文章即文件，Git 即 CMS
- **极速构建** — Vite 原生 ESM + 动态 glob 索引
- **类型安全** — 全链路 TypeScript 类型定义

## 代码示例

下面是一个简单的 `usePosts` composable 调用示例：

```typescript
import { usePosts } from '@/composables/usePosts'

const { getPostList, getPostById } = usePosts()

const posts = getPostList()
const post = await getPostById('1')
console.log(post?.title)
```

## Shell 命令

```bash
npm install
npm run dev
```

---

*Stay curious. Stay geek.* 🚀
