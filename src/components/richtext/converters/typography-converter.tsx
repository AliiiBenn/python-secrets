import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyAnchor,
  TypographyList,
  TypographyOL,
  TypographyP,
  TypographyInlineCode,
  TypographyStrong,
} from '@/components/ui/typography'
import { CodeBlock, CodeBlockCode } from '@/components/ui/code-block'

function generateId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .substring(0, 50)
}

export const typographyConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const text = Array.isArray(children) ? children.join('') : children
    const id = generateId(text)

    if (node.tag === 'h1') return <TypographyH1 id={id}>{children}</TypographyH1>
    if (node.tag === 'h2') return <TypographyH2 id={id}>{children}</TypographyH2>
    if (node.tag === 'h3') return <TypographyH3 id={id}>{children}</TypographyH3>
    if (node.tag === 'h4') return <TypographyH4 id={id}>{children}</TypographyH4>

    const Tag = node.tag as keyof JSX.IntrinsicElements
    return <Tag id={id}>{text}</Tag>
  },

  paragraph: ({ node, nodesToJSX }) => (
    <TypographyP>{nodesToJSX({ nodes: node.children })}</TypographyP>
  ),

  link: ({ node, nodesToJSX }) => {
    const fields = (node as any)?.fields
    let href = '#'
    if (fields?.linkType === 'internal' && fields?.doc) {
      const doc = fields.doc
      if (typeof doc === 'object' && doc?.value) {
        const slug = doc.value.slug
        const relationTo = doc.relationTo
        href = relationTo ? `/${relationTo}/${slug}` : `/${slug}`
      }
    } else if (fields?.linkType === 'custom' && fields?.url) {
      href = fields.url
    }
    return <TypographyAnchor href={href}>{nodesToJSX({ nodes: node.children })}</TypographyAnchor>
  },

  quote: ({ node, nodesToJSX }) => (
    <TypographyBlockquote>{nodesToJSX({ nodes: node.children })}</TypographyBlockquote>
  ),

  list: ({ node, nodesToJSX }) => {
    const items = nodesToJSX({ nodes: node.children })
    if ((node as any).listType === 'number') {
      return <TypographyOL>{items}</TypographyOL>
    }
    return <TypographyList>{items}</TypographyList>
  },

  listitem: ({ node, nodesToJSX }) => <li>{nodesToJSX({ nodes: node.children })}</li>,

  inlineCode: ({ node, nodesToJSX }) => (
    <TypographyInlineCode>{nodesToJSX({ nodes: node.children })}</TypographyInlineCode>
  ),

  bold: ({ node, nodesToJSX }) => (
    <TypographyStrong>{nodesToJSX({ nodes: node.children })}</TypographyStrong>
  ),

  blocks: {
    Code: ({ node }) => {
      const fields = (node as any)?.fields || {}
      const language = fields.language || 'text'
      const code = fields.code || ''
      const filename = fields.filename

      return (
        <CodeBlock>
          <CodeBlockCode code={code} language={language} filename={filename} />
        </CodeBlock>
      )
    },
  },
}
