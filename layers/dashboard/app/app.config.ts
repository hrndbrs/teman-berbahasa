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
          'transition-colors duration-150 ease-(--ease-out-soft)',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          'cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        ],
      },
    },

    card: {
      slots: {
        root: 'bg-default ring-1 ring-default rounded-(--radius-card) shadow-(--shadow-soft)',
        header: 'px-5 py-4 border-b border-muted',
        body: 'px-5 py-4',
        footer: 'px-5 py-3 border-t border-muted',
      },
    },

    badge: {
      slots: {
        base: [
          'inline-flex items-center gap-1',
          'font-mono text-3xs tracking-[0.08em] uppercase',
        ],
      },
    },

    input: {
      slots: {
        base: [
          'bg-muted ring-1 ring-default',
          'rounded-md text-body-sm placeholder:text-dimmed',
          'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none',
        ],
      },
      defaultVariants: { size: 'md', variant: 'outline' },
    },

    select: {
      slots: {
        base: 'bg-muted ring-1 ring-default rounded-md',
      },
    },

    table: {
      slots: {
        th: 'font-mono text-label tracking-loose uppercase text-dimmed font-medium bg-muted px-3 py-2.5 border-b border-default',
        td: 'px-4 py-3 border-b border-muted text-body-sm align-middle',
        tr: 'transition-colors hover:bg-muted',
      },
    },

    modal: {
      slots: {
        overlay: 'bg-black/45 backdrop-blur-sm',
        content:
          'bg-default rounded-(--radius-card) ring-1 ring-default shadow-(--shadow-pop) max-w-[45rem]',
      },
    },

    tabs: {
      slots: {
        list: 'border-b border-default gap-1',
        trigger: [
          'px-3.5 py-2.5 text-muted',
          'border-b-2 border-transparent -mb-px',
          'data-[state=active]:text-default data-[state=active]:border-(--ui-text)',
        ],
      },
    },

    /* Eyebrow / kicker — useful, not built-in. Project apps can reach this
       via <span class="kicker"> or compose with the tokens directly. */
    // kbd: {
    //   slots: {
    //     base: 'font-mono text-label tracking-[0.06em] uppercase border border-default rounded px-1 py-0.5 text-dimmed',
    //   },
    // },

    navigationMenu: {
      compoundVariants: [
        {
          variant: 'pill',
          active: true,
          highlight: false,
          class: {
            link: 'before:bg-inverted',
          },
        },
        {
          color: 'neutral',
          variant: 'pill',
          active: true,
          class: {
            link: 'text-inverted',
            linkLeadingIcon:
              'text-inverted group-data-[state=open]:text-inverted',
          },
        },
      ],
    },
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
