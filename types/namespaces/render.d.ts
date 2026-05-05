declare namespace render {
  /**
   * Return the layerId for each Composition in the Render Queue Item. Available as part of a **Pre-Render** and **Post-Render Script**.
   * @example
   * console.log(render.composition)
   */
  const composition: string;
  /**
   * Return the file path of the render – any dynamic tokens/paths are fully resolved. Available as part of a **Post-Render Script**.
   * @example
   * console.log(render.path)
   */
  const path: string;
  /**
   * Return the renderQueueItemId to make changes to it. Available as part of a **Setup Render Script**.
   * @example
   * console.log(render.renderQueueItem)
   */
  const renderQueueItem: string;
}
