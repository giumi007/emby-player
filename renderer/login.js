const statusEl = document.getElementById('status');
document.getElementById('btn').addEventListener('click', login);
async function login() {
  const server = document.getElementById('server').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  if (!server || !username || !password) {
    statusEl.textContent = '请填写全部字段';
    return;
  }
  statusEl.textContent = '登录中...';
  try {
    const resp = await fetch(`${server}/Users/AuthenticateByName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Emby-Authorization': 'MediaBrowser Client="EmbyPlayer", Device="Windows", DeviceId="device123", Version="0.1"'
      },
      body: JSON.stringify({ Username: username, Pw: password })
    });
    if (!resp.ok) throw new Error(`Status ${resp.status}`);
    const data = await resp.json();
    localStorage.setItem('emby-token', data.AccessToken);
    localStorage.setItem('emby-userid', data.User.Id);
    localStorage.setItem('emby-server', server);
    statusEl.textContent = '登录成功';
    // 此处可跳转到主界面页（待开发）
    setTimeout(() => alert('登录成功，进入下一模块'), 500);
  } catch (e) {
    console.error(e);
    statusEl.textContent = '登录失败，请检查服务器地址或账号密码';
  }
}
