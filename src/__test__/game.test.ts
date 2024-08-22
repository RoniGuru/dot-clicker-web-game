import gameSlice, { setHighScore } from '../state/gameSlice';
import { initialState, startGame, endGame } from '../state/gameSlice';

describe('gameSlice', () => {
  it('check initial state', () => {
    expect(gameSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('start game', () => {
    expect(gameSlice(initialState, startGame()).start).toEqual(true);
  });
  it('end game ', () => {
    expect(gameSlice(initialState, endGame()).start).toEqual(false);
  });
  it('set high score', () => {
    expect(gameSlice(initialState, setHighScore(10)).highScore).toEqual(10);
  });
});
