document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar');
    const contenedor = document.getElementById('contenedor');
    
    btnBuscar.addEventListener('click', () => {
      const palabra = document.getElementById('inputBuscar').value;
  
      if (!palabra) {
        alert('Por favor ingrese una palabra para buscar');
        return;  
      }
  
      const url = `https://images-api.nasa.gov/search?q=${palabra}`;
      
      fetch(url)
        .then(response => {
          if (!response.ok) {  
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
          return response.json();  
        })
        .then(data => {
          
          showData(data);
        })
        .catch(error => {
          console.error('Hubo un problema con la solicitud Fetch:', error);
        });
    });
  
    function showData(data) {
      contenedor.innerHTML = '';  
      const campos = data.collection.items;  
  
      campos.forEach(campo => {
        const fecha = new Date(campo.data[0].date_created).toLocaleDateString();
        const titulo = campo.data[0].title; 
        const descripcion = campo.data[0].description;
        const imagen = campo.links[0].href; 
  
        const card = `
        <div class="col-md-4">
        <div class="card mb-4 shadow-sm custom-card cursor-active" style="width: 18rem;">
          <img class="card-img-top" src="${imagen}" alt="Card image cap" style="width: 100%; height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text">${descripcion}</p>
            <p class="card-text"><small class="text-muted">${fecha}</small></p>
          </div>
        </div>
      </div><br>`;
        
        contenedor.innerHTML += card;
      });
    }
  });
  