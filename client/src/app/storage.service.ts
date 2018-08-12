import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key , data){
    return sessionStorage.setItem(key,data);
  }
  get(key){
    return sessionStorage.getItem(key);
  }
  clear(){
    return sessionStorage.clear();
  }
}
