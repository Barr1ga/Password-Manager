import React, { useState } from "react";

const getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getRandomNumber = () => {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getRandomSymbol = () => {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunc = {
  lowercase: getRandomLower,
  uppercase: getRandomUpper,
  numbers: getRandomNumber,
  symbols: getRandomSymbol,
};

let generatePassword = (data) => {
  const { lowercase, uppercase, numbers, symbols, length } = data;
  let generatedPassword = "";
  let typesCount = lowercase + uppercase + numbers + symbols;
  let typesArr = [
    { lowercase },
    { uppercase },
    { numbers },
    { symbols },
  ].filter((item) => Object.values(item)[0]);

  // Doesn't have a selected type
  if (typesCount === 0) {
    return "";
  }

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      let funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  let finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
};

const getPassword = (data) => {
  const returnValue = generatePassword(data);
  return returnValue;
};

export default getPassword;
