import { Injectable } from '@angular/core';
import { File } from '../models/File';
import { Language } from '../models/trnaslation.models';
import { ALL_LANGUAGES } from '../models/all-languages';
import { TranslateTarget } from '../models/translate-targets';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor() {}

  getLanguagesFromFileList(list: Array<File>): Array<Language> {
    const langMap = (list || []).reduce((acc, cuu) => {
      const code = String(cuu.name).replace('.json', '');
      acc[code] = 1;
      return acc;
    }, {});

    return Object.keys(langMap).map((lang) => ({ code: lang, name: lang }));
  }

  getAllLanguages(): Array<Language> {
    return ALL_LANGUAGES;
  }

  getAllTranslateTargets(): Array<TranslateTarget> {
    return [
      {
        name: 'No Automatic Translation',
        code: 'NO',
      },
      {
        name: 'Google Translation API',
        code: 'google',
      },
      {
        name: 'ChatGPT Translation API',
        code: 'chatGpt',
      },
      {
        name: 'Microsoft Translator API',
        code: 'microsoft',
      },
    ];
  }
}
