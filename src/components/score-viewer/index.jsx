import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

export default function ScoreViewer({players, roundId}) {
  const theme = useTheme();
  const roundLabels = []
  for(let i = 1; i < roundId; i++){
    roundLabels.push(`Round ${i}`)
  }
  const totals = players.map(player => {
    const roundScores = []
    player.rounds.forEach(round => {
      console.log(round);
      if(round.score) roundScores.push(round.score);
    })
    let roundTotal = 0;
    if(roundScores.length > 0) roundTotal = roundScores.reduce((a,b) => a+b);
    return roundTotal
  })
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {' '}
            </TableCell>
            {players.map((player,i) => (<TableCell key={`player-${i}-header-table-cell`}>{player.name}</TableCell>))}
            {/* {roundHeaders.map((round,i) => (<TableCell key={`round-${i}-table-cell`}>{round}</TableCell>))} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {roundLabels.map((rl,i) => {
            const roundCount = i+1;
            return (
              <TableRow key={`round-${roundCount}-table-row`}>
                <TableCell>
                  {rl}
                </TableCell>
                {players.map((player, ii) => {
                  return (
                    <TableCell key={`round-${roundCount}-player-${ii}-table-cell`}>
                      {player.rounds[roundCount].score}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell>
              <Typography color={theme.palette.primary.main}>Total</Typography>
            </TableCell>
            {totals.map(total => {
              return (
                <TableCell>
                  <Typography color={theme.palette.primary.main}>{total}</Typography>
                </TableCell>
              )
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}