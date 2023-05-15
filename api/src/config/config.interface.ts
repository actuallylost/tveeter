import type { config as base } from "./envs/default";
import type { config as production } from "./envs/production";
import type { config as development } from "./envs/development";

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Production = typeof production;
export type Development = typeof development;
export type Config = Default & (Production | Development);
