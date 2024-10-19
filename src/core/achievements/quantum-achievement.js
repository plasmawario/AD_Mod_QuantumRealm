import { FusionUpgrade } from "../fusion";
import { GameMechanicState } from "../game-mechanics";

import { SteamRuntime } from "@/steam";

class QuantumAchievementState extends GameMechanicState {
  constructor(config) {
    super(config);
    this._row = Math.floor(this.id / 10);
    this._column = this.id % 10;
    this._bitmask = 1 << (this.column - 1);
    this._inverseBitmask = ~this._bitmask;
    this.registerEvents(config.checkEvent, args => this.tryUnlock(args));
  }

  get name() {
    return this.config.name;
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }

  get isUnlocked() {
    return (player.quantumAchievementBits[this.row - 1] & this._bitmask) !== 0;
  }

  get isEffectActive() {
    return this.isUnlocked && !this.isDisabled;
  }

  tryUnlock(args) {
    if (this.isUnlocked) return;
    if (!this.config.checkRequirement(args)) return;
    this.unlock();
  }

  lock() {
    player.quantumAchievementBits[this.row - 1] &= this._inverseBitmask;
  }

  unlock(auto) {
    if (this.isUnlocked) return;
    player.quantumAchievementBits[this.row - 1] |= this._bitmask;

    GameUI.notify.success(`Achievement: ${this.name}`);
    //SteamRuntime.activateAchievement(this.id);
    
    if (player.speedrun.isActive && !player.speedrun.achievementTimes[this.id]) {
      // This stores a lot of data in the savefile and seems particularly suceptible to floating-point rounding issues
      // for some reason, so we floor to get rid of fractions of milliseconds and reduce what filesize impact we can

      player.speedrun.achievementTimes[this.id] = Math.floor(player.records.realTimePlayed);
    }
    QuantumAchievements._power.invalidate();
    EventHub.dispatch(GAME_EVENT.ACHIEVEMENT_UNLOCKED);
  }
}

/**
 * @param {number} id
 * @returns {QuantumAchievementState}
 */
export const QuantumAchievement = QuantumAchievementState.createAccessor(GameDatabase.achievements.quantum);

export const QuantumAchievements = {
  /**
   * @type {QuantumAchievementState[]}
   */
  all: QuantumAchievement.index.compact(),

  get allRows() {
    const count = QuantumAchievements.all.map(a => a.row).max();
    return QuantumAchievements.rows(1, count);
  },

  rows: (start, count) => Array.range(start, count).map(QuantumAchievements.row),

  row: row => Array.range(row * 10 + 1, 8).map(QuantumAchievement),

  get effectiveCount() {
    const unlockedAchievements = QuantumAchievements.all.countWhere(a => a.isUnlocked);
    return unlockedAchievements;
  },

  _power: new Lazy(() => {
    const unlockedRows = QuantumAchievements.allRows
      .countWhere(row => row.every(ach => ach.isUnlocked));
    const basePower = Math.pow(1.25, unlockedRows) * Math.pow(1.03, QuantumAchievements.effectiveCount);
    const exponent = 1;
    return Math.pow(basePower, exponent);
  }),

  get power() {
    return QuantumAchievements._power.value + FusionUpgrade(1).effectOrDefault(0);
  },

  /*updateSteamStatus() {
    for (const achievement of Achievements.all.filter(x => x.isUnlocked)) {
      SteamRuntime.activateAchievement(achievement.id);
    }
  }*/
};

/*EventHub.logic.on(GAME_EVENT.PERK_BOUGHT, () => {
  player.reality.achTimer = Math.clampMax(player.reality.achTimer, Achievements.period);
});
*/