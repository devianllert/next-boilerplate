export const EFFECTOR_STATE_PROP_NAME = '__EFFECTOR_STATE__';

export type EffectorState = {
  [EFFECTOR_STATE_PROP_NAME]?: {
    [sid: string]: any;
  };
};
