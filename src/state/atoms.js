
import { atom } from 'jotai';
import { tracks } from '../shared/data'

export const isPlayingConfig = atom(false);
export const timeRemainingConfig = atom();
export const selectedTrackConfig = atom(tracks);