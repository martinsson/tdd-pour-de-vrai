import React from "react";

import { LanguageAndVotes } from "../ApiDataAccess";

import "../index.css";

import style from "./CompLanguageAndVotes.module.scss";

interface Props {
  languageAndVotes: LanguageAndVotes;
  onVote: () => void;
}

export function CompLanguageAndVotes({
  languageAndVotes: { name, votes },
  onVote,
}: Props) {
  return (
    <div className={style.CompLanguageAndVotes}>
      <div className={style.Card}>
        <div className={style.Name}>{name}</div>
        <div className={style.Votes}>{votes}</div>
        <div className={style.Action}>
          <button
            className="button is-primary"
            onClick={() => {
              onVote();
            }}
          >
            Je vote
          </button>
        </div>
      </div>
    </div>
  );
}
