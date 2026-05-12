const formSearch = document.getElementById('frm-search');

// Escucha el evento submit del formulario de búsqueda
formSearch.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchText = this.querySelector('input').value;

    if (searchText.trim().length === 0) {
        return;
    }

    searchProducts(searchText);

    this.querySelector('input').value = '';
});

// Busca productos por nombre usando la API de DummyJSON
async function searchProducts(text) {
    const searchResults = document.getElementById('search-results');
    const quantity = document.getElementById('quantity');

    const response = await fetch(`https://dummyjson.com/products/search?q=${text}`);
    const data = await response.json();

    quantity.textContent = data.total;

    searchResults.innerHTML = '';

    for (let product of data.products) {
        const { title, thumbnail, price, rating } = product;

        searchResults.innerHTML += `
            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div class="h-48 bg-zinc-800 flex items-center justify-center">
                    <img src="${thumbnail}" alt="${title}" class="h-full w-full object-cover">
                </div>

                <div class="p-4">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-sm">
                            ${title}
                        </h3>

                        <span class="text-yellow-400 text-sm">
                            ★ ${rating}
                        </span>
                    </div>

                    <p class="text-blue-400 font-bold mt-2">
                        $${price}
                    </p>
                </div>
            </div>`;
    }
}

// Buscar por categoria 
async function getByCategory(categoria, pagina = 1) {
    const catalog = document.getElementById('catalog');

    const limit = 30;
    const skip = (pagina - 1) * limit;

    const response = await fetch(
        `https://dummyjson.com/products/category/${categoria}?limit=${limit}&skip=${skip}`
    );

    const data = await response.json();

    catalog.innerHTML = '';

    for (let product of data.products) {
        const { title, thumbnail, price } = product;

        catalog.innerHTML += `
            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div class="h-48 bg-zinc-800 flex items-center justify-center">
                    <img src="${thumbnail}" alt="${title}" class="h-full w-full object-cover">
                </div>

                <div class="p-4">
                    <h3 class="font-semibold text-sm">
                        ${title}
                    </h3>

                    <p class="text-blue-400 font-bold mt-1">
                        $${price}
                    </p>
                </div>
            </div>`;
    }

    renderPagination(data.total, 'getByCategory', categoria);

    document.querySelectorAll('#pagination button').forEach(btn => {
        btn.className = 'bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-xl';
    });

    document.getElementById(`btn-${pagina}`).className =
        'bg-blue-600 px-5 py-2 rounded-xl';
}

// Carga el catálogo general de productos al abrir la página
async function getCatalog(pagina) {
    const catalog = document.getElementById('catalog');

    const limit = 30;
    const skip = (pagina - 1) * limit;

    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await response.json();

    catalog.innerHTML = '';

    for (let product of data.products) {
        const { title, thumbnail, price } = product;

        catalog.innerHTML += `
            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div class="h-48 bg-zinc-800 flex items-center justify-center">
                    <img src="${thumbnail}" alt="${title}" class="h-full w-full object-cover">
                </div>

                <div class="p-4">
                    <h3 class="font-semibold text-sm">
                        ${title}
                    </h3>

                    <p class="text-blue-400 font-bold mt-1">
                        $${price}
                    </p>
                </div>
            </div>`;
    }

    renderPagination(data.total, 'getCatalog');

    document.querySelectorAll('#pagination button').forEach(btn => {
        btn.className = 'bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-xl';
    });

    document.getElementById(`btn-${pagina}`).className =
        'bg-blue-600 px-5 py-2 rounded-xl';
}

//Generar botones
function renderPagination(totalProductos, funcion, categoria = '') {
    const pagination = document.getElementById('pagination');

    pagination.innerHTML = '';

    const productosPorPagina = 30;
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        pagination.innerHTML += `
            <button 
                onclick="${funcion}(${i}${categoria ? `, '${categoria}'` : ''})"
                id="btn-${i}"
                class="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-xl">
                ${i}
            </button>
        `;
    }
}

//Ver todo
function showAllProducts() {
    // Reinicia el select
    document.getElementById('select-categoria').value = '';

    // Carga nuevamente el catálogo completo
    getCatalog(1);
}

getCatalog(1);
