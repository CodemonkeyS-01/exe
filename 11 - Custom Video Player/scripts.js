/* Get Our Elements*/
const player = document.querySelector(".player")
const video = player.querySelector('.viewer')
const progress = player.querySelector(".progress")
const progressBar = player.querySelector(".progress__filled")
const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll("[data-skip]")
const ranges = player.querySelectorAll(".player__slider")
const fullbtn = player.querySelector("#full")

// Build function here
function togglePlay(){
    const method = video.paused ? "play" : 'pause'
    video[method]()
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.innerHTML = icon
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value

}

function scurb(e){
    const scrubTime = (e.offsetX/ progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
    console.log(e)
}

function openUp(){
    video.requestFullscreen()
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100
    progressBar.style.flexBasis = `${percent}%`
    
}
// Hook up the event Listener here
video.addEventListener("click",togglePlay)
video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)
video.addEventListener("timeupdate", handleProgress)

toggle.addEventListener("click", togglePlay)

skipButtons.forEach(btn => btn.addEventListener("click", skip))

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate))
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate))

let mouseDown = false
progress.addEventListener('click', scurb)
progress.addEventListener('mousemove', (e) => mouseDown && scurb(e))
progress.addEventListener('mousedown', ()=> mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)


fullbtn.addEventListener("click", openUp)

