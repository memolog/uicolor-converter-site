import {Component} from 'angular2/core';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
      <form #f="ngForm"
        (ngSubmit)="onSubmit(f.value)">
        <label for="html-color-code">HTML Color Code</label>
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">#</span>
          <input type="text"
                 class="form-control" 
                 placeholder="FFFFFF" 
                 maxlength="7"
                 id="html-color-code"
                 ngControl="html-color-code">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="submit">Go!</button>
          </span>
        </div>
      </form>
      <form #g="ngForm"
        (ngSubmit)="onSubmitRGB(g.value)">
        <label for="rgb">RGB (commna or space separated)</label>
        <div class="input-group">
          <input type="text"
                 class="form-control" 
                 placeholder="255 255 255" 
                 id="rgb"
                 ngControl="rgb">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="submit">Go!</button>
          </span>
        </div>
      </form>
      <div *ngIf="output" class="output"><span class="color-sample" [ngStyle]="{'background-color': bgColor}"></span><pre class="language-swift"><code class="language-swift">{{output}}</code></pre></div>
    `
})
export class AppComponent {
  output: string
  bgColor: string
  onSubmit(form: any): void {
    let input = form['html-color-code'];
    input = input.replace(/^#/, '');
    let len = input.length;
    let ret:Array<number> = []
    let hex:Array<string> = []
    for (let i=0; i<len; i+=2){
      let hexCode = input.substr(i, 2);
      let decimalCode = parseInt(hexCode, 16);
      if (decimalCode !== decimalCode || decimalCode > 255 || decimalCode < 0) {
        throw new Error('Invalid Color');
      }
      let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
      hex.push(hexCode)
      ret.push(swiftCode);
    }
    this.bgColor = `#${hex.join('')}`
    this.output = `UIColor(red:${ret[0]}, green:${ret[1]}, blue:${ret[2]}, alpha:1.0) // #${hex.join('')}`
    setTimeout(()=>{
      Prism.highlightAll(false)
    }, 10)
  }
  onSubmitRGB(form: any): void {
    let input = form['rgb'];
    input = input.split(/[,\b\r\n\s\u0000-\u0029\u003a-\u003b\u007b-\u00a0\u3000-\u301b\uff08-\uff09\uff3b\uff3d\uff5b\uff5d]/);
    let len = input.length;
    let ret:Array<number> = []
    let hex:Array<string> = []    
    for (let i=0; i<len; i++){
      let decimalCode = parseInt(input[i], 10)
      if (decimalCode !== decimalCode || decimalCode > 255 || decimalCode < 0) {
        throw new Error('Invalid Color');
      }
      let hexCode = decimalCode.toString(16)
      let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
      hex.push(hexCode);
      ret.push(swiftCode);
    }
    this.output = `UIColor(red:${ret[0]}, green:${ret[1]}, blue:${ret[2]}, alpha:1.0) // #${hex.join('')}`
    setTimeout(()=>{
      Prism.highlightAll(false)
    }, 10)
  }
}
