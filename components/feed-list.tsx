import { useSession } from "next-auth/react";
import { useState } from "react";
import PostCard from './feed-post-card';
import NewPostCard from './new-post-card';
import { getHomePosts, getUserPosts } from "@/actions/actions";
import { Loader } from 'lucide-react';

export default function FeedList({
  posts,
  setPosts,
  postsLoading,
  authuserData,
  feedType,
  endOfFeed,
}) {
  const { data: session } = useSession();
  const [morePostsLoading, setMorePostsLoading] = useState(false);
  const [newEndOfFeed, setNewEndOfFeed] = useState(false);
    const parsedPosts = (typeof posts === 'string') ? JSON.parse(posts) : posts;

  // Fetch 10 of all posts startig from the last post id in the posts array
  const fetchMorePostsFromLastId = async () => {
    setMorePostsLoading(true);
    const startId = parsedPosts[parsedPosts.length - 1]._id;
    let res;
    switch (feedType) {
      case "all":
        res = await fetch(`/api/posts?startId=${startId}`);
        break;
      case "profile":
        res = await getUserPosts(session.user.userId, startId);
        break;
      case "user":
        // const userId = parsedPosts[0].user._id;
        // res = await getHomePosts(userId, startId);
        break;
      case "home":
        const userId = parsedPosts[0].user._id;
        res = await getHomePosts(userId, startId);
        break;
    }
    const data = JSON.parse(res); // convert back
    console.log(data);
    if (data.length < 10) {
      setNewEndOfFeed(true);
    }
    setMorePostsLoading(false);
    setPosts(parsedPosts.concat(data));
  };

  if (postsLoading) {
    return (
        <Loader />
    );
  } 
  const allPosts = parsedPosts.map((postObj) => (
    <PostCard
      key={postObj._id}
      post={postObj}
      user={authuserData}
    />
  ));
  if (parsedPosts?.length > 0) {
    return (
    <div className="flex flex-col gap-6 items-center py-10">


        {feedType != "user" && <NewPostCard user={JSON.parse(authuserData)} />}
        <div className="text-2xl max-w-2xl relative w-full">
        {feedType === "user"
          ? `${JSON.parse(authuserData).username}'s posts`
          : feedType === "profile"
          ? "Your posts"
          : feedType === 'home'
          ? "Your feed" : "All posts"}
      </div>
        <div className="flex flex-col gap-10 items-center py-1 max-w-2xl w-full">
        {allPosts.length === 0 ? <>No posts yet...</> : <>{allPosts}</>}
      </div>
        {!newEndOfFeed && !endOfFeed ? (
          <div className="d-flex justify-content-center">
            {morePostsLoading ? (
              <div>loader placeholder</div>
            ) : (
              <button
                className="btn btn-outline-secondary"
                onClick={fetchMorePostsFromLastId}
              >
                Load posts
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div className={`row mx-auto mt-3 feed-card`}>
        {feedType === "home" && (
          <p className="">No posts from you or your friends yet...</p>
        )}
        {feedType === "user" && (
          <p className="">No posts from this user yet...</p>
        )}
        {feedType === "profile" && <p className="">No posts from you yet...</p>}
        {feedType === "all" && <p className="">No posts yet...</p>}
      </div>
    );
  }
}
