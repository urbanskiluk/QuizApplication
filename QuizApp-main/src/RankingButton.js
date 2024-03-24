import React from 'react';
import axios from './api/axios';
import { useState, useEffect } from "react";

const getRankingUrl = 'api/db/ranking/';

const RankingButton = ({ setRankingPage }) => {

    const handleClick = async () => {
        console.log("handle ranking button click")
        setRankingPage('ranking');
    }

    return (
        <button className="rankingButton" onClick={handleClick}>
            Ranking
        </button>
    )
}

export default RankingButton;