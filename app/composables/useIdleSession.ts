const IDLE_TIMEOUT = 15 * 60 * 1000;
const RESUME_DEBOUNCE = 500;
const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
] as const;

export const useIdleSession = () => {
  const idleState = ref<'active' | 'idle' | 'validating'>('active');
  const { validateSession } = useAuth();
  const router = useRouter();

  const isIdle = computed(() => idleState.value === 'idle');

  let activityTimer: ReturnType<typeof setTimeout> | null = null;
  let resumeDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  const clearTimers = () => {
    if (activityTimer) {
      clearTimeout(activityTimer);
      activityTimer = null;
    }
    if (resumeDebounceTimer) {
      clearTimeout(resumeDebounceTimer);
      resumeDebounceTimer = null;
    }
  };

  const startActivityTimer = () => {
    if (activityTimer) clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
      if (idleState.value === 'active') {
        idleState.value = 'idle';
      }
    }, IDLE_TIMEOUT);
  };

  const onActivity = () => {
    if (idleState.value === 'validating') return;

    if (idleState.value === 'idle') {
      if (resumeDebounceTimer) clearTimeout(resumeDebounceTimer);
      resumeDebounceTimer = setTimeout(() => {
        if (idleState.value !== 'idle') return;
        idleState.value = 'validating';
        validateSession().then((ok) => {
          if (!ok) {
            router.push('/login');
            return;
          }
          idleState.value = 'active';
          startActivityTimer();
        });
      }, RESUME_DEBOUNCE);
      return;
    }

    idleState.value = 'active';
    startActivityTimer();
  };

  if (import.meta.client) {
    startActivityTimer();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity, { passive: true });
    }
  }

  onUnmounted(() => {
    clearTimers();
    if (import.meta.client) {
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
    }
  });

  return { isIdle };
};
