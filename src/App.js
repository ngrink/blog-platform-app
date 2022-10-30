import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';


export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<h1>HomePage</h1>} />
        <Route path="/register" element={<h1>HomePage</h1>} />

        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/authors" element={<h1>AuthorsPage</h1>} />
        <Route path="/authors/:authorId" element={<h1>AuthorPage</h1>} />
        <Route path="/posts/popular" element={<h1>PopularPostsPage</h1>} />
        <Route path="/posts/new" element={<h1>NewestPostsPage</h1>} />
        <Route path="/posts/:postId" element={<h1>PostPage</h1>} />
        <Route path="*" element={<h1>404 Not found</h1>} />
      </Routes>
    </div>
  );
}
