<template lang="html">
  <div class="vue-countdown">
    <div class="block">
      <p class="digit">{{ days }}</p>
      <p class="text">Days</p>
    </div>
    <div class="block">
      <p class="digit">{{ hours }}</p>
      <p class="text">Hours</p>
    </div>
    <div class="block">
      <p class="digit">{{ minutes }}</p>
      <p class="text">Minutes</p>
    </div>
    <div class="block">
      <p class="digit">{{ seconds }}</p>
      <p class="text">Seconds</p>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      required: false,
      default: 100
    },
    date: {
      type: String,
      default: '',
      required: false
    }
  },
  data: function () {
    return {
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    /**
     * This computed property will return the amount of seconds representing the
     * moment our countdown timer has to go to.
     * @return {Number} amount of seconds we still need to go to.
     */
    dateInSeconds: function () {
      if (this.date != '') {
        return Math.trunc(Date.parse(this.date) / 1000)
      } else {
        return this.time
      }
    },
    seconds() {
        return (this.dateInSeconds - this.now) % 60;
    },
    minutes() {
        return Math.trunc((this.dateInSeconds - this.now) / 60) % 60;
    },
    hours() {
        return Math.trunc((this.dateInSeconds - this.now) / 60 / 60) % 24;
    },
    days() {
        return Math.trunc((this.dateInSeconds - this.now) / 60 / 60 / 24);
    }
  },
  created: function () {
    window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
  }
}
</script>

<style lang="css">
</style>
