type Theme = 'light' | 'dark';
type Palette = 'ai' | 'shu' | 'cha' | 'sumi';

const THEME_KEY = 'tb:theme';
const PALETTE_KEY = 'tb:palette';

export const useTheme = () => {
  const theme = useState<Theme>('tb-theme', () => 'light');
  const palette = useState<Palette>('tb-palette', () => 'ai');

  onMounted(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const storedPalette = localStorage.getItem(PALETTE_KEY) as Palette | null;
    if (storedTheme) theme.value = storedTheme;
    if (storedPalette) palette.value = storedPalette;
  });

  watch(
    theme,
    (v) => {
      if (import.meta.client) {
        document.documentElement.dataset.theme = v;
        localStorage.setItem(THEME_KEY, v);
      }
    },
    { immediate: true }
  );

  watch(
    palette,
    (v) => {
      if (import.meta.client) {
        document.documentElement.dataset.palette = v;
        localStorage.setItem(PALETTE_KEY, v);
      }
    },
    { immediate: true }
  );

  return {
    theme,
    palette,
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
    },
    setPalette: (p: Palette) => {
      palette.value = p;
    },
  };
};
