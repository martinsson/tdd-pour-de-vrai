export type LanguageAndVotes = {
  name: string;
  votes: number;
};

export type LanguagesAndVotes = LanguageAndVotes[];

const languages: LanguagesAndVotes = [
  { name: "java", votes: 3 },
  { name: "js", votes: 15 },
];

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

class ApiDataAccessMemory {
  getLanguages(): Promise<LanguagesAndVotes> {
    return Promise.resolve(clone(languages));
  }

  vote(name: string) {
    languages.find((language) => language.name === name)!.votes++;
    return Promise.resolve();
  }

  add(name: string) {
    languages.push({ name, votes: 0 });
    return Promise.resolve();
  }
}

class ApiDataAccessBackend {
  getLanguages(): Promise<LanguagesAndVotes> {
    return fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => data.languages);
  }

  vote(name: string) {
    return fetch(`http://localhost:3000/vote/${name}`, {
      method: "PUT",
    });
  }

  add(name: string) {
    return fetch(`http://localhost:3000/add/${name}`, {
      method: "POST",
    });
  }
}

const IN_MEMORY = false;

export const apiDataAccess = IN_MEMORY
  ? new ApiDataAccessMemory()
  : new ApiDataAccessBackend();
