import { QuestionRatingModel } from './question-rating.model';

export interface RatingModel {
  id?: number;
  last_update_date: Date;
  last_update_by?: string;
  client: string;
  client_id: number;
  phase: number;
  ratings: QuestionRatingModel[];
}
