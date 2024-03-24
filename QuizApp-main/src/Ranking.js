import { useState, useEffect } from "react";
import Select, { components } from 'react-select'
import axios from './api/axios'

import './Ranking.css'

const getRankingGeographyUrl = '/api/db/ranking/geografia';
const getRankingPhysicsUrl = 'http://localhost:3001/api/db/ranking/fizyka/';
const getRankingMathUrl = 'http://localhost:3001/api/db/ranking/matematyka/';

const options = [
  { value: 'geografia', label: 'Geografia', color: '#abcfca' },
  { value: 'fizyka', label: 'Fizyka', color: '#abcfcf' },
  { value: 'matematyka', label: 'Matematyka', color: '#abcfcf', fontColor: '#00ff00' }
  // {value: 'invalid', label: 'Invalid', color: '#abcfcf', fontColor: '#00ff00'}
];

const customStyles = {
  control: (base) => ({
    ...base,
    //position: 'fixed',
    // top: '20px',
    // right: '20px',
    left: '34%',

    width: '600px',
  }),
  menu: (base) => ({
    ...base,
    // position: 'fixed',
    // top: '130px',
    // right: '20px',
    left: '34%',
    width: '600px'
  })
};

const Table = ({ data, rankingType }) => {

  const dataWithIndex = data.map((item, index) => {
    return {
      ...item,
      index: index + 1
    }
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Pozycja</th>
          <th>Login</th>
          <th>Punkty</th>
          <th>Czas</th>
          <th>Dziedzina</th>
        </tr>
      </thead>
      <tbody>
        {dataWithIndex.map((item, index) => {
          if (index < 3) {
            return (
              <tr key={item.id} className="highlighted">
                <td>{item.index}</td>
                <td>{item.login}</td>
                <td>{item.correctAnswers}</td>
                <td>{item.time}</td>
                <td>{item.domain}</td>
              </tr>
            );
          } else {
            return (
              <tr key={item.id}>
                <td>{item.index}</td>
                <td>{item.login}</td>
                <td>{item.correctAnswers}</td>
                <td>{item.time}</td>
                <td>{item.domain}</td>

              </tr>
            );
          }
        })}

      </tbody>
    </table>
  );
};


const Ranking = ({ setRankingPage, rankingArray }) => {

  const [data, setData] = useState([]);

  const [geographyRanking, setGeographyRanking] = useState([]);
  const [physicsRanking, setPhysicsRanking] = useState([]);
  const [mathRanking, setMathRanking] = useState([]);

  const [rankingType, setRankingType] = useState(" ");

  const [ranking, setRanking] = useState([]);

  const fetchData = async () => {
    console.log("Fetch ranking data")
    try {
      console.log("Fetching data for rankintype: ", rankingType)
      const response = await axios.get(getRankingGeographyUrl);

      console.log("Pobrano ranking ", response.data.response)
      setGeographyRanking(response.data.response);
      console.log("Ranking w useState: ", geographyRanking)
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }

    try {
      console.log("Fetching data for rankintype: ", rankingType)
      const response = await axios.get(getRankingPhysicsUrl);

      console.log("Pobrano ranking ", response.data.response)
      setPhysicsRanking(response.data.response);
      console.log("Ranking w useState: ", physicsRanking)
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }

    try {
      console.log("Fetching data for rankintype: ", rankingType)
      const response = await axios.get(getRankingMathUrl);

      console.log("Pobrano ranking ", response.data.response)
      setMathRanking(response.data.response);
      console.log("Ranking w useState: ", mathRanking)
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const handleSelectRankingType = async (selectedOption) => {
    console.log(`Option selected:`, selectedOption.value);
    setRankingType(selectedOption.value)
    fetchData()

    if (rankingType === "fizyka") {
      console.log("Print ranking: ", ranking);
    }
    else if (rankingType === "geografia") {
      console.log("Print ranking: ", ranking);
    }
    else if (rankingType === "matematyka") {
      console.log("Print ranking: ", ranking);
    }
    else {
      console.log("Zle wczytalo sie: ", ranking);
    }
    console.log(`Option selected:`, selectedOption.value);
  }

  const handleClick = async () => {
    setRankingPage(' ');
  }

  return (
    <div className="table_container">

      <div className="ranking_head">Ranking {rankingType}

      </div><br />
      <Select options={options} styles={customStyles} onChange={handleSelectRankingType} autoFocus={true} menuColor='red' /><br />
      {
        rankingType === "geografia" || rankingType === "fizyka" ? (
          (rankingType === "geografia") ? (
            <Table data={geographyRanking} rankingType={rankingType} />
          ) : (
            <Table data={physicsRanking} rankingType={rankingType} />
          )) : (
          <Table data={mathRanking} rankingType={rankingType} />
        )
      }
      <button className="rankingBackButton" onClick={handleClick}>Powrót</button>

    </div>
  )
}

export default Ranking;