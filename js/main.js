const playlists = document.querySelectorAll('.playlists .playlist-item');
const ShowScreen = document.querySelector('.screen');
for (const key in playlists) {
    if (Object.hasOwnProperty.call(playlists, key)) {
        const playlist = playlists[key];
        const url = playlist.dataset.src;
        if(isImage(url)){
            playlist.setAttribute("data-type","image")
        }
        if(isVideo(url)){
            playlist.setAttribute('data-type', "video")
        }
    }
}

function isImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null);
}
function isVideo(url) {
    return(url.match(/\.(mp4|mkv|avi)$/) != null);
}


let currentItem = 1;
let interval = 0;

function playing(){
    const itemToPlay = playlists[currentItem];
    if(isVideo(itemToPlay.dataset.src)){
        ShowScreen.innerHTML = `<video src="${itemToPlay.dataset.src}"></video>`
        setTimeout(() => {
            const getduration = ShowScreen.children[0].duration;
            interval = getduration*1000;
            if(interval>0){
                

                // setTimeout(() => {
                //     ShowScreen.children[0].volume = 1;
                //     ShowScreen.children[0].muted = false;
                // }, 2000);
                const playPromise =  ShowScreen.children[0].play() || Promise.reject('');
                playPromise.then(() => {
                // Video could be autoplayed, do nothing.
                }).catch(err => {
                // Video couldn't be autoplayed because of autoplay policy. Mute it and play.
                ShowScreen.children[0].muted = true;
                ShowScreen.children[0].play()
                });
                window.addEventListener('keyup',(e)=>{
                    if(e.key === "m" || e.key ==="M"){
                        ShowScreen.children[0].volume = 1;
                        ShowScreen.children[0].muted = false;
                    }
                })
            }
        }, 2000);
    }else if(isImage(itemToPlay.dataset.src)){
        ShowScreen.innerHTML = `<img src="${itemToPlay.dataset.src}" alt=""></img>`;
        interval = 2000
    }
    setTimeout(() => {
        if (interval >0) {
            if(playlists.length===currentItem+1){
                currentItem =0
            }else currentItem++
        }

        setTimeout(() => {
            playing()
        }, interval);
    }, 2500);

    
}

playing()

