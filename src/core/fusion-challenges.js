import { GameMechanicState } from "./game-mechanics";

/**
 * used for the auto-completion of challenges
 */
export function tryCompleteFusionChallenges() {

  //code for auto-completing challenge upon unlocked. could be useful later
  /*if (EternityMilestone.autoIC.isReached) {
    const toComplete = InfinityChallenges.all.filter(x => x.isUnlocked && !x.isCompleted);
    for (const challenge of toComplete) challenge.complete();
  }*/
}

class FusionChallengeRewardState extends GameMechanicState {
  constructor(config, challenge) {
    super(config);
    this._challenge = challenge;
  }

  get isEffectActive() {
    return this._challenge.isCompleted;
  }
}

class FusionChallengeState extends GameMechanicState {
  constructor(config) {
    super(config);
    this._reward = new FusionChallengeRewardState(config.reward, this);
  }

  /**
   * specifies the required amount of the resource to unlock this challenge
   */
  get unlockMatter() {
    return this.config.unlockMatter;
  }

  /**
   * determines the requirements to unlock this challenge
   */
  get isUnlocked() {
    return player.records.maxMatter.gte(this.unlockMatter);
  }

  /**
   * returns if the player is currently inside of a particular challenge
   */
  get isRunning() {
    return player.challenge.fusion.current === this.id;
  }

  /**
   * initializes checks for challenge, then shows challenge modal if challenge confirmaitons
   * are on. Otherwise, immediately start
   * @returns null
   */
  requestStart() {
    if (!this.isUnlocked) return;
    if (GameEnd.creditsEverClosed) return;
    if (!player.options.confirmations.challenges) {
      this.start();
      return;
    }
    Modal.startFusionChallenge.show(this.id);
  }

  /**
   * actually begin the challenge
   * @returns null
   */
  start() {
    //abort if this challenge is not unlocked or we're already in it
    if (!this.isUnlocked || this.isRunning) return;

    // Forces big crunch reset but ensures Matter gain, if any.
    // it's actually important that we do this first before setting the
    // challenge state, otherwise, it will cause a fusion immediately
    // after being marked as in the challenge, resulting in an
    // immediate challenge completion
    fusionReset(true, true);

    player.challenge.fusion.current = this.id;    

    //bring the player to the quark tab
    Tab.fermions.quarks.show();

    //player.break = true;
    //if (EternityChallenge.isRunning) Achievement(115).unlock();
  }

  /**
   * whether this challenge is completed
   */
  get isCompleted() {
    return (player.challenge.fusion.completedBits & (1 << this.id)) !== 0;
  }

  /**
   * do this when you have completed the challenge
   */
  complete() {
    player.challenge.fusion.completedBits |= 1 << this.id;
    EventHub.dispatch(GAME_EVENT.FUSION_CHALLENGE_COMPLETED);
  }

  /**
   * see if the challenge restrictions are active
   */
  get isEffectActive() {
    return this.isRunning;
  }

  /**
   * @return {FusionChallengeRewardState}
   */
  get reward() {
    return this._reward;
  }

  get isQuickResettable() {
    return this.config.isQuickResettable;
  }

  get goal() {
    return this.config.goal;
  }

  /**
   * the best challenge time for this challenge
   * @returns 
   */
  updateChallengeTime() {
    const bestTimes = player.challenge.fusion.bestTimes;
    if (bestTimes[this.id - 1] <= player.records.thisFusion.time) {
      return;
    }
    player.challenge.fusion.bestTimes[this.id - 1] = player.records.thisFusion.time;
    GameCache.fusionChallengeTimeSum.invalidate();

    QuantumAchievement(26).tryUnlock();
  }

  /**
   * exit this challenge prematurely
   */
  exit() {
    player.challenge.fusion.current = 0;
    fusionReset(true, false);
  }
}

/**
 * @param {number} id
 * @return {FusionChallengeState}
 */
export const FusionChallenge = FusionChallengeState.createAccessor(GameDatabase.challenges.fusion);

/**
 * @returns {FusionChallengeState}
 */
Object.defineProperty(FusionChallenge, "current", {
  get: () => (player.challenge.fusion.current > 0
    ? FusionChallenge(player.challenge.fusion.current)
    : undefined),
});

Object.defineProperty(FusionChallenge, "isRunning", {
  get: () => FusionChallenge.current !== undefined,
});

export const FusionChallenges = {
  /**
   * @type {FusionChallengeState[]}
   */
  all: FusionChallenge.index.compact(),
  completeAll() {
    for (const challenge of FusionChallenges.all) challenge.complete();
  },
  clearCompletions() {
    player.challenge.fusion.completedBits = 0;
  },
  get nextFC() {
    return FusionChallenges.all.find(x => !x.isUnlocked);
  },
  get nextFCUnlockMatter() {
    return this.nextFC?.unlockMatter;
  },
  /**
   * Displays a notification if the matter gained will surpass the next unlockMatter requirement.
   * @param value {Decimal} - total matter
   */
  /*notifyFCUnlock(value) {
    // Disable the popup if the user will automatically complete the IC.
    //if (EternityMilestone.autoIC.isReached) return;
    if (FusionChallenges.nextFC === undefined) return;
    for (const fc of FusionChallenges.all) {
      if (fc.isUnlocked || fc.isCompleted) continue;
      if (value.lt(fc.unlockMatter)) break;
      // This has a reasonably high likelihood of happening when the player isn't looking at the game, so
      // we also give it a tab notification
      TabNotification.ICUnlock.clearTrigger();
      GameUI.notify.infinity(`You have unlocked Fusion Challenge ${fc.id}`, 7000);
      TabNotification.ICUnlock.tryTrigger();
    }
  },*/
  /**
   * @returns {FusionChallengeState[]}
   */
  get completed() {
    return FusionChallenges.all.filter(fc => fc.isCompleted);
  }
};
