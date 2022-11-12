import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import './assets/css/App.css';

const MainLayout = React.lazy(() => import('./views/layouts/MainLayout'));
const HomeScreen = React.lazy(() => import('./views/screens/HomeScreen'));
const PostScreen = React.lazy(() => import('./views/screens/PostScreen'));
const PostEditScreen = React.lazy(() => import('./views/screens/PostEditScreen'));
const PostCreateScreen = React.lazy(() => import('./views/screens/PostCreateScreen'));


export const App = () => {
  return (
    <div className="App">
        <Suspense fallback={<Spinner />}>
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
                    <Route path="/posts/new" element={<PostCreateScreen />} />
                    <Route path="/posts/:postId" element={<PostScreen />} />
                    <Route path="/posts/:postId/edit" element={<PostEditScreen />} />
                    <Route path="*" element={<h1>404 Not found</h1>} />
                </Route>
            </Routes>
        </Suspense>
    </div>
  );
}
