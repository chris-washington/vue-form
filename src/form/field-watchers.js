import { BehaviorSubject } from 'rxjs';

export default class VueFieldWatchers {
  constructor() {
    this.inputWatcher = new BehaviorSubject();
    this.changeWatcher = new BehaviorSubject();
  }

  getInputWatcherSubject() {
    return this.inputWatcher;
  }

  getInputWatcher() {
    return this.getInputWatcherSubject().asObservable();
  }

  getChangeWatcher() {
    return this.getChangeWatcherSubject().asObservable();
  }

  getChangeWatcherSubject() {
    return this.changeWatcher;
  }
}
