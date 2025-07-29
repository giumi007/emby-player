import React, { useState, useEffect } from 'react';
import Login from './modules/Login';
import MediaBrowser from './modules/MediaBrowser';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 判断本地是否存储了 serverUrl 和 apiKey
    const serverUrl = localStorage.getItem('serverUrl');
    const apiKey = localStorage.getItem('apiKey');
    if (serverUrl && apiKey) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('serverUrl');
    localStorage.removeItem('apiKey');
    setLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {loggedIn ? (
        <div>
          <div className="flex justify-end p-4">
            <button onClick={handleLogout} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              退出登录
            </button>
          </div>
          <MediaBrowser />
        </div>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;