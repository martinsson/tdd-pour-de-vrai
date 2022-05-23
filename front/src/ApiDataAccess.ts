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

export class ApiDataAccess {
  static getLanguages(): Promise<LanguagesAndVotes> {
    return Promise.resolve(clone(languages));
  }

  static vote(name: string) {
    languages.find((language) => language.name === name)!.votes++;
    return Promise.resolve();
  }
}
