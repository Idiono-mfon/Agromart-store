import web3 from "web3";

export const strToBase32 = (string) => {
  return web3.utils.asciiToHex(string);
};

export const remove_non_ascii = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/[^\x20-\x7E]/g, "");
};

export const base32ToStr = (base32) => {
  return remove_non_ascii(web3.utils.hexToAscii(base32));
};
