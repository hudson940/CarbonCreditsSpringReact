import { Evaluation } from "../models/Evaluation";
import { API_URL } from "../constants";
import { Circle } from "../models/Circle";
import { Point } from "../models/Point";

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
}