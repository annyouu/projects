'use strict';
{
  (() => {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }

    const canvas2 = document.getElementById('progressCanvas');
    if (typeof canvas2.getContext === 'undefined') {
      return;
    }

    const progressContainer = document.getElementById('progressContainer');


  
    class Bar {
      constructor(canvas2) {
        this.cox = canvas2.getContext('2d');
        this.barWidth = 300;
        this.barHeight = 30;
        this.duration = 7500;
        // this.percentage;
        // this.timestamp;
        this.startTime = null;
      }
      draw2(percentage) {
        this.cox.clearRect(0, 0, canvas2.width, canvas2.height);
        this.cox.fillStyle = '#ccc';
        this.cox.fillRect(75, 25, this.barWidth, this.barHeight);
        
        this.cox.fillStyle = '#000';
        this.cox.fillRect(75, 25, this.barWidth * (percentage / 100), this.barHeight);

        this.cox.fillStyle = '#000';
        this.cox.font = '20px Arial';
        this.cox.fillText(`${Math.round(percentage)}%`, 
        this.barWidth / 2 - 135,this.barHeight / 2 + 30);
        
      }
      animate(timestamp) {
        if (this.startTime === null) {
          this.startTime = timestamp;
        }
       
       const elapsed = timestamp - this.startTime; // startTimeから経過した時間

       //％の計算
       this.percentage = Math.min((elapsed / this.duration) * 100, 100);

        this.draw2(this.percentage);

        if (this.percentage < 100) {
          requestAnimationFrame(this.animate.bind(this));
        } else {
          progressContainer.style.opacity = '0';
          setTimeout(() => {
           progressContainer.style.display = 'none';
           mainContent.style.display = 'block'
          }, 500);
        }
      }
      run2() {
        requestAnimationFrame(this.animate.bind(this));
      }
    }

    const bar = new Bar(canvas2);
    bar.run2();

    class IconDrawer {
      constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.r = 60;
      }
       draw(angle) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.save();

        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(Math.PI / 180 * angle);

        // this.ctx.beginPath();
        // this.ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        // this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0 - this.r - 5);
        this.ctx.lineTo(0, 0 - this.r + 5);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 6;
        this.ctx.stroke();

        this.ctx.restore();
      }

    }

    class Icon {
      constructor(drawer) {
        this.drawer = drawer;
        this.angle = 0;
      }

      draw() {
        this.drawer.draw(this.angle);
      }

     
      update() {
        this.angle += 12;
      }

      run() {
        this.update();
        this.draw();

        setTimeout(() => {
          this.run();
        }, 100);
      }
    }

    const icon = new Icon(new IconDrawer(canvas));
    icon.run();
  })();
}