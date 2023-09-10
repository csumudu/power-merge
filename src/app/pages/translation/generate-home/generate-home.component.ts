import { Component } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { File } from '../../../models/File';
import { TranslationService } from '../../../service/translation.service';
import { Language } from '../../../models/trnaslation.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateTarget } from '../../../models/translate-targets';

@Component({
  selector: 'app-generate-home',
  templateUrl: './generate-home.component.html',
  styleUrls: ['./generate-home.component.css'],
})
export class GenerateHomeComponent {
  allFiles: Array<File> = [];
  allLanguages: Array<Language> = [];
  allTranslateTargets: Array<TranslateTarget> = [];

  sourceFileList: Array<File> = [];

  languages: Array<Language> = [];

  selectedLanguage?: Language;

  selectedFile?: File;

  options = {
    theme: 'vs-dark',
    language: 'json',
  };

  source = '';
  folderPath = '';

  generateFG!: FormGroup;

  constructor(private service: TranslationService, private fb: FormBuilder) {
    this.allTranslateTargets = this.service.getAllTranslateTargets();

    this.generateFG = fb.group({
      sourcePath: ['', [Validators.required]],
      language: ['', [Validators.required]],
      translationTarget: [
        this.allTranslateTargets[0].code,
        [Validators.required],
      ],
    });

    this.allLanguages = this.service.getAllLanguages();
  }

  async generate() {
    const res: Array<File> = await invoke('generate_translations', {
      source: this.generateFG.value.sourcePath,
      language: this.generateFG.value.language?.code,
      api: this.generateFG.value.translationTarget,
    });

    console.log('RS-->', res);
    this.allFiles = res;
    this.updateView();
  }

  clear() {
    this.allFiles = [];
    this.sourceFileList = [];
    this.languages = [];
    this.source = '';
    this.folderPath = '';
  }

  async onSourceClick() {
    const res: [string, Array<File>] = await invoke('get_folder_file_list', {
      ftype: 'source',
    });

    this.folderPath = res[0];
    this.generateFG.patchValue({
      sourcePath: res[0],
    });
    this.allFiles = res[1] || [];
    this.updateView();
  }

  updateView() {
    this.languages = this.service.getLanguagesFromFileList(this.allFiles);
    this.languages = this.languages
      .filter((f) => f.code == 'en')
      .concat(this.languages.filter((x) => x.code != 'en'));
    this.selectedLanguage = this.languages[0];
    this.populateFileList();
  }

  populateFileList() {
    this.sourceFileList = this.allFiles.filter((f) =>
      this.selectedLanguage
        ? f.name.includes(this.selectedLanguage?.code)
        : false,
    );
    if (this.sourceFileList.length) {
      this.openFile(this.sourceFileList[0]);
    }
  }

  async openFile(file: File) {
    this.selectedFile = file;

    const resultContent: string = await invoke('open_file_content', {
      path: file.path,
    });

    this.source = resultContent;
  }

  onSelect(x: Language) {
    this.selectedLanguage = x;
    this.populateFileList();
  }
}
