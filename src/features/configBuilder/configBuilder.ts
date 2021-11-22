import { addTransformer } from '../../builder';
import babel from '../../builder/transformer/babel';
import esbuild from '../../builder/transformer/esbuild';
import type { IApi } from '../../types';
import type { ITransformer } from '../../builder/protocol';

export default async (api: IApi) => {
  // collect all bundless transformers
  const transformers: ITransformer[] = await api.applyPlugins({
    key: 'addTransformer',
    initialValue: [babel, esbuild],
  });

  // register transformers
  // TODO: register extra config schema
  transformers.forEach((t) => addTransformer(t));
};
