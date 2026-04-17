import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
<<<<<<< HEAD
=======
import type { Perspective } from './registries/types.js';
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

export interface ForgeConfig {
  author: string;
  persona: string;
  company?: string;
<<<<<<< HEAD
=======
  defaultMode: string;
  perspective: Perspective;
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  fonts: {
    primary: string;
    secondary: string;
  };
  memory?: {
    path?: string;
  };
}

const DEFAULT_CONFIG: ForgeConfig = {
<<<<<<< HEAD
  author: 'Nino Chavez',
  persona: 'senior technology strategist',
  company: process.env.FORGE_COMPANY || 'BigCommerce',
  fonts: {
    primary: 'https://use.typekit.net/wbj0oqh.css',
    secondary: 'https://use.typekit.net/tjp7ihm.css',
=======
  author: '',
  persona: '',
  company: process.env.FORGE_COMPANY || '',
  defaultMode: 'advisory',
  perspective: 'consultant',
  fonts: {
    primary: '',
    secondary: '',
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  },
};

export function getDefaultConfigPath(): string {
  if (process.env.FORGE_CONFIG_PATH) {
    return process.env.FORGE_CONFIG_PATH;
  }
  return join(homedir(), '.signal-forge', 'config.json');
}

export function loadConfig(): ForgeConfig {
  const configPath = getDefaultConfigPath();

  if (!existsSync(configPath)) {
<<<<<<< HEAD
=======
    if (!DEFAULT_CONFIG.author) {
      console.warn('[signal-forge] No configuration found. Run `forge init` to set up your author, persona, and company.');
    }
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return { ...DEFAULT_CONFIG };
  }

  try {
    const rawConfig = readFileSync(configPath, 'utf-8');
    const userConfig = JSON.parse(rawConfig);
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    // Deep merge logic (simplified for this depth)
    return {
      ...DEFAULT_CONFIG,
      ...userConfig,
      fonts: {
        ...DEFAULT_CONFIG.fonts,
        ...(userConfig.fonts || {}),
      },
      memory: {
        ...(userConfig.memory || {}),
      }
    };
  } catch (error) {
    console.warn(`[WARNING] Failed to parse config file at ${configPath}. Using defaults.`);
    console.warn(`Error: ${(error as Error).message}`);
    return { ...DEFAULT_CONFIG };
  }
}

<<<<<<< HEAD
export function createDefaultConfig(): void {
  const configPath = getDefaultConfigPath();
  const dir = dirname(configPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  if (!existsSync(configPath)) {
    writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
    console.log(`Created default configuration at ${configPath}`);
=======
export function saveConfig(config: ForgeConfig): void {
  const configPath = getDefaultConfigPath();
  const dir = dirname(configPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

export function createDefaultConfig(): void {
  const configPath = getDefaultConfigPath();
  const dir = dirname(configPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  if (!existsSync(configPath)) {
    const initConfig: ForgeConfig = {
      ...DEFAULT_CONFIG,
      author: 'Your Name',
      persona: 'your role or title',
      company: 'Your Company',
    };
    writeFileSync(configPath, JSON.stringify(initConfig, null, 2), 'utf-8');
    console.log(`Created default configuration at ${configPath}`);
    console.log('Edit this file to set your author, persona, and company.');
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  } else {
    console.log(`Configuration already exists at ${configPath}`);
  }
}
<<<<<<< HEAD
=======

export function configExists(): boolean {
  return existsSync(getDefaultConfigPath());
}
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
