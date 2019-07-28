const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fbtn =  player.querySelector('[data-fullscreen]');


const inc = player.querySelector('.inc');
const dec = player.querySelector('.dec');
const nval = player.querySelector('.nval');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
  toggle.innerHTML = icon;
}
//Skip Timer
function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

//Controling Speed
function speed(val) {
  if(val == 'inc'){
      if(video['playbackRate'] == 2.0) {
          return false;
      } 
      uv = parseFloat(nval.textContent)+0.1;
      nval.textContent = uv.toFixed(2)+'x';
      video['playbackRate'] = uv;
      
  }
  else if(val == 'dec'){
      
      if(video['playbackRate'] == 0.5) {
          return false;
      }
      uv = parseFloat(nval.textContent)-0.1;
      nval.textContent = uv.toFixed(2)+'x';
      video['playbackRate'] = uv;
  }
  else{
      nval.textContent = '1x';
      video['playbackRate'] = 1;
  }
}
// Range
function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}



/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

inc.addEventListener('click', ()=>{ speed('inc') });
dec.addEventListener('click', ()=>{ speed('dec') });
nval.addEventListener('click', speed)

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fbtn.addEventListener('click', () => video.requestFullscreen());