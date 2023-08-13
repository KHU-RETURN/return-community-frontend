import { useParams, useLocation } from "react-router";

function Detail() {
  let id = useParams();
  const contents = useLocation();
  let list = contents.state;
  console.log(list);
  return (
    <div>
      <h3>{list.title}</h3>
      <div>{list.user.name}</div>
      <div>{list.content}</div>
    </div>
  );
}

export default Detail;
