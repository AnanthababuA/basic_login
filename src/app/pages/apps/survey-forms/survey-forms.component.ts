import { Component } from '@angular/core';

@Component({
  selector: 'app-survey-forms',
  templateUrl: './survey-forms.component.html',
  styleUrls: ['./survey-forms.component.scss']
})
export class SurveyFormsComponent {

  choice_type = {
    "shortanswer": "Short Text",
    "paragraph": "Long Text",
    "radio": "Multiple Choice",
    "Checkbox": "Checkbox",
    // "boolean": "True/False"
  };

  selectedChoiceType: string | undefined;
  shortAnswerText: string | undefined;

  survey_forms: any;

  questions: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.survey_forms = {
      title: "Survey Title" 
    };
  }

 

  onTitleChange(event: any) {
    // Update survey_forms.title with the text content of the <h2> element
    const newText = event.target.textContent || '';
    if (newText.trim() === '') {
        // If the text is empty or contains only white spaces, reset it
        event.target.textContent = '';
        this.survey_forms.title = '';
    } else {
        // Otherwise, update the title with the new text
        this.survey_forms.title = newText;
    }
}

// onTitleChange(event: any) {
//   const newText = event.target.textContent || '';
//   if (newText.trim() === 'Survey Title') {
//       // If the text is the default placeholder, reset it
//       event.target.textContent = '';
//       this.survey_forms.title = '';
//   } else {
//       // Otherwise, update the title with the new text
//       this.survey_forms.title = newText;
//   }
// }


  onQuestionTextChange(event: any, question: any) {
    // Update the question text in your data model

    console.log("text", event, question)


    if (event.target.textContent.trim() !== '') {
      question.Q_text = event.target.textContent.trim();
  } else {
      question.Q_text = "Enter question text";
  }
  }

  addQuestion() {
    // Create a new question object and push it to the questions array
    const newQuestion = {
      Q_n: this.questions.length + 1, // Auto-increment question number
      Q_text: "Enter question text",
      Q_type: "MCQ", // Default question type
      Q_choices: [], // Initialize an empty array for question choices
      ans_required: "yes" // Default answer requirement
    };
    this.questions.push(newQuestion);
  }

  updateQType(question: any) {
    question.Q_type = question.selectedChoiceType;

    console.log("Q type", question.Q_type)

    if(question.Q_type === 'radio'){
      question.Q_choices = [];
      for(let i=0; i<2; i++){

        this.addChoice(question);
      }
      
    }

    if(question.Q_type === 'Checkbox'){
      question.Q_choices = [];
      for(let i=0; i<2; i++){

        this.addChoice(question);
      }
    }
}

  addChoiceWithType(choiceType: string) {
    this.selectedChoiceType = choiceType;

    console.log("ch", this.selectedChoiceType)

    this.questions.forEach(question => {
      question.Q_choices.push(       
        {
        ch_id: question.Q_choices.length + 1,
        ch_text: "Enter choice text",
        ch_type: choiceType
      });
    });
  }

  onChoiceTextChange(event: any, question: any, index: number) {
    // Handle the text change for the choice
    console.log("choice text", question, index)
    question.Q_choices[index].ch_text = event.target.textContent.trim();
  }

//   onChoiceTextChange(event: Event, question: any, index: number) {
//     // Update the choice text in the corresponding question
//     console.log("choice text", question, index)

//     const newText = (event.target as HTMLElement).innerText;
//     question.Q_choices[index].ch_text = newText;
// }


  addOption(questionId: number) {
    const question = this.questions.find(q => q.id === questionId);
    // if (question) {
    //   const newOption: MCQOption = {
    //     id: question.options.length + 1,
    //     optionText: '',
    //     isCorrect: false
    //   };
    //   question.options.push(newOption);
    // }
  }

  deleteOption(questionId: number, optionId: number) {
    const question = this.questions.find(q => q.id === questionId);
    // if (question) {
    //   question.options = question.options.filter(option => option.id !== optionId);
    // }
  }

  addChoice(question: any) {
    console.log("que choice", question);
    const newChoice = {
      ch_id: question.Q_choices.length + 1,
      ch_text: "Enter choice text",
      ch_type: question.selectedChoiceType,
      enabled: false  // Initially, the new choice is disabled
    };
    question.Q_choices.push(newChoice);
}

toggleChoiceEnabled(question: any, index: number) {
    question.Q_choices[index].enabled = !question.Q_choices[index].enabled;
}

submit() {
  console.log("questions", this.questions)
}

}
