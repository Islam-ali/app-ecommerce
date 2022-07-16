import { Component,Inject, PLATFORM_ID,Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  isBrowser: boolean;
  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) platformId: Object){
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      let loader = this.renderer.selectRootElement('#Loading')
      const body = document.getElementsByTagName("body");

      this.renderer.setStyle(loader, 'display', 'none')
      body[0].style.overflowY = 'scroll'

    }
  }
}
