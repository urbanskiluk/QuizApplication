import { useState, useEffect } from "react";
import Select, { components } from 'react-select'

import RankingButton from "./RankingButton";
import LogoutButton from "./LogoutButton";
import SubmitFinalResultButton from "./SubmitFinalResultButton";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import axios from './api/axios'
import './Page.css'



const Page = ({ login, setRankingPage, data }) => {

    const dbGeographyUrl = 'api/db/geography'
    const dbMathUrl = 'api/db/math'
    const dbPhysicsUrl = 'api/db/physics'

    console.log("login in Page", login);
    console.log("Ranking data: " + data);

    const [counter, setCounter] = useState(30);
    const [isActive, setIsActive] = useState(true);

    const [totalTimeOfAnserwing, setTotalTimeOfAnswering] = useState(0);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setCounter(0);
        setIsActive(false);
    };

    useEffect(() => {
        if (isActive) {
            const timer =
                counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            return () => clearInterval(timer);
        } else if (!isActive && counter !== 0) {
            clearInterval(counter);
        }
    }, [counter, isActive]);

    const [selectedCategory, setSelectedCategory] = useState(' ');
    const [isSubmitSelectCategory, setIsSubmitSelectCategory] = useState(false)


    const [questionNumber, setQuestionNumber] = useState(1);
    const [collectedPoints, setCollectedPoints] = useState(0);

    const [userAnswers, setUserAnswers] = useState([]);

    const [questionCounter, setQuestionCounter] = useState(0)

    const handleNextQuestion = async () => {

        if (questions.question[questionCounter].correctAnswer[0] === currentUserAnswer) {
            setCollectedPoints(collectedPoints + 1)
        }

        if (currentUserAnswer === ' ') {
            setCurrentUserAnswer('X')
            setUserAnswers([...userAnswers, currentUserAnswer])
            setCurrentUserAnswer(' ')
        }
        else {
            setUserAnswers([...userAnswers, currentUserAnswer])
            setCurrentUserAnswer(' ')
        }

        console.log("User answers: ", userAnswers, "questionCounter: ", questionCounter, "collectedPojnts: ", collectedPoints)
        setQuestionCounter(questionCounter + 1)

        setQuestionNumber(questionNumber + 1);
        console.log("Next slajd plis " + selectedCategory.value + " question number: " + questionCounter);
        setTotalTimeOfAnswering(totalTimeOfAnserwing + (30 - counter));
        reset();
        setCounter(30);
        setIsActive(true);
    }

    const handleSubmitSelectCategory = async () => {
        // if (selectedCategory.value !== "geografia")
        // {
        //     console.log("Nie wybrano zadnej kategorii")
        //     //return
        // }

        setCurrentUserAnswer(' ')
        setIsSubmitSelectCategory(true);
        fetchData()

        //setTotalTimeOfAnswering(totalTimeOfAnserwing + (30 - counter));
        reset();
        setCounter(30);
        setIsActive(true);
        console.log("handleSubmitSelectCategory kategoria: ", selectedCategory.value)

    }

    const [questions, setQuestions] = useState([]);
    const [currentUserAnswer, setCurrentUserAnswer] = useState(' ')

    const fetchData = async () => {
        console.log("fetch data selectedCategory: ", selectedCategory)
        if (selectedCategory.value === "geografia") {
            try {
                console.log("Selected category - geografia")
                const response = await axios.get(dbGeographyUrl);
                console.log("Pobrano tablicę pytan DLA GEOGRAFIA", response.data.question[0].question)
                setQuestions(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        }
        else if (selectedCategory.value === "fizyka") {
            try {
                console.log("Selected category - fizyka")
                const response = await axios.get(dbPhysicsUrl);
                console.log("Pobrano tablicę pytan DLA FIZYKA ", response.data.question[0].question)
                setQuestions(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        }
        else if (selectedCategory.value === "matematyka") {
            try {
                console.log("Selected category - matematyka")
                const response = await axios.get(dbMathUrl);
                console.log("Pobrano tablicę pytan DLA MATEMATYKA ", response.data.question[0].question)
                setQuestions(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        }
        else {
            console.log("WYBRANO INVALID KATEGORIE - PYTANIA NIE ZOSTALY ODCZYTANE!!!")
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectCategory = async (selectedOption) => {
        console.log("Option selected: ", selectedOption.value);
        setSelectedCategory(selectedOption);
        fetchData()
        console.log("Use state: ", questions)
        //console.log("Use state drugie pytanie i odpowiedz: ", questions.question[0].question, " odp: ", questions.question[0].answerA)

    }

    function handleUserAnswer(answer) {
        console.log("handle user answer: " + answer);


        setCurrentUserAnswer(answer)
        console.log("All users answers: " + userAnswers);
        //setAnswerToCurrentQuestion(answer);

    }

    const options = [
        { value: 'geografia', label: 'Geografia', color: '#abcfca' },
        { value: 'fizyka', label: 'Fizyka', color: '#abcfcf' },
        { value: 'matematyka', label: 'Matematyka', color: '#abcfcf', fontColor: '#00ff00' }
    ];


    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontWeight: state.isSelected ? "bold" : "normal",
            color: "white",
            backgroundColor: state.data.color,
            fontSize: state.selectProps.myFontSize
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.data.color,
            fontSize: state.selectProps.myFontSize
        })
    };

    const separatorStyle = {
        border: "none",
        height: "11px",
        color: "#1c11cc",
        backgroundColor: "#ccddcc",
        marginTop: "20px",
        marginBottom: "20px"
    }

    return (
        <div>
            {
                questionCounter !== 5 ? (
                    ((selectedCategory.value === 'geografia' || selectedCategory.value === 'fizyka' || selectedCategory.value === 'matematyka'))
                        && isSubmitSelectCategory === true ? (
                        <div className="page">

                            Pytanie numer {questionCounter}<br />
                            Pozostały czas na udzielenie odpowiedzi
                            <div id="pomodoro-timer">
                                {" "}
                                {/* <CountdownCircleTimer
                                    onComplete={() => {
                                        console.log("Timer expired");
                                        handleNextQuestion();
                                        //setTotalTimeOfAnswering(totalTimeOfAnserwing + 30);
                                        setCounter(30);
                                        setIsActive(true);
                                        return [true]; // repeat animation in 1.5 seconds
                                    }}
                                    isPlaying
                                    duration={counter}
                                    colors="#E5007B"
                                >
                                    
                                </CountdownCircleTimer> */}
                            </div>
                            <div>{counter}</div>
                            <div className="questionAndAnswers" onChange={(e) => handleUserAnswer(e.target.value)}>


                                <div className="radio-group">
                                    <label className="question">

                                        {questions.question[questionCounter].question} <br /><br />

                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="A" className="radio-input" />
                                        <span className="radio-label">{"A  " + questions.question[questionCounter].answerA}</span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="B" className="radio-input" />
                                        <span className="radio-label">{"B  " + questions.question[questionCounter].answerB}</span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="C" className="radio-input" />
                                        <span className="radio-label">{"C  " + questions.question[questionCounter].answerC}</span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="D" className="radio-input" />
                                        <span className="radio-label">{"D  " + questions.question[questionCounter].answerD}</span>
                                    </label>
                                </div>


                                <button className="nextQuestion" onClick={handleNextQuestion}>Submit answer</button>
                            </div>

                        </div>

                    ) :
                        (
                            <div>
                                <div className="twoButtons">
                                    <LogoutButton />
                                    <RankingButton setRankingPage={setRankingPage} />
                                </div>
                                <form className="categoryChoiceForm" onSubmit={handleSubmitSelectCategory} >

                                    <div >
                                        <div className="fontForMsg">
                                            Jeśli chcesz wziąć udział w quizie wybierz dziedzinę spośród dostępnych<br /><br /><br />
                                        </div>

                                        <Select options={options} onChange={handleSelectCategory} autoFocus={true} menuColor='red' styles={styles} width='670px'

                                        /><br /><br /><br />

                                        <input className="submitChooseCategory" type="submit" value="Wybierz kategorie" /><br />
                                    </div>
                                    <br />
                                </form>
                            </div>
                        )

                ) :
                    (<div className="finalResults">
                        Uzyskano punktów: {collectedPoints} w czasie {totalTimeOfAnserwing}s<br /><br />
                        Twoje odpowiedzi na pytania były następujące:<br /><br />

                        <div>
                            {questions.question.map((item, index) => (
                                <div>
                                    Pytanie {index + 1}: <br />
                                    {item.question} <br />
                                    A: {item.answerA} <br />
                                    B: {item.answerB} <br />
                                    C: {item.answerC} <br />
                                    D: {item.answerD} <br /><br />
                                    {userAnswers[index] === item.correctAnswer[0] ? (<div>
                                        <div className="correctAnswerSummary">Twoja odpowiedź: {userAnswers[index]}<br />
                                            Poprawna odpowiedź: {item.correctAnswer}</div><br />
                                    </div>
                                    ) :
                                        (
                                            <div>
                                                <div className="wrongAnswerSummary">Twoja odpowiedź: {userAnswers[index]}<br />
                                                    Poprawna odpowiedź: {item.correctAnswer}</div><br />
                                            </div>
                                        )}

                                    <hr
                                        style={separatorStyle}
                                    />
                                </div>
                            ))}
                        </div>

                        <SubmitFinalResultButton
                            domainForRanking={selectedCategory.value}
                            setCollectedPoints={setCollectedPoints}
                            setUserAnswers={setUserAnswers}
                            setQuestionCounter={setQuestionCounter}
                            login={login}
                            setQuestionNumber={setQuestionNumber}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            setIsSubmitSelectCategory={setIsSubmitSelectCategory}
                            correctAnswers={collectedPoints}
                            time={totalTimeOfAnserwing}
                            totalQuestions={5} />
                    </div>)
            }
        </div>


    )
}

export default Page;


