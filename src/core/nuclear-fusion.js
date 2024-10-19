import { DC } from "./constants";
import { Currency } from "./currency";
import FullScreenAnimationHandler from "./full-screen-animation-handler";
import { FusionUpgradeB } from "./fusion";

/**
 * Plays the fusion animation
 */
export function fusionAnimation() {
  FullScreenAnimationHandler.display("a-fusion", 3);
}

/**
 * When we perform a fusion, we need to handle any running challenges. Do that here
 * @returns 
 */
function handleChallengeCompletion() {
  const challenge = Player.fusionChallenge;
  if (!challenge) return;

  // Clear the IC notification after the first completion (only) so that it can show it again for the next one
  const inFC = FusionChallenge.isRunning;
  if (inFC && !FusionChallenge.current.isCompleted) TabNotification.FCUnlock.clearTrigger();

  challenge.complete();
  challenge.updateChallengeTime();
  if (!player.options.retryChallenge) {
    player.challenge.fusion.current = 0;
  }

  //update total challenge completions
  player.challenge.fusion.totalCompletions ++;

  //do this after incrementing total completions
  QuantumAchievement(43).tryUnlock();

  //update quantum web titles
  WebNetwork.updatePerkTitleText();
}

/**
 * Show a confirmation dialogue if we have the confirmation dialogue enabled in the
 * options AND if we have not already fused before.
 * Otherwise, immediately perform fusion
 * @returns exits the function if we cannot fuse
 */
export function manualFusionResetRequest() {
  if (!Player.canFuse) return;
  //if (GameEnd.creditsEverClosed) return;

  // We show the modal on the first ever fusion (to explain the mechanic)
  if (player.options.confirmations.fusion && !PlayerProgress.matterUnlocked()) {
    Modal.fusionModal.show();
  } else {
    fusionResetRequest();
  }
}

/**
 * Fusion helper function, first checking if we are able to fuse. If so, plays the fusion animation
 * if we have it enabled. After, or otherwise, actually perform the fusion logic
 * @param {*} disableAnimation 
 * @returns 
 */
export function fusionResetRequest(disableAnimation = false) {
  if (!Player.canFuse) return;
  if (!disableAnimation && player.options.animations.fusion && !FullScreenAnimationHandler.isDisplaying) {
    fusionAnimation();
    setTimeout(fusionReset, 1700);
  } else {
    fusionReset();
  }
}

/**
 * Performs Nuclear Fusion (use helper function instead of calling this directly)
 * This function will handle giving the fusion rewards, checking for unlocks, and
 * resetting everything pre-fusion, as well as dispatching game events
 * @param {*} forced was this fusion performed forcefully?
 * @param {*} auto was this fusion performed automatically?
 * @param {*} specialConditions additional special conditions present when fusing
 * @returns 
 */
export function fusionReset(forced = false, auto, specialConditions = {}) {
  if (!forced && !Player.canFuse) return;

  //if the player is able to fuse, give fusion rewards and check for unlocks
  if (Player.canFuse) {
    EventHub.dispatch(GAME_EVENT.FUSION_RESET_BEFORE);
    fusionGiveRewards();
    fusionCheckUnlocks();
  }

  const inFusionChallenge = Player.isInFusionChallenge

  //reset everything pre-fusion
  fusionUpdateStatistics();
  fusionResetValues(inFusionChallenge);
  EventHub.dispatch(GAME_EVENT.FUSION_RESET_AFTER);
}

/**
 * Gives rewards for fusing. In this case, matter
 */
function fusionGiveRewards() {
  const matter = gainedMatter();
  Currency.matter_quantum.add(matter);
  Currency.fused.add(gainedFusions().round());

  //achievement checking
  QuantumAchievement(24).tryUnlock();
  QuantumAchievement(45).tryUnlock();

  //fusionTabChange(!PlayerProgress.matterUnlocked());
  handleChallengeCompletion();
}

/**
 * update records for performing fusion
 */
