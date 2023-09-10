import { Component } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { File } from '../../../models/File';
import { TranslationService } from '../../../service/translation.service';
import { Language } from '../../../models/trnaslation.models';

@Component({
  selector: 'app-analize-home',
  templateUrl: './analize-home.component.html',
  styleUrls: ['./analize-home.component.css'],
})
export class AnalizeHomeComponent {
  allFiles: Array<File> = [];

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

  constructor(private service: TranslationService) {}

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
    this.allFiles = res[1] || [];

    this.languages = this.service.getLanguagesFromFileList(this.allFiles);
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
