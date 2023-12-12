async function getData() {
     try {
       const response = await axios.get('https://api.tvmaze.com/shows');
       return response.data;
     } catch (error) {
       console.error(error);
     }
   }

export { getData };