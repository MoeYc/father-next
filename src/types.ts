import type { IServicePluginAPI, PluginAPI } from '@umijs/core';
import type { ITransformerItem } from './builder/bundless/loaders/javascript';

export type {
  IBundlessLoader,
  IJSTransformer,
} from './builder/bundless/loaders/types';

export type IApi = PluginAPI &
  IServicePluginAPI & {
    /**
     * add bundless js transformer
     */
    addJSTransformer: (item: ITransformerItem) => void;
  };

export enum IFatherBuildTypes {
  BUNDLE = 'bundle',
  BUNDLESS = 'bundless',
}

export enum IFatherJSTransformerTypes {
  BABEL = 'babel',
  ESBUILD = 'esbuild',
}

export enum IFatherPlatformTypes {
  NODE = 'node',
  BROWSER = 'browser',
}

export interface IFatherBaseConfig {
  /**
   * compile platform
   * @note
   */
  platform?: `${IFatherPlatformTypes}`;

  /**
   * define global constants for source code, like webpack
   */
  define?: Record<string, string>;

  /**
   * configure module resolve alias, like webpack
   */
  alias?: Record<string, string>;

  /**
   * configure postcss
   * @todo  real type definition
   */
  postcssOptions?: any;

  /**
   * configure autoprefixer
   * @todo  real type definition
   */
  autoprefixer?: any;

  /**
   * configure extra babel presets
   * @todo  real type definition
   */
  extraBabelPresets?: any[];

  /**
   * configure extra babel plugins
   * @todo  real type definition
   */
  extraBabelPlugins?: any[];
}

export interface IFatherBundlessConfig extends IFatherBaseConfig {
  /**
   * source code directory
   * @default src
   */
  input?: string;

  /**
   * output directory
   * @default dist
   */
  output?: string;

  /**
   * specific transformer
   * @note  father will auto-select transformer by default (babel for browser files, esbuild for node files)
   */
  transformer?: `${IFatherJSTransformerTypes}`;

  /**
   * override config for each sub-directory or file via key-value
   */
  overrides?: Record<
    string,
    Omit<IFatherBundlessConfig, 'input'> & IFatherBaseConfig
  >;

  /**
   * ignore specific directories & files via ignore syntax
   */
  ignores?: string[];
}

export interface IFatherBundleConfig extends IFatherBaseConfig {
  /**
   * bundle entry config
   * @default src/index.{js,ts,jsx,tsx}
   * @note    support to override config for each entry via key-value
   */
  entry?:
    | string
    | Record<string, Omit<IFatherBundleConfig, 'entry'> & IFatherBaseConfig>;

  /**
   * bundle output path
   * @default dist
   */
  output?: string;

  /**
   * external dependencies
   * @note  like umi externals
   */
  externals?: Record<string, string>;

  /**
   * modify webpack config via webpack-chain
   * @todo  real type definition
   */
  chainWebpack?: (args: any) => any;
}

export interface IFatherConfig extends IFatherBaseConfig {
  /**
   * bundler config (umd)
   */
  umd?: IFatherBundleConfig;

  /**
   * transformer config (esm)
   */
  esm?: IFatherBundlessConfig;
}
