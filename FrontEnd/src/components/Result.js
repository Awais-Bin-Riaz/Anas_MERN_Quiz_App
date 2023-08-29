import React, { useEffect } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';

export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);
    const totalPoints = queue.length * 20;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 20);
    const flag = flagResult(totalPoints, earnPoints);

    usePublishResult({
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achived: flag ? "Passed" : "Failed"
    });

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>
            <div className='result flex-center'>
                <div className='flex'>
                    <span style={{paddingRight: "3vmax", fontWeight:"bolder"}}>Username : </span>
                    <span style={{fontWeight:"bold", fontSize:"1.8vmax", textShadow:"2px 1px gray"}} className='bold'>{userId || ""}</span>
                </div>
                <div className='flex'>
                    <span style={{paddingRight: "3vmax", fontWeight:"bolder"}}>Total Quiz Points :</span>
                    <span  style={{fontWeight:"bold", fontSize:"1.8vmax", textShadow:"2px 1px gray"}} className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span style={{paddingRight: "3vmax", fontWeight:"bolder"}}>Total Questions :</span>
                    <span style={{fontWeight:"bold", fontSize:"1.8vmax", textShadow:"2px 1px gray"}} className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span style={{paddingRight: "3vmax", fontWeight:"bolder"}}>Total Attempts :</span>
                    <span style={{fontWeight:"bold", fontSize:"1.8vmax", textShadow:"2px 1px gray"}} className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span style={{paddingRight: "3vmax", fontWeight:"bolder"}}>Total Earn Points :</span>
                    <span style={{fontWeight:"bold", fontSize:"1.8vmax", textShadow:"2px 1px gray"}} className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span style={{paddingRight: "3vmax", fontWeight:"bolder"}}>Quiz Result</span>
                    <span style={{ fontWeight:"bold", fontSize:"1.8vmax", textShadow:"2px 1px gray",color: `${flag ? "#2aff95" : "#ff2a66"}` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
                </div>
            </div>
            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>
            <div className="container">
                <ResultTable />
            </div>
        </div>
    );
}
