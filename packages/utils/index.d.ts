/// <reference path="types/logger.d.ts"/>

declare module '@inc/utils' {
  /**
   * Logger function that allow devs to use color for dev log purposes.
   *
   * Please remove the unnecessary logs from production build.
   *
   * Type declarations have been added for auto-fill of available colors.
   */
  export function Log(config: ChalkConfig, ...text: string[]): void;
}
