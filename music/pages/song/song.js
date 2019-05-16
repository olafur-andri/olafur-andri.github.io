'use strict';

class Song {
    constructor() {
        this.showBackground();
        this.getSong();
    }

    /**
     * Fades in the background-image
     */
    showBackground() {
        const backgroundContainer =
            document.getElementById('background_image_container');
        backgroundContainer.classList.add('show');
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
            this.getSongFile(song);
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
     * Gets the appropriate .wav file from the server and preps it for playing
     */
    getSongFile(song) {
        const url = `../../songs/${song.filepath}`;
        fetch(url)
            .then((response) => {
                return response;
            })
            .then((response) => {
                this.playFile(response);
            });
    }

    /**
     * Receives a song file and plays it
     * @param {Object} songFile The song to play
     */
    playFile(songFile) {
        const audio = new Audio(songFile.url);
        audio.play();
    }
}

document.addEventListener('DOMContentLoaded', () => new Song());