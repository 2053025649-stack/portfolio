interface ProjectBodyProps {
  contentHtml: string
}

export default function ProjectBody({ contentHtml }: ProjectBodyProps) {
  return (
    <div
      className="prose-invert max-w-3xl mx-auto py-10 md:py-14"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}
