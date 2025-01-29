import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requestCount = 0;
  private loading = new BehaviorSubject<boolean>(false);

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  startLoading(): void {
    if (this.requestCount === 0) {
      this.loading.next(true);
    }
    this.requestCount++;
  }

  stopLoading(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.loading.next(false);
    }
  }
}