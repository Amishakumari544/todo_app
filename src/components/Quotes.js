import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import {
  FileCopy as FileCopyIcon,
  Refresh as RefreshIcon,
} from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    minHeight: 300,
    background: '#6dd5ed',  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to left, #2193b0, #FBD786, #C6FFDD)",  /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to left, #2193b0, #C6FFDD)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
  },
  content: {
    fontSize: "1rem",
  },
  author: {
    marginTop: 12,
    fontSize: ".8rem",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: "15px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
  quoteCopiedMessage: {
    color: "green",
    fontSize: "13px",
    marginLeft: "10px",
  },
}));

export default function Quotes() {
  const classes = useStyles();

  const [quote, setQuote] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteCopied, setQuoteCopied] = useState(false);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  async function fetchRandomQuote() {
    try {
      setLoadingQuote(true);
      setErrorMessage("");
      setQuoteCopied(false);
      const quoteObject = await axios.get("https://api.quotable.io/random");
      https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json
      setQuote(quoteObject.data);
      setLoadingQuote(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadingQuote(false);
    }
  }

  function copyQuote() {
    navigator.clipboard.writeText(quote.content + " - " + quote.author);
    setQuoteCopied(true);
  }

  return (
    <div className="card shadow border-0">
      <CardContent>
        {loadingQuote ? (
          <div>
            <Skeleton height={80} width={"38vw"} animation="wave" />
            <Skeleton height={30} width={"20vw"} animation="wave" />
          </div>
        ) : quote.content ? (
          <div>
            <h3
              variant="body2"
              color="textSecondary"
              component="p"
              className="quote-text text-center"
            >
              {quote.content}
            </h3>
            <Typography className="quote-text text-center">
              - {quote.author}
            </Typography>
          </div>
        ) : (
          <p className={classes.errorMessage}>{errorMessage}</p>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div>
          {quoteCopied ? (
            <p className={classes.quoteCopiedMessage}>
              Quote copied to clipboard
            </p>
          ) : (
            <IconButton aria-label="copy-icon" onClick={copyQuote}>
              <FileCopyIcon />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton aria-label="copy-icon" onClick={fetchRandomQuote}>
            <RefreshIcon />
          </IconButton>
        </div>
      </CardActions>
    </div>
  );
}