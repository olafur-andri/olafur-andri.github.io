export function tokenizeClue(clue: string, fromWord: string, toWord: string): ClueToken[] {
  let remaining = clue;
  const tokens: ClueToken[] = [];

  while (remaining.length > 0) {
    const result = getNextClueToken(remaining, fromWord, toWord);
    tokens.push(result.token);
    remaining = result.remaining;
  }

  return tokens;
}

/** Finds and returns the first token at the start of the given clue string, along with what remains of the clue after
 * it's been removed */
function getNextClueToken(clue: string, fromWord: string, toWord: string) {
  if (clue === '') {
    throw new Error('Can\'t get next used clue segment from empty clue');
  }

  let token: ClueToken;
  let remaining: string;

  if (clue.startsWith('{from}')) {
    token = {type: 'from', text: fromWord};
    remaining = clue.substring('{from}'.length);
  } else if (clue.startsWith('{to}')) {
    token = {type: 'to', text: toWord};
    remaining = clue.substring('{to}'.length);
  } else {
    const length = getLengthOfNextNormalClueToken(clue);
    token = {type: 'normal', text: clue.substring(0, length)};
    remaining = clue.substring(length);
  }

  return { token, remaining };
}

function getLengthOfNextNormalClueToken(clue: string) {
  let fromIndex = clue.indexOf('{from}');
  let toIndex = clue.indexOf('{to}');

  if (fromIndex === -1) {
    fromIndex = clue.length;
  }

  if (toIndex === -1) {
    toIndex = clue.length;
  }

  return Math.min(fromIndex, toIndex);
}

export interface ClueToken {
  text: string;
  type: 'normal' | 'from' | 'to',
}
