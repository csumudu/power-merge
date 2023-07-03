import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { invoke } from '@tauri-apps/api/tauri';
import { SubSink } from 'subsink';

import { File } from '../../../models/File';
import { MergeManagerService } from '../../../service/merge-manager.service';
import { CompareManagerService } from '../../../service/compare-manager.service';
import { OpenFileManagerService } from '../../../service/open-file-manager.service';

@Component({
  selector: 'app-merge-home',
  templateUrl: './merge-home.component.html',
  styleUrls: ['./merge-home.component.css'],
})
export class MergeHomeComponent implements OnInit, OnDestroy {
  isCollapsed = false;

  mergeCofigFG!: UntypedFormGroup;

  has_conflicts = false;

  merged_file_count = 0;

  sourceFileList: File[] = [];
  targetFileList: File[] = [];
  resultFileList: File[] = [];

  sub: SubSink = new SubSink();

  constructor(
    private fb: UntypedFormBuilder,
    private service: MergeManagerService,
    private compareService: CompareManagerService,
    private openService: OpenFileManagerService,
    private router: Router,
  ) {
    this.mergeCofigFG = this.fb.group({
      sourceFolderPath: ['', [Validators.required]],
      targetFolderPath: ['', [Validators.required]],
      resultFolderPath: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.sub.sink = this.service.getResultFileList().subscribe((list) => {
      this.resultFileList = list;
      console.log('res file list -->', this.resultFileList);
    });

    this.sub.sink = this.service
      .getSourceFileList()
      .subscribe((list) => (this.sourceFileList = list));

    this.sub.sink = this.service
      .getTargetFileList()
      .subscribe((list) => (this.targetFileList = list));

    this.sub.sink = this.service.getMergeParams().subscribe((param) => {
      this.mergeCofigFG.patchValue({
        ...param,
      });
    });

    this.sub.sink = this.service
      .getMergedFileCount()
      .subscribe((c) => (this.merged_file_count = c));

    this.sub.sink = this.service
      .isResultHasConflicts()
      .subscribe((hasConflicts) => (this.has_conflicts = hasConflicts));
  }

  async mergeFolders() {
    let res = await invoke<Array<File>>('merge_folders', {
      source: this.mergeCofigFG.value.sourceFolderPath,
      target: this.mergeCofigFG.value.targetFolderPath,
      result: this.mergeCofigFG.value.resultFolderPath,
    });

    console.log('Merge File set -->', res);
    this.service.setResultFileList(res);
  }

  async onSourceClick(folderType: string) {
    const res: [string, Array<File>] = await invoke('get_folder_file_list', {
      ftype: folderType,
    });

    if (folderType == 'source') {
      this.service.setMergeParams({ sourceFolderPath: res[0] });
      this.service.setSourceFileList(res[1] || []);
    }
    if (folderType == 'target') {
      this.service.setMergeParams({ targetFolderPath: res[0] });
      this.service.setTargetFileList(res[1] || []);
    }
  }

  async onResultClick() {
    const res: string = await invoke('get_selected_folder_path');
    this.service.setMergeParams({ resultFolderPath: res });
  }

  async resolveOne(result_file: any) {
    const source_file = this.sourceFileList.find(
      (f: any) => f.relative_path == result_file.relative_path,
    );
    const target_file = this.targetFileList.find(
      (f: any) => f.relative_path == result_file.relative_path,
    );

    const res = await invoke('resolve_file_conflict', {
      sourceFile: source_file,
      targetFile: target_file,
      resultFolderPath: this.mergeCofigFG.value.resultFolderPath,
    });

    if (res) {
      const resultFileList = this.resultFileList.map((f: any) => {
        let adapted = { ...f };
        if (f.relative_path == result_file.relative_path) {
          adapted.has_conflicts = false;
          adapted.has_merged_content = true;
        }
        return adapted;
      });

      this.service.setResultFileList(resultFileList);
    }
  }

  async openFile(file: File) {
    const resultContent: string = await invoke('open_file_content', {
      path: file.result_path || file.path,
    });

    this.openService.setSourceContent(
      file.result_path || file.path,
      resultContent,
    );

    this.router.navigateByUrl('/merge/open');
  }

  async openFolder() {
    await invoke('open_folder', {
      path: this.mergeCofigFG.value.resultFolderPath,
    });
  }

  clear() {
    this.service.resetMergeParam();
  }

  async compareWithSource(resFile: File) {
    console.log('res-->', resFile);
    const resultContent: string = await invoke('open_file_content', {
      path: resFile.result_path,
    });

    const sourceFile = await this.sourceFileList.find(
      (f) => f.relative_path == resFile.relative_path,
    );

    const sourceContent: string = await invoke('open_file_content', {
      path: sourceFile?.path,
    });

    this.compareService.setSourceContent(sourceFile?.path || '', sourceContent);
    this.compareService.setTargetConent(
      resFile.result_path || '',
      resultContent,
    );

    this.router.navigate(['compare']);
  }

  async compareWithTarget(resFile: File) {
    const resultContent: string = await invoke('open_file_content', {
      path: resFile.result_path,
    });

    const targetFile = await this.targetFileList.find(
      (f) => f.relative_path == resFile.relative_path,
    );

    const targetContent: string = await invoke('open_file_content', {
      path: targetFile?.path,
    });

    this.compareService.setSourceContent(targetFile?.path || '', targetContent);
    this.compareService.setTargetConent(resFile.result_path||"", resultContent);

    this.router.navigate(['compare']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
