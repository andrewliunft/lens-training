import Link from "next/link";

export default function PostFeed({ posts }) {
  return (
    <div>
      {posts
        ? posts.map((post) => <PostItem post={post} key={post.id} />)
        : null}
    </div>
  );
}

function PostItem({ post }) {
  let imageURL;

  if (post.metadata.image) {
    imageURL = post.metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  return (
    <div>
      <Link href={`/posts/${post.id}`}>
        <img src={imageURL} />
        <h2>{post.metadata.name}</h2>
      </Link>
    </div>
  );
}
