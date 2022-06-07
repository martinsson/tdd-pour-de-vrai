export type LanguageAndVotes = {
  language: string;
  votes: number;
};

export type LanguagesAndVotes = LanguageAndVotes[];

const languages: LanguagesAndVotes = [
  { language: "java", votes: 3 },
  { language: "js", votes: 15 },
];

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

class ApiDataAccessMemory {
  getLanguages(): Promise<LanguagesAndVotes> {
    return Promise.resolve(clone(languages));
  }

  vote(name: string) {
    languages.find((language) => language.language === name)!.votes++;
    return Promise.resolve();
  }

  add(name: string) {
    languages.push({ language: name, votes: 0 });
    return Promise.resolve();
  }
}

class ApiDataAccessBackend {
  getLanguages(): Promise<LanguagesAndVotes> {
    return fetch("http://localhost:3000/votes")
      .then((response) => response.json())
      .then((data) => data.votes);
  }

  vote(name: string) {
    return fetch(`http://localhost:3000/vote/${name}`, {
      method: "PUT",
    });
  }

  add(name: string) {
    return this.vote(name);
  }
}

const IN_MEMORY = false;

export const apiDataAccess = IN_MEMORY
  ? new ApiDataAccessMemory()
  : new ApiDataAccessBackend();
