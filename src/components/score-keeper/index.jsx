import React, { useState } from "react";
import { 
  Card,
  Typography,
  Grid,
  useTheme,
  Input,
  Divider
} from "@mui/material";
import SettingsForm from "../settings-form";
import Round from "../round";
import ScoreViewer from "../score-viewer";

export default function ScoreKeeper() {
  const theme = useTheme();
  
  const defaultPlayer = {
    name: `Player 1`,
    id: 1,
    rounds:[],
  };
  const [ players, setPlayers ] = useState([defaultPlayer]);
  const [roundId, setRoundId] = useState(0)
  const [phase, setPhase] = useState('bid')
  const deckSize = 52;
  const roundCount = Math.floor(deckSize / players.length);
  const skSettingsFormProps = {
    addPlayer,
    updatePlayerName,
    removePlayer,
    nextRound,
    players,
    roundCount,
  }
  const roundProps = {
    roundCount,
    nextRound,
    roundId,
    players,
    phase,
    setPhase,
    updateBid,
    updateTricks,
  }
  const scoreViewerProps = {
    players,
    roundId,
  }

  function addPlayer(){
    const id = players.length + 1;
    const player = {
      name: `Player ${id}`,
      id,
      rounds:[],
    };
    const newPlayers = [...players];
    newPlayers.push(player);
    setPlayers(newPlayers);
  }

  function removePlayer(playerId){
    const newPlayers = [...players];
    const idToRemove = newPlayers.findIndex(p => p.playerId === playerId);
    newPlayers.splice(idToRemove,1);
    setPlayers(newPlayers)
  }

  function updatePlayerName(id,name){
    const newPlayers = [...players];
    const player = newPlayers.find(player => player.id === id);
    player.name = name;
    setPlayers(newPlayers);
  }

  function updateBid(roundId,playerId,value){
    const newPlayers = [...players];
    const player = newPlayers.find(player => player.id === playerId);
    if(!player.rounds[roundId]) player.rounds[roundId] = {};
    player.rounds[roundId]['bid'] = value;
    setPlayers(newPlayers);
  }

  function updateTricks(roundId,playerId,value){
    const newPlayers = [...players];
    const player = newPlayers.find(player => player.id === playerId);
    if(!player.rounds[roundId]) player.rounds[roundId] = {};
    player.rounds[roundId]['tricks'] = value;
    setPlayers(newPlayers);
  }

  function seedRound(newRoundId) {
    const newPlayers = [...players];
    newPlayers.forEach(player => {
      player.rounds[newRoundId] = {
        bid: 0,
        tricks: 0,
        score: 0
      };
    })
    setPlayers(newPlayers);
  }

  function nextRound(){
    const newRoundId = roundId + 1;
    if(roundId > 0) scoreRound();
    setRoundId(newRoundId);
    setPhase('bid');
    seedRound(newRoundId);
  }

  function determineScore(bid,tricks) {
    if(bid === tricks) return 5 + bid;
    if(bid > tricks) return -bid;
    return -tricks;
  }

  function scoreRound() {
    const newPlayers = [...players];
    newPlayers.forEach(player => {
      const {bid, tricks} = player.rounds[roundId]
      const score = determineScore(bid, tricks)
      player.rounds[roundId].score = score
    })
    setPlayers(newPlayers)
  }

  console.log(roundProps)

  return (
    <Card
      bgcolor={theme.palette.background.default}
      sx={{
        minHeight: 256,
        padding: 3
      }}
    >
      <Grid container columns={12} gap={1}>
        <Grid item key={'title'} xs={12}>
          <Typography variant="headlineMedium"> Damnit Score Keeper </Typography>
        </Grid>
        <Grid item key={'description'} xs={12}>
          <Typography marginBottom={1}> Score keeper for the playing card game "Damnit"</Typography>
          <Divider sx={{
            marginBottom: 1
          }} />
        </Grid>
        <Grid item xs={12}>
          {
            roundId === 0 ?
            <SettingsForm {...skSettingsFormProps} /> :
            <Round {...roundProps} />
          }
        </Grid>
        <Grid item>
          <ScoreViewer {...scoreViewerProps} />
        </Grid>
      </Grid>
    </Card>
  )
}