import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { withAuth } from './modules/auth';
import './assets/css/App.css';

const MainLayout = React.lazy(() => import('./views/layouts/MainLayout'));
const RegisterScreen = React.lazy(() => import('./views/screens/RegisterScreen'));
const LoginScreen = React.lazy(() => import('./views/screens/LoginScreen'));
const PopularPostsScreen = React.lazy(() => import('./views/screens/PopularPostsScreen'));
const NewPostsScreen = React.lazy(() => import('./views/screens/NewPostsScreen'));
const FollowedPostsScreen = React.lazy(() => import('./views/screens/FollowedPostsScreen'));
const BookmarkedPostsScreen = React.lazy(() => import('./views/screens/BookmarkedPostsScreen'));
const DraftPostsScreen = React.lazy(() => import('./views/screens/DraftPostsScreen'));
const PostScreen = React.lazy(() => import('./views/screens/PostScreen'));
const PostEditScreen = React.lazy(() => import('./views/screens/PostEditScreen'));
const PostCreateScreen = React.lazy(() => import('./views/screens/PostCreateScreen'));

const AuthMainLayout = withAuth(MainLayout);


export const App = () => {
  return (
    <div className="App">
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                </Route>
                <Route element={<AuthMainLayout />}>
                    <Route path="/" element={<Navigate to="/popular" replace={true} />} />
                    <Route path="/popular" element={<PopularPostsScreen />} />
                    <Route path="/new" element={<NewPostsScreen />} />
                    <Route path="/followed" element={<FollowedPostsScreen />} />
                    <Route path="/bookmarks" element={<BookmarkedPostsScreen />} />
                    <Route path="/drafts" element={<DraftPostsScreen />} />
                    <Route path="/posts/new" element={<PostCreateScreen />} />
                    <Route path="/posts/:postId" element={<PostScreen />} />
                    <Route path="/posts/:postId/edit" element={<PostEditScreen />} />
                    {/* <Route path="/authors" element={<h1>AuthorsPage</h1>} />
                    <Route path="/authors/:authorId" element={<h1>AuthorPage</h1>} /> */}
                    <Route path="*" element={<h1>404 Not found</h1>} />
                </Route>
            </Routes>
        </Suspense>
    </div>
  );
}
