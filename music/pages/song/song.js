class Song {
    constructor() {
        this.getSong();
    }

    /**
     * Gets the song that is about to be played
     */
    getSong() {
        this.getAllSongs().then((songs) => {
            const name =
                new URLSearchParams(window.location.search).get('name');
            let song = null;
            for (const curr of songs) {
                if (curr.name === name) {
                    song = curr;
                    break;
                }
            }
            if (song === null) {
                throw `Specified song ('${name}') was not found :(`;
            }

            const songTitle = document.getElementById('song_title');
            songTitle.innerText = song.name;
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
}

document.addEventListener('DOMContentLoaded', () => new Song());