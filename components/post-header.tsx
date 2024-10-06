import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "./categories";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-1256 mx-auto">
        <div className="mb-6 text-lg text-right">
          投稿日：<Date dateString={date} />
        </div>
      </div>
    </>
  );
}
