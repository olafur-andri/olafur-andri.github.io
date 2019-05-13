/**
 * The Gallery class which will take care of all dynamic functionality of the
 * gallery.html web page
 */
class Gallery {
    /**
     * The constructor for the Gallery class
     */
    constructor() {
        this.populateAlbums();
    }

    /**
     * Populates the #album_section with each album registered in albums.json
     */
    populateAlbums() {
        this.readAlbums().then((albums) => {
            albums.forEach((album) => {
                this.createAlbum(album);
            });
        });
    }

    /**
     * Returns all the albums registered in the albums.json file
     * @return {Array} An array of objects representing all albums
     */
    async readAlbums() {
        const rawAlbums = await fetch('../../data/albums.json');
        const albums = await rawAlbums.json();
        return albums;
    }

    /**
     * Creates an album element and inserts it into the web page
     * @param {Object} data Represents the information about the album
     */
    createAlbum(data) {
        const MAX_DESC_LEN = 70;
        const albumsContainer = document.getElementById('albums_container');
        const album = document.createElement('div');
        const imgDiv = document.createElement('div');
        const textDiv = document.createElement('div');

        album.classList.add('album');
        imgDiv.classList.add('card-img-container');
        textDiv.classList.add('card-text-container')

        const url = `../../images/${data.image}`;
        imgDiv.style.backgroundImage = "url('" + url + "')";

        textDiv.innerHTML = `
            <p class="date-created">
                ${new Date(data.created).toLocaleDateString()}
            </p>
            <h3 class="card-title">${data.name}</h3>
            <p class="card-description">${data.shortDescription}</p>
        `;

        album.appendChild(imgDiv);
        album.appendChild(textDiv);
        albumsContainer.appendChild(album);
    }
}

document.addEventListener('DOMContentLoaded', () => new Gallery());