import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { languages } from './languages';
import { CompareParam } from '../models/params';

@Injectable({
  providedIn: 'root',
})
export class CompareManagerService {
  sourceContent: BehaviorSubject<string> = new BehaviorSubject<string>('');
  targetContent: BehaviorSubject<string> = new BehaviorSubject<string>('');

  compareParams$: BehaviorSubject<CompareParam> =
    new BehaviorSubject<CompareParam>({
      language: 'plaintext',
      sourcePath: '',
      targetPath: '',
    });

  allLanguages: BehaviorSubject<Array<string>> = new BehaviorSubject<
    Array<string>
  >(languages);

  constructor() {}

  getSourceContent(): Observable<string> {
    return this.sourceContent.asObservable();
  }

  getTargetConent(): Observable<string> {
    return this.targetContent.asObservable();
  }

  setSourceContent(sourcePath: string, content: string): void {
    this.sourceContent.next(content);
    this.compareParams$.next({ ...this.compareParams$.value, sourcePath });
  }

  setTargetConent(targetPath: string, content: string): void {
    this.targetContent.next(content);
    this.compareParams$.next({ ...this.compareParams$.value, targetPath });
  }

  reset() {
    this.setSourceContent('', '');
    this.setTargetConent('', '');
    this.compareParams$.next({
      language: 'plaintext',
      sourcePath: '',
      targetPath: '',
    });
  }
}
