// --- Day 4: Ceres Search ---

// "Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After
// a brief flash, you recognize the interior of the Ceres monitoring station!

// As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could
// help her with her word search (your puzzle input). She only has to find one word: XMAS.

// This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a
// little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways
//  XMAS might appear, where irrelevant characters have been replaced with .:

// ..X...
// .SAMX.
// .A..A.
// XMAS.S
// .X....
// The actual word search will be full of letters instead. For example:

// MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX
// In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any
// XMAS have been replaced with .:

// ....XXMAS.
// .SAMXMS...
// ...S..A...
// ..A.A.MS.X
// XMASAMX.MM
// X.....XA.A
// S.S.S.S.SS
// .A.A.A.A.A
// ..M.M.M.MM
// .X.X.XMASX
// Take a look at the little Elf's word search. How many times does XMAS appear?

import fs from "fs";

const readFile = (path) => {
  const file = fs.readFileSync(path, "utf-8");
  const splittedFile = file.split("\n");
  const arrayDivision = [];
  for (let i = 0; i < splittedFile.length; i++) {
    const element = splittedFile[i].replace(/(\r\n|\n|\r)/gm, "").split("");
    arrayDivision.push(element);
  }

  return arrayDivision;
};

const splittedFile = readFile("./data.txt");
// console.log(splittedFile);

let total = 0;
const findHorizontalXmas = () => {
  for (let row of splittedFile) {
    for (let j = 0; j <= row.length - 4; j++) {
      if (row[j] === "X" && row[j + 1] === "M" && row[j + 2] === "A" && row[j + 3] === "S") {
        total++;
      }
    }
    for (let j = 3; j < row.length; j++) {
      if (row[j] === "X" && row[j - 1] === "M" && row[j - 2] === "A" && row[j - 3] === "S") {
        total++;
      }
    }
  }
};

const findVerticalXmas = () => {
  for (let i = 0; i < splittedFile.length; i++) {
    const currentArray = splittedFile[i];
    for (let j = 0; j < currentArray.length; j++) {
      const element = currentArray[j];
      if (element === "X") {
        //se si trova nelle prime tre righe, possiamo controllare solo verso il basso, altrimenti possiamo controllare anche verso l'alto
        if (
          i >= 3 &&
          splittedFile[i - 1][j] === "M" &&
          splittedFile[i - 2][j] === "A" &&
          splittedFile[i - 3][j] === "S"
        ) {
          total++;
        }
        if (
          i <= splittedFile.length - 4 &&
          splittedFile[i + 1][j] === "M" &&
          splittedFile[i + 2][j] === "A" &&
          splittedFile[i + 3][j] === "S"
        ) {
          total++;
        }
      }
    }
  }
};

const findDiagonalXmas = () => {
  for (let i = 0; i < splittedFile.length; i++) {
    const currentArray = splittedFile[i];
    for (let j = 0; j < currentArray.length; j++) {
      const element = currentArray[j];
      // se ci trovamo  ma minore di currentArray - 4 possiamo cercare a destra
      // se ci troviamo a j>3 possiamo cercare a sinistra
      if (element === "X") {
        if (
          j >= 3 &&
          i <= splittedFile.length - 4 &&
          splittedFile[i + 1][j - 1] === "M" &&
          splittedFile[i + 2][j - 2] === "A" &&
          splittedFile[i + 3][j - 3] === "S"
        ) {
          total++;
        }
        if (
          j >= 3 &&
          i >= 3 &&
          splittedFile[i - 1][j - 1] === "M" &&
          splittedFile[i - 2][j - 2] === "A" &&
          splittedFile[i - 3][j - 3] === "S"
        ) {
          total++;
        }
        if (
          j <= currentArray.length - 4 &&
          i <= splittedFile.length - 4 &&
          splittedFile[i + 1][j + 1] === "M" &&
          splittedFile[i + 2][j + 2] === "A" &&
          splittedFile[i + 3][j + 3] === "S"
        ) {
          total++;
        }
        if (
          j <= currentArray.length - 4 &&
          i >= 3 &&
          splittedFile[i - 1][j + 1] === "M" &&
          splittedFile[i - 2][j + 2] === "A" &&
          splittedFile[i - 3][j + 3] === "S"
        ) {
          total++;
        }
      }
    }
  }
};

const findAllXmas = () => {
  findHorizontalXmas();
  findVerticalXmas();
  findDiagonalXmas();
  console.log(total);
};

console.time("execution time");
findAllXmas();
console.timeEnd("execution time");
