import { Evaluation } from "../models/Evaluation";
import { API_URL } from "../constants";

export class EvaluationService {
    evaluations:Evaluation[]

    constructor() {
        this.evaluations = []
    }

    async fetch_evaluation(id:number){
        const result= await fetch(API_URL + "/api/evaluation/" + id)
        const jsonEvaluation = await result.json()
        const newEvaluation = Evaluation.from_json(jsonEvaluation)
        this.evaluations.push(newEvaluation)
        return newEvaluation
    }

    async fetch_evaluation_blob(id:number){
        const result= await fetch(API_URL + "/api/evaluation/" + id)
        const evaluation = await result.blob()
        return evaluation
    }

    async save_evaluation(evaluation:Evaluation){
        const result = await fetch(API_URL + '/api/evaluation', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: evaluation.to_json(),
        })
        const data = await result.json()
        evaluation.id = data.id
        evaluation.native_forest_area = data.native_forest_area
        evaluation.evaluated_area = data.evaluated_area
        evaluation.percent_forest_area = data.percent_forest_area
        

        return data
    }
}