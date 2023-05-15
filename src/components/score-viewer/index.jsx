import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, SwipeableDrawer, styled, Box, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";

export default function ScoreViewer({players, roundId}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
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

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  return (
    <SwipeableDrawer
      anchor="bottom"
      onOpen={() => { setOpen(true) }}
      onClose={() => { setOpen(false) }}
      open={open}
      swipeAreaWidth={'114px'}
      sx={{
        '.MuiPaper-root': {
          overflowY: 'visible',
        }
      }}
    >
      {!open ? (
              <Box
              sx={{
                position: 'absolute',
                transform: 'translateY(-114px)',
                backgroundColor: 'white',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
              }}
            >
              <Puller />
              <TableContainer sx={{
                '.MuiTable-root': {
                  tableLayout: 'fixed'
                }
              }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {players.map((player,i) => (
                        <TableCell item key={`player-${i}-header-grid-item-header`}>
                          {player.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {totals.map((total, i) => (
                        <TableCell key={`player-header-grid-item-total-${i}-header`}>
                          <Typography color={theme.palette.primary.main}>{total}</Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
      ):null}
      <TableContainer sx={{
        '.MuiTable-root': {
          tableLayout: 'fixed'
        }
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {' '}
              </TableCell>
              {players.map((player,i) => (
                <TableCell key={`player-${i}-header-table-cell`}>
                  {player.name}
                </TableCell>
              ))}
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
              {totals.map((total, i) => {
                return (
                  <TableCell key={`player-table-cell-total-${i}`}>
                    <Typography color={theme.palette.primary.main}>{total}</Typography>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SwipeableDrawer>
  )
}