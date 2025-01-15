export enum Locale {
  ES = "es",
  EN = "en",
}

export const i18n = {
  defaultLocale: Locale.ES,
  locales: [Locale.EN, Locale.ES],
} as const;
