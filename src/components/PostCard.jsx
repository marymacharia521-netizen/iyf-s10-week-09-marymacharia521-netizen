import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
      <div
        style={{
          background: "#fff",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "10px",
        }}
      >
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </Link>
  );
}

export default PostCard;
