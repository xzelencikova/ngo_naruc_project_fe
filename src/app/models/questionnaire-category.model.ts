import { QuestionModel } from "./question.model";

export interface QuestionnaireCategoryModel {
    icon: string,
    order: number,
    category: string,
    questions: QuestionModel[]
}