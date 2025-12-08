import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Desteklenen tüm diller
  locales: ['en', 'tr', 'ar'],

  // Varsayılan dil
  defaultLocale: 'tr',

  // Locale prefix stratejisi - always show locale in URL
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
