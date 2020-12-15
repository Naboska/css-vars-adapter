export const runTry = <T>(fn: (args: T) => any) => (args: T) => {
  try {
    return fn(args);
  } catch (e) {}
};
