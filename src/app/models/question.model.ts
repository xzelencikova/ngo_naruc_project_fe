export interface QuestionModel {
  id: number;
  question: string;
  category?: string;
  icon?: string;
  category_order?: string;
  is_valid: boolean;
}
