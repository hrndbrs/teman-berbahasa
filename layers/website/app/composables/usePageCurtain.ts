type CurtainPhase = 'hidden' | 'covering' | 'covered' | 'revealing';
type CurtainMeta = { label: string; index: string };

const COVER_MS = 780;
const HOLD_MS = 380;
const REVEAL_MS = 820;
const REDUCED_MS = 220;

const SCREENS: Record<string, CurtainMeta> = {
  '/': { label: 'Beranda', index: 'ホーム' },
  '/courses': { label: 'Program belajar', index: '学習プログラム' },
  '/events': { label: 'Mini course', index: 'ミニコース' },
};

function screenFor(path: string): CurtainMeta {
  if (path.startsWith('/courses/')) {
    return { label: 'Detail program', index: 'プログラム詳細' };
  }
  return SCREENS[path] ?? { label: 'Teman Berbahasa', index: '' };
}

export function usePageCurtain() {
  const phase = useState<CurtainPhase>('page-curtain', () => 'hidden');
  const meta = useState<CurtainMeta>('page-curtain-meta', () => ({
    label: '',
    index: '',
  }));
  const recede = computed(
    () => phase.value === 'covering' || phase.value === 'covered'
  );

  const duration = (full: number) =>
    import.meta.client &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? REDUCED_MS
      : full;

  function cover(path: string) {
    return new Promise<void>((resolve) => {
      if (!import.meta.client) return resolve();
      meta.value = screenFor(path);
      phase.value = 'covering';
      window.setTimeout(() => {
        phase.value = 'covered';
        resolve();
      }, duration(COVER_MS));
    });
  }

  function reveal() {
    if (!import.meta.client || phase.value !== 'covered') return;
    window.setTimeout(() => {
      if (phase.value !== 'covered') return;
      phase.value = 'revealing';
      window.setTimeout(() => {
        phase.value = 'hidden';
      }, duration(REVEAL_MS));
    }, duration(HOLD_MS));
  }

  return { phase, meta, recede, cover, reveal };
}
