import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'

import { typographyConverter } from './typography-converter'
import { internalDocToHref } from './internal-link'

type NodeTypes = DefaultNodeTypes

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...typographyConverter,
})
