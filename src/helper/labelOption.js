// @ts-nocheck
export const labelOption = (deskripsi, kode) => {
  let deskripsiSplit = deskripsi.split("; ");
  let deskripsiObject = deskripsiSplit.map((d) => {
    let result = {};
    result[d.split("=")[0]] = d
      .split("=")
      .filter((_, index) => index > 0)
      .join("=");
    return result;
  });
  deskripsiObject = deskripsiObject.reduce((obj, item) => {
    obj[Object.keys(item)[0]] = Object.values(item)[0];
    return obj;
  }, {});
  return deskripsiObject[kode];
};
