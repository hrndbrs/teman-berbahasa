export const useContact = () => {
  const config = useRuntimeConfig();

  const whatsappUrl = computed(() =>
    config.public.phoneNumber
      ? `https://wa.me/${config.public.phoneNumber}`
      : ''
  );

  const instagramUrl = computed(() =>
    config.public.instagramHandle
      ? `https://instagram.com/${config.public.instagramHandle}`
      : ''
  );

  const tiktokUrl = computed(() => {
    const raw = config.public.tiktokHandle || '';
    const handle = raw.startsWith('@') ? raw.slice(1) : raw;
    return handle ? `https://www.tiktok.com/@${handle}` : '';
  });

  return {
    phoneNumber: config.public.phoneNumber as string,
    instagramHandle: config.public.instagramHandle as string,
    whatsappUrl,
    instagramUrl,
    tiktokUrl,
  };
};
