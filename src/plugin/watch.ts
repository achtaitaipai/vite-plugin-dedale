import chokidar from "chokidar";

export const watch = (dir: string, action: () => void) => {
  const templateWatcher = chokidar.watch(dir);
  templateWatcher.on("change", () => {
    action();
  });
};
