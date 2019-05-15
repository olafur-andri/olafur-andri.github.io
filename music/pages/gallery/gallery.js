/**
 * The Gallery class which will take care of all dynamic functionality of the
 * gallery.html web page
 */
class Gallery {
    /**
     * The constructor for the Gallery class
     */
    constructor() {
        this.ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
            'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'];
        this.populateAlbums();
        this.populateSingles();
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

        const link = document.createElement('a');
        link.classList.add('card-link');
        link.href=`../album/album.html?name=${data.name}`;

        album.appendChild(imgDiv);
        album.appendChild(textDiv);
        album.appendChild(link);
        albumsContainer.appendChild(album);
    }

    /**
     * Generates all of the registered singles in the songs.json file
     */
    populateSingles() {
        this.getAllSongs().then((result) => {
            this.createSingles(result);
        });
    }

    /**
     * Fetches all the songs registered in the songs.json file
     */
    async getAllSongs() {
        const rawSongs = await fetch('../../data/songs.json');
        const songs = await rawSongs.json();
        return songs;
    }

    /**
     * Creates and inserts all the singles into the DOM
     * @param {Array} songs An array that represents the
     *                      songs in the songs.json file
     */
    createSingles(songs) {
        const listDict = {};

        // Instantiate the list object
        for (const letter of this.ALPHABET) {
            listDict[letter] = [];
        }

        // Insert into list object
        for (const song of songs) {
            if (song.album) {
                continue;
            }
            const letter = song.name[0].toUpperCase();
            listDict[letter].push(song);
        }

        // Create list from list object
        const singlesSection = document.getElementById('singles_section');
        const list = this.createSinglesList(listDict);
        singlesSection.appendChild(list);
    }

    /**
     * Creates and returns an HTML element that is the singles list
     * @param {Object} dict An object that represents the structure of the list
     * @return {HTMLElement} The singles list
     */
    createSinglesList(dict) {
        const letterList = document.createElement('ul');
        letterList.id = 'letter_list';

        for (const letter in dict) {
            const songs = dict[letter];

            if (!songs.length) {
                continue;
            }

            const letterItem = document.createElement('li');
            letterItem.innerText = letter;
            const songsList = this.createSongsList(songs);
            letterList.appendChild(letterItem);
            letterList.appendChild(songsList);
        }

        return letterList;
    }

    /**
     * Creates an HTML <ul></ul> element for songs starting with a particular
     * letter
     * @param {Array} songs An array of objects representing song information
     * @return {HTMLElement} The unordered list of songs
     */
    createSongsList(songs) {
        const songsList = document.createElement('ul');
        songsList.classList.add('songs-list');

        for (const song of songs) {
            const listItem = document.createElement('li');
            const nameSpan = document.createElement('span');
            const descriptionSpan = document.createElement('span');
            const durationSpan = document.createElement('span');
            const description = this.truncateChars(song.description, 100);
            const link = document.createElement('a');

            nameSpan.innerText = song.name;
            nameSpan.classList.add('song-name')
            descriptionSpan.innerText = description;
            descriptionSpan.classList.add('song-description')
            durationSpan.innerText = song.duration;
            durationSpan.classList.add('song-duration');
            link.href = `../song/song.html?name=${song.name}`;
            
            listItem.appendChild(nameSpan);
            listItem.appendChild(descriptionSpan);
            listItem.appendChild(durationSpan);
            listItem.appendChild(link);
            songsList.appendChild(listItem);
        }

        return songsList;
    }

    /**
     * Returns a string, truncated with 'len' many characters, ellipsis
     * @param {String} str The string to truncate
     * @param {Number} len The number of allowed chars in the string
     */
    truncateChars(str, len) {
        let truncated = str;
        if (str.length > len) {
            truncated = str.substring(0, len) + "...";
        }
        return truncated;
    }
}

document.addEventListener('DOMContentLoaded', () => new Gallery());