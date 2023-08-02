const apiRequest = async (url = "", optionObj = null, errMesg = null) => {
  try {
    const response = await fetch(url, optionObj);

    if (!response.ok) throw Error("Please reload the app");

    return response;
  } catch (err) {
    console.log("error : " + err.stack);
  } finally {
    console.log("done on processing");
  }
};

export default apiRequest;
