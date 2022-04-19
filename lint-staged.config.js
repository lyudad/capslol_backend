module.exports = {
    // // this will check Typescript files
    // '**/*.(ts|tsx)': () => 'npm tsc --noEmit',
  
    // This will lint and format TypeScript and                                             //JavaScript files
    '**/*.(ts)': () => [
      `npm run lint`,
    ],
  
//     // this will Format MarkDown and JSON
//     '**/*.(md|json)': (filenames) =>
//       `yarn prettier --write ${filenames.join(' ')}`,
  }