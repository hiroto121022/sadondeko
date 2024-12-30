import Date from "./date";
import PostTitle from "./post-title";

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
