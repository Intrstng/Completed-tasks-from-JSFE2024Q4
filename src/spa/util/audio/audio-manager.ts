import type { AudioEffect } from './types';

export default class AudioManager {
    private readonly sounds: Record<AudioEffect, HTMLAudioElement>;

    private isMuted = false;

    constructor() {
        this.sounds = {
            spinStart: new Audio(new URL('../../../assets/audio/spin-start.mp3', import.meta.url).href),
            spinTick: new Audio(new URL('../../../assets/audio/spin-tick_1.mp3', import.meta.url).href),
            spinFinish: new Audio(new URL('../../../assets/audio/spin-finish.mp3', import.meta.url).href),
        };

        Object.values(this.sounds).forEach(audio => {
            audio.preload = 'auto';
        });
    }

    public setMuted(isMuted: boolean): void {
        this.isMuted = isMuted;

        if (isMuted) {
            Object.values(this.sounds).forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    }

    public play(effect: AudioEffect): void {
        if (this.isMuted) return;

        const audio = this.sounds[effect];

        audio.currentTime = 0;

        void audio.play().catch(error => {
            console.warn(`Unable to play ${effect} audio:`, error);
        });
    }
}
