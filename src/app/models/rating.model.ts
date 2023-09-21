import { QuestionRatingModel } from "./question-rating.model";

export interface RatingModel {
    date_rated: Date,
    rated_by_user_id?: String,
    client_id: String,
    phase_no: Number,
    questions_rating: QuestionRatingModel[]
}