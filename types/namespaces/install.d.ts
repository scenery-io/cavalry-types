declare namespace install {
  /**
   * `fromUpdate` can be used to create conditionals when updating plugins.
   * @example
   * const process = install.fromUpdate ? `updated` : `installed`;
   *
   * const label = new ui.Label(`You have ${process} the plugin.`);
   */
  const fromUpdate: boolean;
}
