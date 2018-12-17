import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { Alert, AlertType } from "../interfaces/alert";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  private subject = new Subject();
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.clear();
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  error(message: string) {
    this.alert(AlertType.Error, message);
  }

  alert(type, message: string) {
    this.subject.next({ type: type, message: message });
  }

  clear() {
    this.subject.next();
  }
}
