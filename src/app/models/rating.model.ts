import { QuestionRatingModel } from "./question-rating.model";

export interface RatingModel {
    _id?: number,
    date_rated: Date,
    rated_by_user_id?: string,
    client_id: number,
    phase_no: number,
    questions_rating: QuestionRatingModel[]
}