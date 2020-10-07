import { app, BrowserWindow } from 'electron';
import { MODE_DEBUG, PLATFORM_DARWIN } from './env';
import { getConfig, saveStore, setConfig } from './userConfig';

let window: BrowserWindow;

app.on('ready', () => {
  window = new BrowserWindow({
    center: true,
    title: '박스히어로 앱',
    width: getConfig('prevWidth'),
    height: getConfig('prevHeight'),
    minWidth: getConfig('minWidth'),
    minHeight: getConfig('minHeight'),
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
    },
  });

  window.loadURL('https://google.com');

  if (MODE_DEBUG) {
    window.webContents.openDevTools();
  }
});

app.setName('박스히어로 앱');

app.on('window-all-closed', () => {
  app.quit();
});

app.on('before-quit', () => {
  saveWindowSize();
  saveStore();
});

const saveWindowSize = () => {
  const [width, height] = window.getSize();

  setConfig('prevWidth', width);
  setConfig('prevHeight', height);
};
