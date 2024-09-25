import "./list.scss";
import Card from "../card/Card";

function List({ posts = [] }) {
  if (posts.length === 0) {
    return <p>No posts available</p>;
  }

  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
