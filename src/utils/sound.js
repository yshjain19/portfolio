// Web Audio API synthesized click & pop sounds (zero external assets, instant 0ms latency)
let audioCtx = null;
let soundEnabled = true;

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playClickSound('toggle');
  }
  return soundEnabled;
}

export function playClickSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (type === 'primary') {
      // Loud, rich tech punch for primary CTA buttons
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.09);
      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'toggle') {
      // Loud, bright chime for theme / mode toggle
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587, now);
      osc.frequency.exponentialRampToValueAtTime(1174, now + 0.12);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'avatar') {
      // Loud, futuristic holographic blip for profile avatar
      osc.type = 'sine';
      osc.frequency.setValueAtTime(980, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.11);
      gain.gain.setValueAtTime(0.40, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } else {
      // Crisp, loud tactile mechanical click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);
      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch {
    // Ignore autoplay or audio context errors
  }
}
