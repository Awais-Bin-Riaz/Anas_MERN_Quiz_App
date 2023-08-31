import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from '../redux/question_reducer';

export const useFetchQestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });
    useEffect(() => {
        setGetData({ isLoading: true });
        (async () => {
            try {
                const [{ questions, answers }] = await getServerData(`https://quiz-app-6hr9.onrender.com/api/questions`, data => data);
                
                if (questions.length > 0) {
                    setGetData({ isLoading: false, apiData: questions });
                    dispatch(Action.startExamAction({ question: questions, answers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData({ isLoading: false, serverError: error });
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};

export const MoveNextQuestion = () => async dispatch => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error);
    }
};

export const MovePrevQuestion = () => async dispatch => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error);
    }
};