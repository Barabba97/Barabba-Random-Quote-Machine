import React, { useEffect, useState } from 'react';
import { random } from 'lodash';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import QuoteMachine from './components/QuoteMachine';

const colors = [
  '#FFC312',
  '#EE5A24',
  '#2ed573',
  '#009432',
  '#12CBC4',
  '#0652DD',
  '#006266',
  '#5758BB',
  '#ED4C67',
  '#6F1E51',
  '#2d3436',
  '#EA2027'
];

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
  }
};

function App({ classes }) {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  useEffect(async () => {
    const data = await fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json');
    const quotes = await data.json();
    setQuotes(quotes);
    setSelectedQuoteIndex(random(0, quotes.length - 1));
  }, []);

  function getSelectedQuote() {
    if (!quotes.length || !Number.isInteger(selectedQuoteIndex)) {
      return undefined;
    }
    return quotes[selectedQuoteIndex];
  }

  function changeBackgroundColor() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = color;
  }
  /**
   * Returns an integer representing an index in state.quotes
   * If state.quotes is empty, returns undefined
   */
  function generateNewQuoteIndex() {
    if (!quotes.length) {
      return undefined;
    }
    return random(0, quotes.length - 1);
  }

  function assignNewQuoteIndex() {
    changeBackgroundColor();
    setSelectedQuoteIndex(generateNewQuoteIndex());
  }

  return (
    <Grid className={classes.container} id="quote-box" justify="center" container>
      <Grid xs={11} lg={8} item>
        {
          getSelectedQuote() ?
          <QuoteMachine selectedQuote={getSelectedQuote()} assignNewQuoteIndex={assignNewQuoteIndex} /> :
          null
        }
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App);
