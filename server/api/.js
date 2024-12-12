import { BuiltTime } from "./built-time";

export const Built = (request, response) => {
  response.setHeader('content-type', 'text/plain');
  
  const builtDate = new Date(BuiltTime);
  if (isNaN(builtDate.getTime())) {
    response.send(`
      This Serverless Function was built at an unknown time.
      The current time is ${new Date()}
    `);
    return;
  }

  response.send(`
    This Serverless Function was built at ${builtDate}.
    The current time is ${new Date()}
  `);
};
