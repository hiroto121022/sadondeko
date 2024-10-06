export default function PostTitle({ children }) {
  return (
    <h1
      className="text-4xl md:text-xl lg:text-5xl font-bold tracking-tighter leading-tight pt-4 md:leading-none mb-12 text-center md:text-left"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
