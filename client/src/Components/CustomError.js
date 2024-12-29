
export const extractErrorMessage = (data) => {
    // Look for the error message in the HTML
    const regex = /<pre>(.*?)<\/pre>/g;
    const matches = regex.exec(data);

    console.log("matches => ", matches);

    if (matches && matches[0]) {
      // Clean the extracted error message

    const error = /<pre>(.*?)<br>/;
    const message = error.exec(data);

    console.log("message => ", message);
    
    if (message && message[1]) {
        return message[1];
    }
    }


    return 'An unknown error occurred.';
};