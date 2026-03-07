import type { ILxRteModule } from '../types';

export const defineRteModule = <const TModule extends ILxRteModule>(moduleDefinition: TModule): TModule => moduleDefinition;
