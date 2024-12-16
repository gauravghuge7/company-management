let ticketCounter = 1;

const generateTicketId = async (email) => {
   try {
      const ticketId = `GBIS${String(ticketCounter).padStart(7, '0')}`;
      ticketCounter += 1;

      console.log("ticketId generated => ", ticketId);
      
      return ticketId;
   } 
   catch (error) {
      console.log(error);
      throw new ApiError(500, error.message);
   }
}

export {
   generateTicketId
}