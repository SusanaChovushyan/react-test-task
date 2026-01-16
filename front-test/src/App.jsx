import { useState } from 'react';
import './styles/index.css';
import Header from './components/Header/Header.jsx';
import PostsGrid from './components/PostsGrid/PostsGrid.jsx';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="main-content">
        <PostsGrid searchQuery={searchQuery} />
      </main>
    </>
  );
}



