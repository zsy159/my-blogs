import postsIndex from '@/posts.json'
import type { Post, PostMeta } from '@/types/post'

const markdownModules = import.meta.glob<string>('../posts/*.md', {
  query: '?raw',
  import: 'default',
})

function getMarkdownLoader(fileName: string): (() => Promise<string>) | undefined {
  const key = Object.keys(markdownModules).find((path) => path.endsWith(`/${fileName}`))
  return key ? markdownModules[key] : undefined
}

export function usePosts() {
  const getPostList = (): PostMeta[] => {
    return [...postsIndex].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  }

  const getPostById = async (id: string): Promise<Post | null> => {
    const meta = postsIndex.find((post) => post.id === id)
    if (!meta) return null

    const loader = getMarkdownLoader(meta.fileName)
    if (!loader) return null

    const content = await loader()
    return { ...meta, content }
  }

  const getAllTags = (): string[] => {
    const tagSet = new Set<string>()
    postsIndex.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }

  return { getPostList, getPostById, getAllTags }
}
