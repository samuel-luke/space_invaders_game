function Sound(src) {
    this.Sound = document.createElement("audio");
    this.Sound.src = src;
    this.Sound.setAttribute("preload", "auto");
    this.Sound.setAttribute("controls", "none");
    this.Sound.style.display = "none";
    document.body.appendChild(this.Sound);
    this.play = function(){
    this.Sound.play();
        this.Sound.currentTime = 0;
        this.Sound.play();
    }
    this.stop = function(){
      this.Sound.pause();
    }
}