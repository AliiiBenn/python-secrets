import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { CodeBlock, CodeBlockCode } from '@/components/ui/code-block'

type CodeBlockNode = SerializedBlockNode<{
  language: string
  code: string
  filename?: string
}>

export const CodeBlockConverter = ({ node }: { node: CodeBlockNode }) => {
  const { language, code, filename } = node.fields

  return (
    <CodeBlock>
      <CodeBlockCode code={code} language={language} filename={filename} />
    </CodeBlock>
  )
}
