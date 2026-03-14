import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';

export interface ForgeConfig {
  author: string;
  persona: string;
  company?: string;
  fonts: {
    primary: string;
    secondary: string;
  };
  memory?: {
    path?: string;
  };
}

const DEFAULT_CONFIG: ForgeConfig = {
  author: 'Nino Chavez',
  persona: 'senior technology strategist',
  company: process.env.FORGE_COMPANY || 'BigCommerce',
  fonts: {
    primary: 'https://use.typekit.net/wbj0oqh.css',
    secondary: 'https://use.typekit.net/tjp7ihm.css',
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
    return { ...DEFAULT_CONFIG };
  }

  try {
    const rawConfig = readFileSync(configPath, 'utf-8');
    const userConfig = JSON.parse(rawConfig);
    
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

export function createDefaultConfig(): void {
  const configPath = getDefaultConfigPath();
  const dir = dirname(configPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  if (!existsSync(configPath)) {
    writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
    console.log(`Created default configuration at ${configPath}`);
  } else {
    console.log(`Configuration already exists at ${configPath}`);
  }
}
