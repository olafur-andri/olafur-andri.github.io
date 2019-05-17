'use strict';

class Song {
    constructor() {
        this.audio = null;

        this.downloadOnClick = this.downloadOnClick.bind(this);

        this.showBackground();
        this.getSong();
        this.addEventListeners();
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
                this.playFile(response, song);
            });
    }

    /**
     * Receives a song file and plays it
     * @param {Object} songFile The song to play
     */
    playFile(songFile, song) {
        const audio = new Audio(songFile.url);
        const songLength = document.getElementById('song_length');
        const currentProgress = document.getElementById('current_progress');
        const indicator = document.getElementById('progress_indicator');
        const downloadButton = document.getElementById('download_button');

        audio.preload = 'auto';
        console.log(audio);

        // Add event listener to download button
        this.audio = audio;
        downloadButton.addEventListener('click', this.downloadOnClick);

        // Play the file
        audio.play();

        // Show the length of the song
        songLength.innerText = song.duration;

        // Set the href attribute of the download link
        downloadButton.href = songFile.url;

        // Handle animations and logic while playing the song
        let playInterval = setInterval(() => {
            const scale = audio.currentTime / audio.duration;
            indicator.style.transform = `scaleX(${scale})`;
            currentProgress.innerText = this.formatSeconds(audio.currentTime);
        }, 100);
    }

    /**
     * Formats a single number representing seconds into mm:ss format
     * @param {Number} seconds The number of seconds to format
     */
    formatSeconds(seconds) {
        let formatted = '';
        const minutes = Math.floor(seconds / 60);
        seconds -= (minutes * 60);
        seconds = String(Math.floor(seconds));
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }        
        formatted = `${minutes}:${seconds}`;
        return formatted
    }

    /**
     * Adds all necessary event listeners to the web page
     */
    addEventListeners() {
        const downloadButton = document.getElementById('download_button');
    }

    /**
     * Runs when the user clicks on the 'download song' button
     * @param {Event} e The event object for this function
     */
    downloadOnClick(e) {
        this.audio.pause();
    }
}

document.addEventListener('DOMContentLoaded', () => new Song());