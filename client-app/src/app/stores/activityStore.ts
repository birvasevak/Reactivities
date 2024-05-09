import { makeAutoObservable } from "mobx";

export default class ActivityStore {
  title = "hello";

  constructor() {
    makeAutoObservable(this);
  }

  setTitle = () => {
    this.title = this.title + "!";
  };
}
