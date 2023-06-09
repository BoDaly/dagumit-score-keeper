import React, { useState, useContext, useMemo } from "react";
import { Card, Typography, Grid, useTheme, Divider} from "@mui/material";
import { ScoreView, RoundView, SettingsView } from "../views";
import { AppContext } from "../../store";

export default function ScoreKeeper() {

  const theme = useTheme();
  const {
    roundCount,
    setRoundCount,
    setPlayers,
    players,
    deckSize,
    roundId,
    setRoundId
  } = useContext(AppContext);

  const [phase, setPhase] = useState('bid')

  useMemo(() => {
    setRoundCount((Math.floor(deckSize / players.length)*2)-1)
  }, [players])

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
    previousRound,
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

  function previousRound(){
    const newRoundId = roundId - 1;
    setRoundId(newRoundId);
    setPhase('tricks');
  }

  function determineScore(bid,tricks) {
    if(bid === tricks) return 5 + bid;
    if(bid > tricks) return -bid;
    return -tricks;
  }

  function scoreRound() {
    const newPlayers = [...players];
    console.log('new_players: ',newPlayers)

    newPlayers.forEach(player => {
      const {bid, tricks} = player.rounds[roundId]
      const score = determineScore(bid, tricks)
      player.rounds[roundId].score = score
    })

    setPlayers(newPlayers)
  }

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
            <SettingsView {...skSettingsFormProps} /> :
            <RoundView {...roundProps} />
          }
        </Grid>
        <Grid item>
          <ScoreView {...scoreViewerProps} />
        </Grid>
      </Grid>
    </Card>
  )
}