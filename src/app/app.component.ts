import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectorRef, Input
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<svg:svg #svgZoom xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" id="topo2">' +
    '<svg:text x="500" y="400" text-anchor="middle" text-decoration="underline">' +
    'Vexing SVG text with surrounding box length problem</svg:text>\n' +
    '  <svg:text x="500" y="500" text-anchor="end">Current number:</svg:text>\n' +
    '  <svg:text x="500" y="520" text-anchor="end">Last number:</svg:text>\n' +
    '  <svg:text x="500" y="580" text-anchor="middle">' +
    'See how the length of the text box is always the length of the last number</svg:text>\n' +
    '  <svg:text x="500" y="620" text-anchor="middle">' +
    'This is because the text is rendered by the browser after eveything else is in place</svg:text>\n' +
    '  <svg:text #mytext x="500" y="500">{{title}}</svg:text>\n' +
    '  <svg:rect #myrect x="500" y="475" width="0" height="30" style="fill-opacity:0.1"></svg:rect>\n' +
    '  <svg:text x="500" y="520">{{lastNumber}}</svg:text>\n' +
    '</svg:svg>',
})
export class AppComponent implements OnInit, AfterViewInit {
  @Input() title = 'testsvg';
  @ViewChild('mytext', {static: true}) mytext: ElementRef;
  @ViewChild('myrect', {static: true}) myrect: ElementRef;
  lastNumber = '';

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    setInterval(() => {
      const places = Math.floor(Math.random() * 10);
      this.lastNumber = this.title;
      this.title = Math.floor(Math.random() * Math.pow(10, places)).toString();
      // this.title = places.toString();
      this.updateLength();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.updateLength();
  }

  updateLength() {
    const mytextSvg = this.mytext.nativeElement as SVGTextElement;
    const txtWidth = mytextSvg.getComputedTextLength();
    const myrectSvg = this.myrect.nativeElement as SVGRectElement;
    myrectSvg.setAttribute('width', txtWidth.toString());
  }
}
