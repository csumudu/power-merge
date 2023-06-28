import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { File } from '../models/File';
import { MergeParam } from '../models/params';

@Injectable({
  providedIn: 'root',
})
export class MergeManagerService {
  initialState: MergeParam = {
    resultFolderPath: '',
    sourceFolderPath: '',
    targetFolderPath: '',
  };

  sourceFileList: BehaviorSubject<Array<File>> = new BehaviorSubject<
    Array<File>
  >([]);
  targetFileList: BehaviorSubject<Array<File>> = new BehaviorSubject<
    Array<File>
  >([]);
  resultFileList: BehaviorSubject<Array<File>> = new BehaviorSubject<
    Array<File>
  >([]);

  mergeParams: BehaviorSubject<MergeParam> = new BehaviorSubject<MergeParam>({
    ...this.initialState,
  });

  constructor() {}

  getSourceFileList(): Observable<Array<File>> {
    return this.sourceFileList.asObservable();
  }
  getTargetFileList(): Observable<Array<File>> {
    return this.targetFileList.asObservable();
  }
  getResultFileList(): Observable<Array<File>> {
    return this.resultFileList.asObservable();
  }

  setSourceFileList(list: Array<File>): void {
    this.sourceFileList.next(list);
  }
  setTargetFileList(list: Array<File>): void {
    this.targetFileList.next(list);
  }
  setResultFileList(list: Array<File>): void {
    this.resultFileList.next(list);
  }

  getMergeParams() {
    return this.mergeParams.asObservable();
  }

  setMergeParams(params: Partial<MergeParam> = {}) {
    const existing = this.mergeParams.value;
    this.mergeParams.next({ ...existing, ...params });
  }

  getMergedFileCount() {
    return this.resultFileList.pipe(
      map((files) => files.filter((f: any) => !f.has_conflicts).length),
    );
  }

  isResultHasConflicts() {
    return this.resultFileList.pipe(
      map((files) => files.some((f: any) => f.has_conflicts)),
    );
  }

  resetMergeParam() {
    this.setMergeParams({ ...this.initialState });
    this.setResultFileList([]);
    this.setSourceFileList([]);
    this.setTargetFileList([]);
  }
}
