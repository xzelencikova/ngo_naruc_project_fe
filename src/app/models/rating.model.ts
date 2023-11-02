import { QuestionRatingModel } from "./question-rating.model";

export interface RatingModel {
    _id?: string,
    date_rated: Date,
    rated_by_user_id?: string,
    client_id: string,
    phase_no: number,
    questions_rating: QuestionRatingModel[]
}