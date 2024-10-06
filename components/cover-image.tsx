import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  coverImage: {
    node: {
      sourceUrl: string;
    };
  };
  slug?: string;
}

export default function CoverImage({ title, coverImage, slug }: Props) {
  const image = (
    <Image
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={cn("object-cover shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      fill
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          <div className="relative aspect-w-3 aspect-h-2">
            {image}
          </div>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
