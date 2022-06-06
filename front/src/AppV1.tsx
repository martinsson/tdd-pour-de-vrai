import React, { useEffect, useState } from "react";

import { apiDataAccessMemory, LanguagesAndVotes } from "./ApiDataAccess";
import { CompLanguageAndVotes } from "./components/CompLanguageAndVotes";

import style from "./App.module.scss";

export function AppV1() {
  const refInput = React.createRef<HTMLInputElement>();
  const [languagesAndVotes, setLanguagesAndVotes] = useState<LanguagesAndVotes>(
    []
  );

  useEffect(() => {
    apiDataAccessMemory
      .getLanguages()
      .then((languagesAndVotes) => setLanguagesAndVotes(languagesAndVotes));
  }, []);

  return (
    <div className={style.App}>
      <header>
        <a href="/1">Version en mémoire</a> |
        <a href="/2">Version avec Backend</a>
      </header>
      <h1 className="title has-text-white mt-6">
        Les meilleurs langages de programmations !
      </h1>

      <div className={style.AddSection}>
        <input className="input" ref={refInput} />
        <button
          className="button is-info"
          onClick={() => {
            const name = refInput.current!.value;
            refInput.current!.value = "";
            apiDataAccessMemory.add(name).then(() => {
              apiDataAccessMemory
                .getLanguages()
                .then((languagesAndVotes) =>
                  setLanguagesAndVotes(languagesAndVotes)
                );
            });
          }}
        >
          Ajouter
        </button>
      </div>

      {languagesAndVotes.map((languageAndVotes) => (
        <CompLanguageAndVotes
          languageAndVotes={languageAndVotes}
          onVote={() => {
            apiDataAccessMemory.vote(languageAndVotes.name).then(() => {
              apiDataAccessMemory
                .getLanguages()
                .then((languagesAndVotes) =>
                  setLanguagesAndVotes(languagesAndVotes)
                );
            });
          }}
          key={languageAndVotes.name}
        />
      ))}
    </div>
  );
}
