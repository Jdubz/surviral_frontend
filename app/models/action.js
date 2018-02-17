class Action {
  constructor(action) {
    this.id = action.id;
    this.name = action.name;
    this.log = action.log;
    this.requirements = action.requirements;
    this.modifiers = action.modifiers;
    this.time = action.time;
    this.sound_effect = action.sound_effect;
  }
}

export default Action;