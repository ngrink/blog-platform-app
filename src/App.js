import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from './views/layouts/MainLayout';
import { HomeScreen } from './views/screens/HomeScreen';
import { PostScreen } from './views/screens/PostScreen';
import { PostEditScreen } from './views/screens/PostEditScreen';
import './assets/css/App.css';


export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />}>
            <Route path="/login" element={<h1>LoginPage</h1>} />
            <Route path="/register" element={<h1>RegisterPage</h1>} />
        </Route>
        <Route element={<MainLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/authors" element={<h1>AuthorsPage</h1>} />
            <Route path="/authors/:authorId" element={<h1>AuthorPage</h1>} />
            <Route path="/posts/popular" element={<h1>PopularPostsPage</h1>} />
            <Route path="/posts/new" element={<h1>NewestPostsPage</h1>} />
            <Route path="/posts/:postId" element={<PostScreen />} />
            <Route path="/posts/:postId/edit" element={<PostEditScreen />} />
            <Route path="*" element={<h1>404 Not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}
