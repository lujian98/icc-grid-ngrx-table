export interface IccLanguage {
  isocode: string;
  name?: string;
  nativeName?: string;
}

export const languages: IccLanguage[] = [
  {
    isocode: 'en-US',
    name: 'English',
    nativeName: 'English',
  },
  {
    isocode: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  },
  {
    isocode: 'fr',
    name: 'French',
    nativeName: 'Français',
  },
  {
    isocode: 'ja',
    name: 'Japanese',
    nativeName: '日本',
  },
  {
    isocode: 'zh-CN',
    name: 'Simplified Chinese',
    nativeName: '简体中文',
  },
];
