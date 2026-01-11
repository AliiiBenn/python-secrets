import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const fields = (linkNode as any)?.fields
  if (!fields) return '#'

  if (fields?.linkType === 'internal' && fields?.doc) {
    const doc = fields.doc
    if (typeof doc === 'object' && doc?.value) {
      const slug = doc.value.slug
      const relationTo = doc.relationTo

      switch (relationTo) {
        case 'articles':
          return `/articles/${slug}`
        case 'blog':
          return `/blog/${slug}`
        case 'courses':
          return `/courses/${slug}`
        default:
          return `/${relationTo}/${slug}`
      }
    }
  }

  if (fields?.linkType === 'custom' && fields?.url) {
    return fields.url
  }

  return '#'
}
