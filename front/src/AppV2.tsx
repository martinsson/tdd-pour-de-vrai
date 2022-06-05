import React, { useEffect, useState } from "react";

import { apiDataAccess, LanguagesAndVotes } from "./ApiDataAccess";
import { CompLanguageAndVotes } from "./components/CompLanguageAndVotes";

import style from "./App.module.scss";

export function AppV2() {
  const refInput = React.createRef<HTMLInputElement>();
  const [languagesAndVotes, setLanguagesAndVotes] = useState<LanguagesAndVotes>(
    []
  );

  useEffect(() => {
    apiDataAccess
      .getLanguages()
      .then((languagesAndVotes) => setLanguagesAndVotes(languagesAndVotes));
  }, []);

  return (
    <div className={style.App}>
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
            apiDataAccess.add(name).then(() => {
              apiDataAccess
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
            apiDataAccess.vote(languageAndVotes.name).then(() => {
              apiDataAccess
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
