import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class SharingService {
  loadingEmit = new EventEmitter<any>();
  alertEmit = new EventEmitter<any>();
}
