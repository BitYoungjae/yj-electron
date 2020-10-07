import { readFileSync, writeFileSync } from 'fs';
import { CONFIG_PATH } from './env';

interface IStaticConfig {
  minWidth: number;
  minHeight: number;
}

interface IUserConfig {
  prevWidth?: number;
  prevHeight?: number;
}

type ConfigOption = IStaticConfig & IUserConfig;

const defaultConfig: Required<ConfigOption> = {
  minWidth: 1024,
  minHeight: 760,
  prevWidth: 1024,
  prevHeight: 760,
};

let store: ConfigOption;

export const getConfig = (key: keyof ConfigOption) =>
  getStore()[key] ?? defaultConfig[key];

export const setConfig = (
  key: keyof IUserConfig,
  value: IUserConfig[typeof key],
) => {
  getStore()[key] = value;
};

export const getStore = () => {
  try {
    if (store) return store;

    const fileContent = readFileSync(CONFIG_PATH, 'utf-8');
    const userConfig: IUserConfig = JSON.parse(fileContent);

    store = { ...defaultConfig, ...userConfig };
  } catch {
    store = defaultConfig;
  } finally {
    return store;
  }
};

export const saveStore = () => {
  const config = getStore();
  const serialized = JSON.stringify(config);

  writeFileSync(CONFIG_PATH, serialized, 'utf-8');
};
