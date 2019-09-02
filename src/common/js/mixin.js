import { mapGetters } from 'vuex';

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
    // playlist() {
    //   return this.$store.state.playlist;
    // }
  },
  mounted() {
    this.handlePlaylist(this.playlist);
  },
  activated() {
    this.handlePlaylist(this.playlist);
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal);
    }
  },
  methods: {
    handlePlaylist() {
      throw Error('component must implement handlePlaylist method');
    }
  }
};