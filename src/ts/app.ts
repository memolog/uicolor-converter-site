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
      <div *ngIf="output" class="output"><pre class="language-swift"><code class="language-swift">{{output}}</code></pre></div>
    `
})
export class AppComponent {
  output: string
  onSubmit(form: any): void {
    let input = form['html-color-code'];
    input = input.replace(/^#/, '');
    let len = input.length;
    let ret:Array<number> = []
    for (let i=0; i<len; i+=2){
      let hexCode = input.substr(i, 2);
      let decimalCode = parseInt(hexCode, 16);
      let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
      ret.push(swiftCode);
    }
    this.output = `UIColor(red:${ret[0]}, green:${ret[1]}, blue:${ret[2]}, alpha:1.0)`
  }
}
