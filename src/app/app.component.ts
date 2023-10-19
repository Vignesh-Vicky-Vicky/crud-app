import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class AppComponent {

  constructor(private _eref: ElementRef) { }

  form_title = "Questions And Answers";

  list_contents: any[] = []

  pushEmptyData() {
    this.list_contents.push({
      question: "untitled",
      answers: [

      ]
    });
  }

  pushExtraAnswer(index: number) {
    this.list_contents[index].answers.push({
      code: "untitled",
      answer: "untitled"
    });
  }

  deleteAnswer(array: any, index: any) {
    array.splice(index, 1);
  }

  editTitle(index: number) {
    this.disableInputFiels();
    this.list_contents[index].editTitle = true;
  }

  editRow(topIndex: number, rowIndex: number) {
    this.disableInputFiels();
    this.list_contents[topIndex].answers[rowIndex].editRow = true;
  }

  disableInputFiels() {
    this.list_contents.forEach((item) => {
      item.editTitle = false;

      item.answers.forEach((ele: any) => {
        ele.editRow = false;
      })
    });
  }

  onClick(event: any) {
    if (!event.target.classList.contains('editor-ele')) {
      this.disableInputFiels();
    }
  }


  saveFormData() {
    setTimeout(() => {
      const keysRemoved = [...this.list_contents];
      const FilteredObj = keysRemoved.map((item) => {
        delete item["editTitle"];

        item.answers.map((ele: any) => {
          delete ele["editRow"];
          return ele;
        })

        return item;
      })

      const payload = {
        questions: FilteredObj,
        title: this.form_title
      };

      console.log(payload);
      
    }, 0);

  }
}