function fusionUpdateStatistics() {

  //set best times
  player.records.bestFusion.bestMattermin =
    player.records.bestFusion.bestMattermin.clampMin(player.records.thisFusion.bestMattermin);
  player.records.thisFusion.bestMattermin = DC.D0;

  /*player.records.thisEternity.bestInfinitiesPerMs = player.records.thisEternity.bestInfinitiesPerMs.clampMin(
    gainedFusions().round().dividedBy(Math.clampMin(33, player.records.thisFusion.realTime))
  );*/

  const matter = gainedMatter();

  addFusionTime(
    player.records.thisFusion.time,
    player.records.thisFusion.realTime,
    matter,
    gainedFusions().round()
  );

  //set best times again
  player.records.bestFusion.time =
    Math.min(player.records.bestFusion.time, player.records.thisFusion.time);
  player.records.bestFusion.realTime =
    Math.min(player.records.bestFusion.realTime, player.records.thisFusion.realTime);

  //reset statistics & records
  player.records.thisFusion.time = 0;
  player.records.thisFusion.lastBuyTime = 0;
  player.records.thisFusion.realTime = 0;
}

/*function fusionTabChange(firstFusion) {
  const earlyGame = player.records.bestFusion.time > 60000;
  const inAntimatterChallenge = Player.isInAntimatterChallenge;
  handleChallengeCompletion();

  if (firstFusion) {
    Tab.infinity.upgrades.show();
  } else if (earlyGame || (inAntimatterChallenge && !player.options.retryChallenge)) {
    Tab.dimensions.antimatter.show();
  }
}*/

/**
 * Resets all pre-fusion stuff
 * @param {*} enteringChallenge 
 */
export function fusionResetValues(enteringChallenge = false) {

  EventHub.dispatch(GAME_EVENT.FUSION_RESET_BEFORE, 0);

  //reset challenge-related stuff
  if (enteringChallenge) resetChallengeStuff();

  //reset currencies
  Currency.quarks1.reset();
  Currency.electrons.reset();
  Currency.electricCharge.reset();

  //reset upgrades and autobuyers
  if (!FusionUpgradeB(1).isBought) ResetElectronUpgrades();

  //ResetPreFusionAutobuyers();
  player.upBoosts = 0;
  player.downBoosts = 0;
  softResetUpGenBoost(0, true, true);
  softResetDownGenBoost(0, true, true);

  //reset generators & tickspeed
  fullResetUpQuarkGenerator();
  fullResetDownQuarkGenerator();
  fullResetElectronGenerator();
  resetTickspeedQuantum();
  
  //Player.resetRequirements("infinity");
}

function fusionCheckUnlocks() {
  QuantumAchievement(26).tryUnlock();
}

function resetChallengeStuff(){
  console.log("Resetting challenge stuff");
  Currency.fc2_production.reset();
}

export function GeneratePassiveMatter(diff){
  if (FusionUpgrade2(6).isBought){
    const genPeriod = Time.bestFusion.totalMilliseconds * 10;
    let genCount;
    if (diff >= 1e300 * genPeriod) {
      genCount = Decimal.div(diff, genPeriod);
    } else {
      // Partial progress (fractions from 0 to 1) are stored in player.partMatter
      player.partMatter += diff / genPeriod;
      genCount = Math.floor(player.partMatter);
      player.partMatter -= genCount;
    }
    let gainedPerGen = player.records.bestFusion.time >= 999999999999 ? DC.D0 : FusionUpgrade2(6).effectValue;
    const gainedThisTick = new Decimal(genCount).times(gainedPerGen);
    Currency.matter_quantum.add(gainedThisTick);
  }
  Currency.matter_quantum.add(FusionUpgrade2(6).effectOrDefault(DC.D0).times(diff / 60000));
}

/*export function preProductionGenerateIP(diff) {
  if (InfinityUpgrade.ipGen.isBought) {
    const genPeriod = Time.bestInfinity.totalMilliseconds * 10;
    let genCount;
    if (diff >= 1e300 * genPeriod) {
      genCount = Decimal.div(diff, genPeriod);
    } else {
      // Partial progress (fractions from 0 to 1) are stored in player.partInfinityPoint
      player.partInfinityPoint += diff / genPeriod;
      genCount = Math.floor(player.partInfinityPoint);
      player.partInfinityPoint -= genCount;
    }
    let gainedPerGen = player.records.bestInfinity.time >= 999999999999 ? DC.D0 : InfinityUpgrade.ipGen.effectValue;
    if (Laitela.isRunning) gainedPerGen = dilatedValueOf(gainedPerGen);
    const gainedThisTick = new Decimal(genCount).times(gainedPerGen);
    Currency.infinityPoints.add(gainedThisTick);
  }
  Currency.infinityPoints.add(BreakInfinityUpgrade.ipGen.effectOrDefault(DC.D0).times(diff / 60000));
}
*/