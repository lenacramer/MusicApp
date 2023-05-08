const FetchData = (function (){
    return{
    constructor(apiKey, apiSecret){
        this.apiKey = 'NjE2MjIzMGUtOTM5YS00NzNjLWE0MmYtNDJhMWIyNDk1Y2U4';
        this.apiSecret = 'NDM1NmFiOWMtODI0MS00Y2M5LThiZmUtOGQyODU1YTA4NzIw'
    },
    async fetchMusic(){
        const fetchMusic = await fetch(`https://api.napster.com/v2.2/tracks/top?apikey=NjE2MjIzMGUtOTM5YS00NzNjLWE0MmYtNDJhMWIyNDk1Y2U4&apisecret=NDM1NmFiOWMtODI0MS00Y2M5LThiZmUtOGQyODU1YTA4NzIw`);
        const retrievedMusic = await fetchMusic.json();
        return retrievedMusic
    },
    async getSelection(){
        const fetchedMusic = await FetchData.fetchMusic();
        UI.createSelection(fetchedMusic);
    },
    async getPlayable(id){
        const fetchedMusic = await FetchData.fetchMusic();
        UI.playTrack(fetchedMusic, id);
    }
}
})();

const UI = (function(){
    return {
    createSelection(music){
    let newDiv = ''
        for (let i = 0; i < 6; i++){    
            console.log(music['tracks'][i]);
            const trackInfo = document.createElement('div');
            trackInfo.classList = `track-info`;
            trackInfo.id = `track-${i}`;
            document.querySelector('#tracks').appendChild(trackInfo);
            trackInfo.innerHTML = `
            <img class='album-cover' src=https://api.napster.com/imageserver/v2/albums/${music['tracks'][i]['albumId']}/images/500x500>
            <div class='track-text'>
            <h2>${music['tracks'][i]['name']}</h2>
            <p>${music['tracks'][i]['artistName']}</p>
            </div>
            `
        }
        const loadMore = document.createElement('div');
        loadMore.classList = 'load-more';
        document.querySelector('#tracks').appendChild(loadMore);
        loadMore.innerHTML = 'Load More';

    },
    playTrack(data, id){
        document.querySelector('#play-music').innerHTML = `
        <div class='music-player'>
        <img class='player-cover' src=https://api.napster.com/imageserver/v2/albums/${data['tracks'][id]['albumId']}/images/500x500>
        <h2 id='track-title'>${data['tracks'][id]['name']}</h2>
        <p id='artist'>${data['tracks'][id]['artistName']}</p>
        <audio src=${data['tracks'][id]['previewURL']} controls></audio>
        </div>
        <h2 class="select-again">Select Another Track?</h2>
        `
        document.querySelector('#selection-screen').style.display = 'none';
    },
    selectNewTrack(e){
        let trackId 
        console.log(e.target);
        //cleanthis up lol
        if (e.target.classList.contains('track-info')){
            trackId = e.target.id.split('-')[1];
            FetchData.getPlayable(trackId);
        } else if (e.target.classList.contains('cancel')){document.querySelector('#selection-screen').style.display = 'none';}

        },
    selectAgain(e){
        if (e.target.classList.contains('select-again')){
            document.querySelector('#selection-screen').style.display = 'block';}
    }
    }
})();

const App = (function(FetchData, UI){
    const loadEventListeners = function() {
    document.querySelector('#selection-screen').addEventListener('click', UI.selectNewTrack)
    document.querySelector('#play-music').addEventListener('click', UI.selectAgain)
    }
    return {
    init: function(){
        FetchData.getSelection();
        loadEventListeners();
        
    }}
})(FetchData, UI);

App.init();



// class FetchData{
//     constructor(apiKey, apiSecret){
//         this.apiKey = 'NjE2MjIzMGUtOTM5YS00NzNjLWE0MmYtNDJhMWIyNDk1Y2U4';
//         this.apiSecret = 'NDM1NmFiOWMtODI0MS00Y2M5LThiZmUtOGQyODU1YTA4NzIw'
//     }
//     async fetchMusic(){
//         const fetchMusic = await fetch(`https://api.napster.com/v2.2/tracks/top?apikey=NjE2MjIzMGUtOTM5YS00NzNjLWE0MmYtNDJhMWIyNDk1Y2U4&apisecret=NDM1NmFiOWMtODI0MS00Y2M5LThiZmUtOGQyODU1YTA4NzIw`);
//         const retrievedMusic = await fetchMusic.json();
//         return retrievedMusic
//     }
//     async getSelection(){
//         const fetchedMusic = await music.fetchMusic();
//         ui.createSelection(fetchedMusic);
//     }
//     async getPlayable(id){
//         const fetchedMusic = await music.fetchMusic();
//         ui.playTrack(fetchedMusic, id);
//     }
// }

// class UI{
//     createSelection(data){
//         console.log(data['tracks']);
//     let newDiv = ''
//         for (let i = 0; i < 7; i++){    
//             console.log(data['tracks'][i]['albumId']);
//             const trackInfo = document.createElement('div')
//             trackInfo.classList = `track-info`
//             trackInfo.id = `track-${i}`
//             document.querySelector('#tracks').appendChild(trackInfo);
//             trackInfo.innerHTML = `
//             <img class='album-cover' src=https://api.napster.com/imageserver/v2/albums/${data['tracks'][i]['albumId']}/images/500x500>
//             <div class='track-text'>
//             <h2>${data['tracks'][i]['name']}</h2>
//             <p>${data['tracks'][i]['artistName']}</p>
//             </div>
//             `
//         }
//     }
//     playTrack(data, id){
//         if (document.querySelector('.music-player')){
//         document.querySelector('.music-player').remove();
//         document.querySelector('.select-again').remove();
//         }
//         setTimeout(function(){
//         const musicPlayer = document.createElement('div')
//         document.querySelector('#play-music').appendChild(musicPlayer)
//         musicPlayer.classList = 'music-player'
//         musicPlayer.innerHTML = `
//         <img class='player-cover' src=https://api.napster.com/imageserver/v2/albums/${data['tracks'][id]['albumId']}/images/500x500>
//         <h2 id='track-title'>${data['tracks'][id]['name']}</h2>
//         <p id='artist'>${data['tracks'][id]['artistName']}</p>
//         <audio src=${data['tracks'][id]['previewURL']} controls></audio>
//         `
//         const startAgain = document.createElement('div');
//         startAgain.innerHTML = '<h2 class="select-again">Select Another Track?</h2>';
//         document.querySelector('#play-music').appendChild(startAgain);}, 50)
//     }
// }
// // const music = new FetchData;
// const ui = new UI;