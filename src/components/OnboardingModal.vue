<template>
  <el-dialog v-if="onboardingModalAvailable" :custom-class="`onboardingModal ${carouselIndex===0?'hiddenPrev':(carouselIndex===2?'hiddenNext':'')}`" v-model="onboardingModalVisible" @close="closeOnboarding" size="tiny" :close-on-click-modal="false">
    <el-carousel trigger="click" height="545px" :autoplay="false" arrow="always" @change="changeOnboarding" >
      <el-carousel-item>
        <img src="../assets/veeta-add-events.gif">
        <h3>Log Everything</h3>
        <p>
          With Veeta you can record any piece of information - just type it and hit Enter
        </p>
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/veeta-edit-event.gif">
        <h3>Flexible Events</h3>
        <p>
          When viewing an event, everything is editable - add your own fields, and set your own titles
        </p>
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/cat-paper.gif" style="max-height:270px">
        <h3>Play Around</h3>
        <p>
          Veeta is simple, but powerful. After you get the basics, we highly recommend to watch our Best Practices video.
        </p>
        <el-button type="primary" @click="onboardingModalClose">Okay, let's start!</el-button>
      </el-carousel-item>
      <el-button class="onboardingModalSkip" type="text" @click="onboardingModalClose">Skip</el-button>
    </el-carousel>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      onboardingModalAvailable: false,
      onboardingModalVisible: false,
      carouselIndex: 0
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    closeOnboarding() {
      this.$store.dispatch('setUser', { show_onboarding: false })
    },
    changeOnboarding(index) {
      this.carouselIndex = index
    },
    onboardingModalClose(e) {
      this.onboardingModalVisible = false
    }
  },
  mounted() {
    if (this.user.show_onboarding === true) {
      this.onboardingModalAvailable = true
      this.onboardingModalVisible = true
    } else {
      this.$store.watch((state) => state.user.show_onboarding, (show_onboarding) => {
        if (show_onboarding === true) {
          this.onboardingModalAvailable = true
          this.onboardingModalVisible = true
        }
      })
    }
  }
}
</script>

<style>
.onboardingModal {
  max-width: 360px;
  text-align: center;
}
.onboardingModal .el-dialog__header {
  display: none;
}
.onboardingModal .el-dialog__body {
  padding: 0;
}
.onboardingModal .el-carousel__item p {
  padding: 0 24px;
}
.onboardingModal.hiddenPrev .el-carousel__arrow--left,
.onboardingModal.hiddenNext .el-carousel__arrow--right {
  display: none;
}
.onboardingModal .el-carousel__item:nth-of-type(1) {
  color: #fff;
  background-color: #0079BF;
}
.onboardingModal .el-carousel__item:nth-of-type(2) {
  color: #fff;
  background-color: #42548E;
}
.onboardingModal .el-carousel__item:nth-of-type(3) {
  color: #fff;
  background-color: #61BD4F;
}
.onboardingModal img {
  width: 100%;
}
.onboardingModalSkip {
  color: #fff;
  opacity: 0.5;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 12px 24px;
}
.onboardingModalSkip:hover {
  opacity: 1;
}
</style>
