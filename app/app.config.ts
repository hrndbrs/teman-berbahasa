export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      info: 'info',
      warning: 'warning',
      error: 'error',
      neutral: 'neutral',
    },

    button: {
      slots: {
        base: [
          'rounded-md font-medium inline-flex items-center gap-1.5',
          'transition-colors duration-150 ease-[var(--ease-out-soft)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        ].join(' '),
      },
      defaultVariants: {
        size: 'md',
        color: 'neutral',
        variant: 'outline',
      },
      variants: {
        size: {
          sm: { base: 'h-7 px-2.5 text-xs gap-1' },
          md: { base: 'h-8 px-3 text-[13px]' },
          lg: { base: 'h-10 px-4 text-sm' },
        },
      },
    },

    card: {
      slots: {
        root: 'bg-[var(--ui-bg)] ring-1 ring-[var(--ui-border)] rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]',
        header: 'px-5 py-4 border-b border-[var(--ui-border-muted)]',
        body: 'px-5 py-4',
        footer: 'px-5 py-3 border-t border-[var(--ui-border-muted)]',
      },
    },

    badge: {
      slots: {
        base: [
          'inline-flex items-center gap-1',
          'font-mono text-[10px] tracking-[0.08em] uppercase',
          'rounded px-1.5 py-0.5 border',
        ].join(' '),
      },
      defaultVariants: { variant: 'subtle', color: 'neutral' },
    },

    input: {
      slots: {
        base: [
          'bg-[var(--ui-bg-muted)] ring-1 ring-[var(--ui-border)]',
          'rounded-md text-[13px] placeholder:text-[var(--ui-text-dimmed)]',
          'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none',
        ].join(' '),
      },
      defaultVariants: { size: 'md', variant: 'outline' },
    },

    select: {
      slots: {
        base: 'bg-[var(--ui-bg-muted)] ring-1 ring-[var(--ui-border)] rounded-md',
      },
    },

    table: {
      slots: {
        th: 'font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ui-text-dimmed)] font-medium bg-[var(--ui-bg-muted)] px-3 py-2.5 border-b border-[var(--ui-border)]',
        td: 'px-4 py-3 border-b border-[var(--ui-border-muted)] text-[13px] align-middle',
        tr: 'transition-colors hover:bg-[var(--ui-bg-muted)]',
      },
    },

    modal: {
      slots: {
        overlay: 'bg-[oklch(0.18_0_0_/_0.45)] backdrop-blur-sm',
        content:
          'bg-[var(--ui-bg)] rounded-[var(--radius-card)] ring-1 ring-[var(--ui-border)] shadow-[var(--shadow-pop)] max-w-[720px]',
      },
    },

    tabs: {
      slots: {
        list: 'border-b border-[var(--ui-border)] gap-1',
        trigger: [
          'px-3.5 py-2.5 text-[13px] text-[var(--ui-text-muted)]',
          'border-b-2 border-transparent -mb-px',
          'data-[state=active]:text-[var(--ui-text)] data-[state=active]:border-[var(--ui-text)]',
        ].join(' '),
      },
    },

    /* Eyebrow / kicker — useful, not built-in. Project apps can reach this
       via <span class="kicker"> or compose with the tokens directly. */
    // kbd: {
    //   slots: {
    //     base: 'font-mono text-[10px] tracking-[0.06em] uppercase border border-[var(--ui-border)] rounded px-1 py-0.5 text-[var(--ui-text-dimmed)]',
    //   },
    // },
  },

  brand: {
    name: 'TB',
    longName: 'Teman Berbahasa',
    palettes: ['ai', 'shu', 'cha', 'sumi'] as const,
    defaultPalette: 'ai',
    themes: ['light', 'dark'] as const,
    defaultTheme: 'light',
  },
});
