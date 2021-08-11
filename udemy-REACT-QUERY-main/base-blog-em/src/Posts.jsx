import { useState } from "react";
import { useQuery } from "react-query"; // 서버에서 데이터 가져올떄 사용

import { PostDetail } from "./PostDetail";

const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  // 2번쨰 인자는 비동기 함수일것 !
  // const 구조분해 변수들은 useQuery에 포함되어 있다.
  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts, {
    staleTime: 2000,
  });

  // staleTime
  // cacheTime
  // 데이터가 전부 조회되기 이전에 map 함수로 빠져버리면
  // Map read 관련 TypeError가 걸릴수 있어서 여기서 한 번 필터링 거친다.
  // if (!data) return <div></div>;

  // isFecthcing - 비동기 쿼리가 해결되지 않았음. 아직 완료되지 않은 상태
  // isLoading - 로딩은 로드되는  하위 집합. 우리가 가져오기 상태, 쿼리 함수에 있음을 의미. 캐시된 데이터 없음.
  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <div>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </div>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
