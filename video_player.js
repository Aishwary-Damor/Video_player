let p = 0;
const video_players = document.querySelectorAll(".video_player");
const score = document.querySelector("#myNumber");
console.log(score.innerHTML)
video_players.forEach(video_player => {
  const video_player_html =`
  <div class="loader"></div>
  ${video_player.innerHTML}
  <p class="caption_text"></p>
  
  
  <div class="controls active">
    <div class="progress-area">
      <div class="progress-bar">
        <span></span>
      </div>
    </div>
  
    <div class="controls-list">
      <div class="controls-left">
  
        <span class="icon">
          <i class="material-icons play_pause" >play_arrow</i>
        </span>
        <span class="icon">
          <i class="material-icons volume">volume_up</i>
  
          <input type="range" min="0" max="100" class="volume_range" />
        </span>
  
        <div class="timer">
          <span class="current">0:00</span> /
          <span class="duration">0:00</span>
        </div>
      </div>
  
      <div class="controls-right">
        <span class="icon">
          <i class="material-icons settingsBtn">settings</i>
        </span>  
      </div>
    </div>
  </div>
  
  <div class="settings">
    <div data-label="settingHome">
      <ul>
        <li data-label="quality">
          <span> Quality </span>
        </li>
      </ul>
    </div>
    <div data-label="quality" hidden>
      <span>
        <span>Quality settings </span>
      </span>
      <ul>
        <li data-quality="auto" class="active">auto</li>
      </ul>
    </div>
  </div>
  `;

  video_player.innerHTML = video_player_html;

    const mainVideo = video_player.querySelector(".main-video"),
    progressArea = video_player.querySelector(".progress-area"),
    progress_Bar = video_player.querySelector(".progress-bar"),
    play_pause = video_player.querySelector(".play_pause"),
    volume = video_player.querySelector(".volume"),
    volume_range = video_player.querySelector(".volume_range"),
    current = video_player.querySelector(".current"),
    totalDuration = video_player.querySelector(".duration"),
    settingsBtn = video_player.querySelector(".settingsBtn"),
    settings = video_player.querySelector(".settings"),
    settingHome = video_player.querySelectorAll(".settings [data-label='settingHome'] > ul > li"),
    loader = video_player.querySelector(".loader");

  function playVideo() {
    play_pause.innerHTML = "pause";
    play_pause.title = "pause";
    video_player.classList.add("paused");
    mainVideo.play();
  }

  function pauseVideo() {
    play_pause.innerHTML = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove("paused");
    mainVideo.pause();
  }

  play_pause.addEventListener("click", () => {
    const isVideoPaused = video_player.classList.contains("paused");
    isVideoPaused ? pauseVideo() : playVideo();
  });

  mainVideo.addEventListener("play", () => {
    playVideo();
  });

  mainVideo.addEventListener("pause", () => {
    pauseVideo();
  });

  mainVideo.addEventListener("loadeddata", (e) => {
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);
    min = totalMin*60 + totalSec;
    
    // if seconds are less then 10 then add 0 at the begning
    totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
    totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
  });
  // Current video duration
  mainVideo.addEventListener("timeupdate", (e) => {
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);
    // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
    current.innerHTML = `${currentMin} : ${currentSec}`;

    let videoDuration = e.target.duration;
    // progressBar width change
    let progressWidth = (currentVideoTime / videoDuration) * 100 + 0.5;
    progress_Bar.style.width = `${progressWidth}%`;
  });

  mainVideo.addEventListener('waiting', () => {
    loader.style.display = "block";
  })

  mainVideo.addEventListener('canplay', () => {
    loader.style.display = "none";
  })

  function changeVolume() {
    mainVideo.volume = volume_range.value / 100;
    if (volume_range.value == 0) {
      volume.innerHTML = "volume_off";
    } else if (volume_range.value < 40) {
      volume.innerHTML = "volume_down";
    } else {
      volume.innerHTML = "volume_up";
    }
  }

  function muteVolume() {
    if (volume_range.value == 0) {
      volume_range.value = 80;
      mainVideo.volume = 0.8;
      volume.innerHTML = "volume_up";
    } else {
      volume_range.value = 0;
      mainVideo.volume = 0;
      volume.innerHTML = "volume_off";
    }
  }

  volume_range.addEventListener("change", () => {
    changeVolume();
  });

  volume.addEventListener("click", () => {
    muteVolume();
  });

  progressArea.addEventListener("mousemove", (e) => {
    let progressWidthval = progressArea.clientWidth + 2;
    let x = e.offsetX;
    let videoDuration = mainVideo.duration;
    let progressTime = Math.floor((x / progressWidthval) * videoDuration);
    let currentSec = Math.floor(progressTime % 60);
    if (x >= progressWidthval - 80) {
      x = progressWidthval - 80;
    } else if (x <= 75) {
      x = 75;
    } else {
      x = e.offsetX;
    }

    currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  });
  
  mainVideo.addEventListener("ended", () => {
    p+=5;
    document.getElementById("myNumber").innerHTML = p;
  });
  settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("active");
    settingsBtn.classList.toggle("active");
  });
  

  const settingDivs = video_player.querySelectorAll('.settings > div');
  const quality_ul = video_player.querySelector(".settings > [data-label='quality'] ul");
  const qualities = video_player.querySelectorAll("source[size]");

  qualities.forEach(event => {
    let quality_html = `<li data-quality="${event.getAttribute('size')}">${event.getAttribute('size')}p</li>`;
    quality_ul.insertAdjacentHTML('afterbegin', quality_html);
  })

  const quality_li = video_player.querySelectorAll(".settings > [data-label='quality'] ul > li");
  quality_li.forEach((event) => {
    event.addEventListener('click', (e) => {
      let quality = event.getAttribute('data-quality');
      removeActiveClasses(quality_li);
      event.classList.add('active');
      qualities.forEach(event => {
        if (event.getAttribute('size') == quality) {
          let video_current_duration = mainVideo.currentTime;
          let video_source = event.getAttribute('src');
          mainVideo.src = video_source;
          mainVideo.currentTime = video_current_duration;
          playVideo();
        }
      })
    })
  })

  settingHome.forEach((event) => {
    event.addEventListener('click', (e) => {
      let setting_label = e.target.getAttribute('data-label');
      for (let i = 0; i < settingDivs.length; i++) {
        if (settingDivs[i].getAttribute('data-label') == setting_label) {
          settingDivs[i].removeAttribute('hidden');
        } else {
          settingDivs[i].setAttribute('hidden', "");
        }
      }
    })
  })

  function removeActiveClasses(e) {
    e.forEach((event) => {
      event.classList.remove("active");
    });
  }  
});