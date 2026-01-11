import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from './converters'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText({ data, className, ...rest }: Props) {
  return (
    <div className={className}>
      <RichTextConverter {...rest} data={data} converters={jsxConverter} />
    </div>
  )
}
