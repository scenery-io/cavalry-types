declare namespace console {
  /**
   * Typically used in testing. Printed in green.
   */
  function log(...data: any[]): void;
  /**
   * Confirm when something expected has happened. Printed in green.
   */
  function info(...data: any[]): void;
  /**
   * Warn a user when they've done something unexpected. Printed in yellow.
   */
  function warn(...data: any[]): void;
  /**
   * Flag when something has gone wrong. Printed in red.
   */
  function error(...data: any[]): void;
  /**
   * Print a message to the terminal when Cavalry is launched from the command line.
   */
  function debug(...data: any[]): void;
}
