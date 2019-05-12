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
        
    }
}

document.addEventListener('DOMContentLoaded', () => new Gallery());