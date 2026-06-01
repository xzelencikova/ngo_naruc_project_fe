export interface QuestionRatingModel {
  question_id: number;
  question: String;
  category: String;
  category_order: number;
  icon: String;
  rating_id: number;
  rating: number | null;
}
