import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tool } from '@opencode-ai/plugin';

type Check = 'ok' | 'fail';

interface FeatureReport {
  feature: string;
  screen: Check;
  components: Check;
  barrel: Check;
  ok: boolean;
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function hasScreen(featureDir: string): boolean {
  if (!existsSync(featureDir)) return false;
  return readdirSync(featureDir).some((entry) => entry.endsWith('Screen.tsx'));
}

function checkFeature(featuresDir: string, name: string): FeatureReport {
  const featureDir = join(featuresDir, name);
  const screen: Check = hasScreen(featureDir) ? 'ok' : 'fail';
  const components: Check = isDirectory(join(featureDir, 'components'))
    ? 'ok'
    : 'fail';
  const barrel: Check = existsSync(join(featureDir, 'index.tsx'))
    ? 'ok'
    : 'fail';

  return {
    feature: name,
    screen,
    components,
    barrel,
    ok: screen === 'ok' && components === 'ok' && barrel === 'ok',
  };
}

export default tool({
  description:
    'Comprueba que cada feature en src/features tenga Screen, components/ y barrel index.tsx. Devuelve JSON con ok/fail por feature.',
  args: {},
  async execute(_args, context) {
    const featuresDir = join(context.worktree, 'src/features');
    if (!existsSync(featuresDir) || !isDirectory(featuresDir)) {
      return JSON.stringify({
        error: `No existe ${featuresDir}`,
        features: [],
      });
    }

    const features = readdirSync(featuresDir)
      .filter((name) => isDirectory(join(featuresDir, name)))
      .sort()
      .map((name) => checkFeature(featuresDir, name));

    return JSON.stringify(
      {
        ok: features.every((feature) => feature.ok),
        features,
      },
      null,
      2,
    );
  },
});
