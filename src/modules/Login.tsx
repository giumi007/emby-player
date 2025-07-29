import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [serverUrl, setServerUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${serverUrl}/System/Info/Public`, {
        headers: { 'X-Emby-Token': apiKey },
      });

      if (response.status === 200) {
        localStorage.setItem('serverUrl', serverUrl);
        localStorage.setItem('apiKey', apiKey);
        onLogin();
      }
    } catch (err) {
      setError('登录失败，请检查服务器地址和 API Key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto space-y-4">
      <h2 className="text-xl font-semibold">连接 Emby 服务器</h2>
      <input className="w-full p-2 border rounded" placeholder="服务器地址 (如 http://192.168.31.14:8096)" value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={handleLogin} disabled={loading}>
        {loading ? '连接中...' : '连接'}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}