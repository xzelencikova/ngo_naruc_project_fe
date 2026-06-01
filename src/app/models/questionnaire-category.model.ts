import { QuestionModel } from './question.model';

export interface QuestionnaireCategoryModel {
  icon: string;
  category_order: number;
  category: string;
  questions: QuestionModel[];
}
