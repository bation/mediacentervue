<template>
  <div class="video-js">

    <video class='video-js vjs-default-skin vjs-big-play-centered' preload='auto' autoplay='autoplay'
      style='width:100%;height:100%' data-setup='{}' />

  </div>
</template>

<script>
  // import 'videojs-flash/dist/videojs-flash.min.js'
  import videojs from 'video.js'
  import 'video.js/dist/video-js.css'

  // import SWF_URL from 'videojs-swf/dist/video-js.swf'
  // videojs plugin
  export default {
    name: 'mediaComponentInline',
    components: {},
    props: {
      videoSrc: {
        type: String,
      },

     
    },

    data() {
      return {
        player: null
      }
    },
    mounted() {
      this.init(this.videoSrc)
      console.log(this.videoSrc)
    },
    beforeDestroy() {
      if (this.player) {
          this.player.dispose();
          this.player = null;
          this.createdom()
        }
    },
    watch: {

      videoSrc(val) {
        if (val)
          this.init(val)
      },
     
    },
    methods: {
      destroyPlayer() {
        if (this.player) {
          this.player.pause();
          this.player.dispose();
          this.player = null;
          this.createdom()
        }


      },
      createdom() {
        this.$el.innerHTML = ''
        var newVideo = document.createElement("div"); //创建一个标签		
        newVideo.innerHTML =
          "<video class='video-js vjs-default-skin vjs-big-play-centered' preload='auto' autoplay='autoplay'      style='width:100%;height:100%' data-setup='{}'/>";
        this.$el.appendChild(newVideo); //把创建的节点newVideo添加到父节点中；
      },

      init(videoSrc) {
        if(!videoSrc){
          this.msgError('视频地址无效！')
          return
        }
       
        // 设置flash路径,用于在videojs发现浏览器不支持HTML5播放器的时候自动唤起flash播放器
        // videojs.options.flash.swf = SWF_URL;
        if (this.player) {
          this.destroyPlayer()
        }

        //my-player为页面video元素的id
        this.player = videojs(this.$el.getElementsByTagName('video')[0], {
          live: true,
          // playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
          autoplay: false, // 如果为true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          techOrder: ['html5'],
          // techOrder: ['html5','flash'],
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          // flash: {
          //   hls: {
          //     withCredentials: false
          //   },
          //   swf: SWF_URL
          // },
          sources: [{
            src: videoSrc, // url地址
            // type: this.type
          }],
          poster: '', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true, // 是否显示全屏按钮
            volumeControl: true, // 声音控制键

          },
          controls: true,
        }, () => { //暂停后无法继续播放，刷新视频，没这个需求可以无视(感觉效果不是理想)
          // this.msgSuccess('ready')
          this.player.src(videoSrc)
          this.player.play()
        });

      }
    },



  }

</script>


<style scoped>
  .video-js {
    width: 100%;
    height: 100%;

  }

  .video-js .no-video {
    display: flex;
    height: 100%;
    font-size: 14px;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

</style>
