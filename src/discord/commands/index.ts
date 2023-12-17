import { Command } from '../types';
import { ping } from './ping';
import { realtime } from './realtime';
import { set } from './set';
import { unset } from './unset';

export const commands: Command[] = [ping, realtime, set, unset];
