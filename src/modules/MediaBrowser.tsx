import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MediaBrowser() {
  interface Item {
  Id: string;
  Name: string;
}

const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const serverUrl = localStorage.getItem('serverUrl');
      const apiKey = localStorage.getItem('apiKey');

      try {
        const res = await axios.get(`${serverUrl}/Users/Public`, {
          headers: { 'X-Emby-Token': apiKey }
        });

        const userId = res.data[0]?.Id;
        const itemRes = await axios.get(`${serverUrl}/Users/${userId}/Items`, {
          headers: { 'X-Emby-Token': apiKey }
        });

        setItems(itemRes.data.Items || []);
      } catch (err) {
        console.error('加载媒体失败', err);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      {items.map(item => (
        <div key={item.Id} className="rounded shadow p-2 bg-white dark:bg-gray-800">
          <img src={`${localStorage.getItem('serverUrl')}/Items/${item.Id}/Images/Primary`} alt={item.Name} className="rounded" />
          <div className="text-center mt-2">{item.Name}</div>
        </div>
      ))}
    </div>
  );
}