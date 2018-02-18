import {
    observable,
    action,
    computed
} from 'globalImports';

import { Howler } from 'howler';

class AudioManagerStore {
    @observable isMuted = true;
    @observable currentSound = null;

    @action mute = () => {
      this.isMuted = true;
      Howler.volume(0);
    };
    @action unmute = () => {
      this.isMuted = false;
      Howler.volume(1);
    };
    @action play = (sound) => {
      if (this.currentSound !== null) {
        this.currentSound.stop();
      }

      this.currentSound = sound;
      this.currentSound.play();
    }

    @computed get isPlaying() {
        return this.currentSound !== null;
    };
}

export default AudioManagerStore;
