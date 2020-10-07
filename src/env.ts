import path from 'path';
import { app } from 'electron';
import { CONFIG_FILENAME } from './constants';

export const MODE_DEBUG = process.env['DEBUG'];

export const USERDATA_PATH = app.getPath('userData');
export const CONFIG_PATH = path.resolve(USERDATA_PATH, `./${CONFIG_FILENAME}`);

export const PLATFORM_DARWIN = process.platform === 'darwin';
