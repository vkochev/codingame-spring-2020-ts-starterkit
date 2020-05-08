export function debuggedReadline() {
  const line = readline();
  DEBUG(line);
  return line;
}

export function DEBUG(str: string) {
  console.error(str);
}
