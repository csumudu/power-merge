import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompareManagerService {
  sourceContent: BehaviorSubject<string> = new BehaviorSubject<string>('');
  targetContent: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  getSourceContent(): Observable<string> {
    return this.sourceContent.asObservable();
  }

  getTargetConent(): Observable<string> {
    return this.targetContent.asObservable();
  }

  setSourceContent(content: string): void {
    this.sourceContent.next(content);
  }

  setTargetConent(content: string): void {
    this.targetContent.next(content);
  }
}
