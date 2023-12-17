import { Command } from '../types';
import { ping } from './ping';
import { realtime } from './realtime';

export const commands: Command[] = [ping, realtime];
