import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpenParam } from '../models/params';

@Injectable({
  providedIn: 'root',
})
export class OpenFileManagerService {
  sourceContent: BehaviorSubject<string> = new BehaviorSubject<string>('');

  openParams$: BehaviorSubject<OpenParam> = new BehaviorSubject<OpenParam>({
    language: 'plaintext',
    sourcePath: '',
  });

  constructor() {}

  getSourceContent(): Observable<string> {
    return this.sourceContent.asObservable();
  }

  setSourceContent(sourcePath: string, content: string): void {
    this.sourceContent.next(content);
    this.openParams$.next({ ...this.openParams$.value, sourcePath });
  }

  reset() {
    this.sourceContent.next('');
    this.openParams$.next({ language: 'plaintext', sourcePath: '' });
  }
}
