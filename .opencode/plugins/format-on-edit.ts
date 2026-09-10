import type { Plugin } from '@opencode-ai/plugin';

const FORMATTABLE = /\.(ts|tsx|css|json)$/;
const SKIP = /(?:^|\/)(?:node_modules|dist)\//;

export const FormatOnEdit: Plugin = async ({ $, directory }) => {
  const inFlight = new Set<string>();

  return {
    event: async ({ event }) => {
      if (event.type !== 'file.edited') return;

      const file = event.properties.file;
      if (!file || SKIP.test(file) || !FORMATTABLE.test(file)) return;
      if (inFlight.has(file)) return;

      inFlight.add(file);
      try {
        await $`pnpm exec prettier --write ${file}`.cwd(directory);
      } finally {
        inFlight.delete(file);
      }
    },
  };
};
