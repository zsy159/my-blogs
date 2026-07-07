export interface PostMeta {
  id: string
  title: string
  date: string
  tags: string[]
  summary: string
  fileName: string
}

export interface Post extends PostMeta {
  content: string
}
