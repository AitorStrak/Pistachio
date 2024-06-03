export const fetchData = async (url, token) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Api-Token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      };

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
      return null;
    };
  };
  