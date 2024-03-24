import React, { useState, useEffect } from 'react';
import axios from './api/axios';

const storeNewRankingEntryUrl = 'api/db/ranking/storeNewRankingEntry';
const getRankingUrl = 'api/db/ranking/';

const SubmitFinalResultButton = ({
    domainForRanking,
    setCollectedPoints,
    setUserAnswers,
    setQuestionCounter,
    login,
    setQuestionNumber,
    selectedCategory,
    setSelectedCategory,
    setIsSubmitSelectCategory,
    correctAnswers,
    time,
    totalQuestions
}) => {

    const [handleTimes, setHandleTimes] = useState(0);
    const [domain, setDomain] = useState(' ');

    const handleClick = async () => {
        console.log("handle submit final result button click")
        setDomain(selectedCategory.value);

        let responseData = []
        let t = '';
        if (time >= 60) {
            let min = (time - time % 60) / 60;
            t = '' + min + ':' + time % 60
            if (time % 60 === 0) {
                t = '' + min + ':00';
            }
            else if (time % 60 < 10) {
                t = '' + min + ':0' + time % 60
            }
            else {
                t = '' + min + ':' + time % 60
            }
        }
        else {
            if (time >= 10) {
                t = '0:' + time
            }
            else {
                t = '0:0' + time
            }

        }

        console.log("From page: login: ", login, " correctanswers: ", correctAnswers, " time: ", t, " totalQQuestions: ", totalQuestions, " domain ", domainForRanking)


        try {
            const response = await axios.post(storeNewRankingEntryUrl, JSON.stringify({
                login,
                correctAnswers,
                time: t,
                totalQuestions,
                domain: domainForRanking
            }),
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )

            console.log("Response after uloading new ranking entry: ", response.data)
        }
        catch (err) {
            if (!err?.response) {
                console.log('No internet connection')
            }
            else if (err.response?.status === 409) {
                console.log('User name taken')
            }
            else {
                console.log('Registration failed')
            }
        }

        console.log("Before changing state to have new serie of uestions");
        setQuestionNumber(0);
        setIsSubmitSelectCategory(false);
        setHandleTimes(0);
        setSelectedCategory(' ');
        setQuestionCounter(0)
        setUserAnswers([])
        setCollectedPoints(0)

        setHandleTimes(handleTimes + 1);
    }

    // useEffect(() => {
    //     handleClick()
    // }, [])

    return (
        <button className="submitFinalResultButton" onClick={handleClick}>
            Submit Final Result
        </button>
    )
}
export default SubmitFinalResultButton;