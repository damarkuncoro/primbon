/**
 * Primbon Plugin System
 *
 * Modular dan Extensible Architecture
 * Allows developers to extend primbon functionality with custom plugins
 */

/**
 * Date input type - accepts Date, string, or number
 */
export type DateInput = Date | string | number;

/**
 * Base Plugin Interface
 * All plugins must implement this interface
 */
export interface PrimbonPlugin {
  /** Unique identifier for the plugin */
  id: string;
  
  /** Human-readable name */
  name: string;
  
  /** Plugin version */
  version: string;
  
  /** Description of what the plugin does */
  description?: string;
  
  /** Calculate result from date */
  calculate: (date: Date) => unknown;
  
  /** Optional: Validate input */
  validate?: (input: DateInput) => boolean;
  
  /** Optional: Get metadata */
  getMeta?: () => Record<string, unknown>;
}

/**
 * Plugin Registry
 * Manages all registered plugins
 */
class PluginRegistry {
  private plugins: Map<string, PrimbonPlugin> = new Map();
  
  /**
   * Register a new plugin
   */
  register(plugin: PrimbonPlugin): void {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin with id '${plugin.id}' is already registered`);
    }
    this.plugins.set(plugin.id, plugin);
  }
  
  /**
   * Unregister a plugin
   */
  unregister(pluginId: string): boolean {
    return this.plugins.delete(pluginId);
  }
  
  /**
   * Get plugin by id
   */
  get(pluginId: string): PrimbonPlugin | undefined {
    return this.plugins.get(pluginId);
  }
  
  /**
   * Get all registered plugins
   */
  getAll(): PrimbonPlugin[] {
    return Array.from(this.plugins.values());
  }
  
  /**
   * Check if plugin is registered
   */
  has(pluginId: string): boolean {
    return this.plugins.has(pluginId);
  }
  
  /**
   * Clear all plugins
   */
  clear(): void {
    this.plugins.clear();
  }
  
  /**
   * Get plugin count
   */
  get count(): number {
    return this.plugins.size;
  }
}

// Singleton instance
const registry = new PluginRegistry();

/**
 * Get the plugin registry
 */
export const getRegistry = (): PluginRegistry => registry;

/**
 * Register a plugin
 */
export const registerPlugin = (plugin: PrimbonPlugin): void => {
  registry.register(plugin);
};

/**
 * Unregister a plugin
 */
export const unregisterPlugin = (pluginId: string): boolean => {
  return registry.unregister(pluginId);
};

/**
 * Get a plugin by id
 */
export const getPlugin = (pluginId: string): PrimbonPlugin | undefined => {
  return registry.get(pluginId);
};

/**
 * Get all plugins
 */
export const getAllPlugins = (): PrimbonPlugin[] => {
  return registry.getAll();
};

/**
 * Check if plugin exists
 */
export const hasPlugin = (pluginId: string): boolean => {
  return registry.has(pluginId);
};

/**
 * Create a primbon plugin helper
 */
export const createPlugin = (
  id: string,
  name: string,
  version: string,
  calculate: (date: Date) => unknown,
  options?: {
    description?: string;
    validate?: (input: DateInput) => boolean;
    getMeta?: () => Record<string, unknown>;
  }
): PrimbonPlugin => {
  return {
    id,
    name,
    version,
    description: options?.description,
    calculate,
    validate: options?.validate,
    getMeta: options?.getMeta
  };
};

export default {
  getRegistry,
  registerPlugin,
  unregisterPlugin,
  getPlugin,
  getAllPlugins,
  hasPlugin,
  createPlugin
};