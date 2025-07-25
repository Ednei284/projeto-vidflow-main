const containerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error("Video sem categoria.");

            }
            containerVideos.innerHTML += `
                    <li class="videos__item">
                            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                            <div class="descricao-video">
                                    <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                                    <h3 class="titulo-video">${video.titulo}</h3>
                                    <p class="titulo-canal">${video.descricao}</p>
                                        <p class="categoria" hidden>${video.categoria}</p>
                            </div>
                    </li>
                    `;
        })
    } catch (error) {
        console.error(error.message)
    }
}


buscarEMostrarVideos();

const pesquisar__input = document.querySelector('.pesquisar__input')
pesquisar__input.addEventListener('input', filtroPesquisar)
function filtroPesquisar() {
    const videos = document.querySelectorAll(".videos__item")
    if (pesquisar__input.value != '') {
        for (let video of videos) {
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = pesquisar__input.value.toLowerCase();
            if (!titulo.includes(valorFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }
    }
}

const superior__item = document.querySelectorAll('.superior__item')

superior__item.forEach((button) => {
    const buttonName = button.getAttribute('name')
    button.addEventListener('click', () => filtroPesquisarCategoria(buttonName))
})
function filtroPesquisarCategoria(buttonName) {
    const videos = document.querySelectorAll(".videos__item")
    for (let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = buttonName.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }

    }
}