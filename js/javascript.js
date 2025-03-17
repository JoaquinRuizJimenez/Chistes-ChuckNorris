

document.addEventListener("DOMContentLoaded", () => {
    let categoriaSeleccionada = document.getElementById("categoria");
    const chiste = document.getElementById("chiste");
    const botonChiste = document.getElementById("botonMostrarChiste");

    function rellenarCategorias() {
        fetch("https://api.chucknorris.io/jokes/categories")                                                        //Cojemos los valores de la categorias de la api
            .then(response => response.json())
            .then(data => {
                categoriaSeleccionada.innerHTML = '<option value="">Selecciona una categoría</option>';             //Creamos un apartado vacío
                
                data.forEach(categoria => {                                                                                 //Le damos un valor a nuevos elementos por cada categoria
                    
                    let option = document.createElement("option");                                                      //Creamos un elemento option
                    
                    option.value = categoria;                                                                           //Damos valor al nuevo elemento
                    
                    option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();          //Primera letra en mayusculas

                    categoriaSeleccionada.appendChild(option);                                                             //Añadimos el nuevo elemento al select
                });
            })
            .catch(error => {                                                               //Si no podemos cargar las categorias, mostramos un error
                chiste.textContent = "Error al cargar categorías.";
            });
    }

//Codigo para obtener el chiste


    function obtenerChiste() {
        const categoria = categoriaSeleccionada.value;
        if (!categoria) {
            chiste.textContent = "No has elegido una categoria";
            return;
        }

        botonChiste.disabled = true;                                                    //Desactivamos al boton mientras se ejecuta la función
        botonChiste.textContent = "Espere un momento...";

        fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
            .then(response => response.json())
            .then(data => {
                chiste.textContent = data.value;
            })
            .catch(error => {                                                   //Si no se ha podido obtener el chiste, mostramos un error
                chiste.textContent = "Error al obtener chiste.";
            })
            .finally(() => {                                                //Volvemos a activar el boton
                botonChiste.disabled = false;
                botonChiste.textContent = "Mostrar chiste";
            });
    }

    botonChiste.addEventListener("click", obtenerChiste);
    rellenarCategorias();
});

