export class BaseController {
  timer: ReturnType<typeof setTimeout> | null = null;

  public clear() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
