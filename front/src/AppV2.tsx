import React, { useEffect, useState } from "react";

import { ApiDataAccess, LanguagesAndVotes } from "./ApiDataAccess";
import { CompLanguageAndVotes } from "./components/CompLanguageAndVotes";

import style from "./App.module.scss";

export function AppV2() {
  const [languagesAndVotes, setLanguagesAndVotes] = useState<LanguagesAndVotes>(
    []
  );

  useEffect(() => {
    ApiDataAccess.getLanguages().then((languagesAndVotes) =>
      setLanguagesAndVotes(languagesAndVotes)
    );
  }, []);

  return (
    <div className={style.App}>
      <h1 className="title has-text-white mt-6">
        Les meilleurs langages de programmations !
      </h1>

      {languagesAndVotes.map((languageAndVotes) => (
        <CompLanguageAndVotes
          languageAndVotes={languageAndVotes}
          onVote={() => {
            ApiDataAccess.vote(languageAndVotes.name).then(() => {
              ApiDataAccess.getLanguages().then((languagesAndVotes) =>
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
