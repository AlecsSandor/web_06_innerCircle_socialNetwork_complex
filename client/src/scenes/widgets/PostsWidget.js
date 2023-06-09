import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"
import PostWidget from "./PostWidget"

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts)

  const getPosts = async () => {
    const response = await fetch("http://localhost:8080/posts", {
      method: "GET"
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8080/${userId}/posts`,
      {
        method: "GET"
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); 

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          name,
          description,
          picturePath,
          userPicturePath,
          likes,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
