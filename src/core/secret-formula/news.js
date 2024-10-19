import { DC } from "../constants";
import { PlayerProgress } from "../player-progress";

//for mat for vanilla AD:
// A = always there
// L = locked
// R = random chance condition
// P = patreon
// AI = created with gpt2

//for my own news tickers:
// J = actual jokes and puns
// S = pointless shitposts

function newsAnimSpd(seconds) {
  return seconds / player.options.news.speed;
}


export const news = [
  /* actual jokes */
  {
    id: "j1",
    text: "The existence of the proton implies the existence of the noobtron",
  },
  {
    id: "j2",
    get text() {
      return "Your mom is so fat, she interacts with the 2nd generation of the higgs boson";
    },
    get unlocked() { return true; }
  },
  {
    id: "j3",
    text: `I started maing so many quarks from playing this game. I got so excited, but
          then i came to the realization that i cannot hold onto my quarks anymore from
          producing so many. I got so mad that i blew a fuse.`,
  },
  {
    id: "j4",
    get text() {
      const hmm = ["bottoms", "tops"];
      const rnd = Math.floor(1);
      return `2 quarks decide to hook up and enter a bedroom. Unfortunately,
            they found out they were both ${ hmm[rnd] }`;
    }
  },
  {
    id: "j5",
    text: `The reason why the gluon is called what it is is because when up quarks and down quarks get
          together to form a proton or neutron, they stick together. Like glue.`,
    get unlocked() { return PlayerProgress.matterUnlocked() }
  },
  {
    id: "j6",
    text: "\"Electrons? I find them repulsive\" - electron",
  },
  {
    id: "j7",
    text: "Quantum garbage: empty when full",
  },
  {
    id: "j8",
    text: "Antimatter? Where's unclematter?",
  },
  {
    id: "j9",
    text: "\"The animatomic characters do get a bit quarky at night...\"",
  },
  {
    id: "j9",
    text: "When you reached the Top, the only thing left to do is to explore the Bottom",
  },
  {
    id: "j10",
    text: "A brand new cereal brand was made that consists of little trees and denial. They're called \"New tree-no's!\"",
  },
  {
    id: "j11",
    text: "Cats around the world are very accepting of string theory. \"It just makes the world seem better if it was all made of tiny strings\", they say, as one of them chases a ball of yarn",
  },
  {
    id: "j15",
    text: "Boson battle pass. I just fused in my ass. Giving you my gluon, cuz i need mom, to get that boson battle pass",
  },
  {
    id: "j16",
    text: "Hot naked singularities in your area!",
  },
  {
    id: "j17",
    text: "Coming soon: Infinity Challenge 6, where exponentially growing antimatter divides your matter production.",
  },
  {
    id: "j18",
    text: "Baryon my wayword son~",
  },
  {
    id: "j19",
    text: "Shiny neutrons have just been installed. Not sure what we'll do about the oldtrons yet",
  },
  {
    id: "j20",
    get text() {
      return "Hey, WATT's up?";
    },
    onClick() {
      return "Electric eels, THAT'S watt's up!";
    }
  },
  {
    id: "j21",
    text: "Someone told me that i was made up almost entierly of fermions. I did a 180 spin in response",
    //absolutely no one is going to get this joke but it's a reference to fermions having a spin number of 1/2
  },
  {
    id: "j22",
    text: "Someone brought me a brand new flashlight and turned it on. I gave it a 360 spin in response",
    //absolutely no one is going to get this joke but it's a reference to gauge bosons having a spin number of 1
  },
  {
    id: "j23",
    text: "Someone was talking to me about my mass. I did not spin in response",
    //absolutely no one is going to get this joke but it's a reference to scalar bosons having a spin number of 0
  },
  {
    id: "j24",
    text: "Someone was interested in gravity and gravitational waves. I did a 720 spin in response",
    //absolutely no one is going to get this joke but it's a reference to the graviton having a spin number of 2
  },


  /* shitposts */

  {
    id: "s1",
    text: "It is i",
  },
  {
    id: "s2",
    text: "                                                                            Oop- i bet you thought your news ticker was broken, didn't you?",
  },
  {
    id: "s3",
    text: "I'm running out of ideas pls help me",
  },
  {
    id: "s4",
    text: "h",
  },
  {
    id: "s5",
    text: "The fourth generation of quarks is not real, but you can make it real by lighting $3.99 on fire",
  },
  {
    id: "s6",
    text: "Take out your motherboard and dip it in bacon grease. Spin it around 7 times and throw it as hard as you can at the wall. Glue it back together with elmer's glue. The one with the cow on the bottle. Spit on it, slap it with one of those sticky slap hands you get and stick on the ceiling and never get down. Do a frontflip. Now a backflip. Spin around 7 times the opposite direction of the time you spun the motherboard. Put it back in",
  },
  {
    id: "s7",
    text: `<div style='background: url("./images/whatyouthink.webp"); background-size: 100% 100%; width: 2.3rem; height: 2.5rem; margin-top: -0.1rem'></div>`,
  },
  {
    id: "s8",
    text: `<span style='background-color: #ff0000; color: #FFFF00;'>// ALERT //</span> Ohio will be eliminated`,
  },
  {
    id: "s9",
    get text() {
      const rnd = Math.floor(Math.random() * 49);
      return `About ${ rnd }% of statistics are made up`;
    }
  },
  {
    id: "s10",
    text: `Infinite poop. You sit on the toilet to poop, but the poop never stops coming out of your butt.
          You have to start flushing the toilet every two minutes to keep up. You try to pinch your butt
          closed but that makes your insides hurt. The poop accelerates. You call 911. The paramedics call
          for doctors. The doctors call for specialists. The story trends on Twitter. You turn down talk
          show appearances. Your septic tank fails. People form a cult. Your toilet is finished. Volunteers
          arrive with buckets and shovels. You are completely used to the smell. The poop accelerates. You
          are moved to a stepladder with a hole in the top step. The poop accelerates. The shovelers abandon
          the buckets and shovel directly out the window. The poop accelerates. A candlelight vigil forms
          around your house. One of the workers falls over and can't free himself. The poop accelerates. A
          priest knocks over the stepladder and tackles you out the window. You land in the pile. The poop
          accelerates. The force now propels you forward and upward. Vigil goers grab at your legs. The poop
          ignites from their candles. The Facebook live event hits 1 million viewers. The poop accelerates.
          You are 30 feet in the air. The fire engulfs the vigil and your house. 60 feet. The poop accelerates.
          The torrent underneath you is deafening. 5 million Facebook live viewers. You try to close up shop but
          your butthole disintegrated long ago. 120 feet up. Your house explodes. The poop accelerates.
          1000 feet. You are now tracked on radar. You try to change your angle of ascent but you should have
          thought of that way earlier. The poop accelerates. 4,000 feet. NORAD upgrades to DEFCON 3.
          Concentric circles of fire engulf your city. The poop accelerates. You have broken the sound barrier.
          30,000 feet. You no longer take in enough oxygen to sustain consciousness. 60,000 feet. CNN is reporting
          on all the world records you've broken. 200,000 feet. You are no longer alive. The poop accelerates.
          Your body disintegrates but your poop contrail remains. NASA can no longer track you. You break the
          light-speed barrier and we can no longer bear witness. The poop accelerates. Forever.`,
  },
  {
    id: "s11",
    text: "Larry Tesler, inventor of the cut, copy, and paste commands, dies at 74",
  },
  {
    id: "s12",
    text: "August 12th 2036: The heat death of the universe",
  },
  {
    id: "s13",
    text: "among us",
  },
  {
    id: "s14",
    text: `
    <span style='animation: a-text-wave 1s infinite'>\\(^~^)/</span><span style='animation: a-text-wave2 1s infinite'>\\(^~^)/</span>
    <span style='animation: a-text-wave 1s infinite'>\\(^~^)/</span><span style='animation: a-text-wave2 1s infinite'>\\(^~^)/</span>
    <span style='animation: a-text-wave 1s infinite'>\\(^~^)/</span><span style='animation: a-text-wave2 1s infinite'>\\(^~^)/</span>
    <span style='animation: a-text-wave 1s infinite'>\\(^~^)/</span><span style='animation: a-text-wave2 1s infinite'>\\(^~^)/</span>
    <span style='animation: a-text-wave 1s infinite'>\\(^~^)/</span><span style='animation: a-text-wave2 1s infinite'>\\(^~^)/</span>`,
  },
  {
    id: "s15",
    text: "👁👄👁",
  },
  {
    id: "s16",
    text: "John madden. John Madden. John Madden.",
  },
  {
    id: "s17",
    text: "You like kissing matter, don't you?",
  },
  {
    id: "s18",
    text: "asdnaskhdfklashnkjadfgfdgndfgbhdfterjrjtgzrdgfeshfilueanbhfkjrhngzkb",
  },
  {
    id: "s19",
    text: "L4 siege is the best gun in gorod krovi",
  },
  {
    id: "s20",
    text: "Go to sleep",
  },
  {
    id: "s21",
    text: "Consequences have actions",
  },
  {
    id: "s22",
    text: "Can we get much higher?",
  },
  {
    id: "s23",
    text: "Fuck fuck fuck fuck fuck fuck fuck fuck",
  },
  {
    id: "s24",
    text: "Can you please stop reading me? I'm very shy",
  },
  {
    id: "s25",
    text: "Blink twice if they're holding you hostage",
  },
  {
    id: "s26",
    text: "If you or a loved one has been diagnosed with mesothiloma, you may be entitled to financial constipation",
  },
  {
    id: "s27",
    text: "Killer whale is actually a mistranslation from i forgot what language",
  },
  {
    id: "s28",
    text: "I forgor",
  },
  {
    id: "s29",
    text: "I am rapidly approaching your location",
  },
  {
    id: "s30",
    text: `\"Alright i've ust received word that i should not have mentioned the control group. They also tell me i outta stop making these awful news ticker message. That gave me an idea: make more awful news ticker messages! I wrote the mod here i can write awful news ticker messages all damn day!\"`,
  },
];

/*
  below are a few of the existing news tickers that were manually selected because they have special
  logic to them that i might wanna replicate

  {
    id: "a167",
    text:
      `Oh, I appear to have run out of <span style='animation: a-existence-glow 3s
      infinite; font-size: 1.8rem; color: white; line-height: 0;'>Existence</span>.`,
  },
  {
    id: "a1",
    text: "The cookie is a lie.",
  },
  {
    id: "a92",
    get text() {
      const games = [
        {
          name: "Antimatter Dimensions",
          link: "https://ivark.github.io/"
        },
        {
          name: "FE000000",
          link: "https://dan-simon.github.io/misc/fe000000/"
        },
        {
          name: "Trimps",
          link: "https://trimps.github.io/"
        },
        {
          name: "Mine Defense (the game's ui is broken on https so make sure you're on http!)",
          link: "http://scholtek.com/minedefense"
        },
        {
          name: "Wizard and Minion Idle",
          link: "https://www.kongregate.com/games/Oninou/wami"
        },
        {
          name: "Anti-Idle",
          link: "https://www.kongregate.com/games/Tukkun/anti-idle-the-game"
        },
        {
          name: "Synergism",
          link: "https://pseudo-corp.github.io/SynergismOfficial/"
        },
        {
          name: "Universal Paperclips",
          link: "https://www.decisionproblem.com/paperclips/index2.html"
        },
        {
          name: "Monies<sup>2</sup",
          link: "https://sneekxy.nmtechgroup.com/monies2/"
        },
        {
          name: "The First Alkahistorian stages 1, 2, and 3",
          link: "https://nagshell.github.io/elemental-inception-incremental/"
        },
        {
          name: "Melvor Idle",
          link: "https://melvoridle.com/"
        }
      ];
      const game = games.randomElement();
      return `An unidentified developer of Antimatter Dimensions would like to
        recommend that you play <a href="${game.link}" target="_blank">${game.name}</a>`;
    },
  },
  {
    id: "a130",
    text: "Click this to unlock that one secret achievement.",
    // This next line is needed for this news ticker to unlock
    // the secret achievement.
    onClick: () => undefined
  },
  {
    id: "a173",
    text:
      `<span style='animation: a-game-header__antimatter--glow 3s infinite'>This
      text is made of antimatter. Do not touch or else the universe will collapse.</span>`,
    onClick: () => bigCrunchAnimation(),
  },
  {
    id: "a184",
    text:
      `<span style='animation: a-text-grow 1s infinite'>R̵̬̙͋͂̀̋͑̈́̇͠Ê̵͇͎͂̂̍̓̌̐̋̋̀̀̔M̶̨̲̯̘͙̬̥̮̣͚̱̫͛̽̃͌̚͝
      "Ą̴͍̝͐Į̷̛̲̯̫̘͌́̄̏͌̀̈́͝͝Ṅ̶̛̻̠̠̤̦̞̞͗̎̊̌̊͝͠</span><span style='animation: a-text-shrink 1s infinite'>
      Ḁ̷̛͂̈́͗̎̃̓͛́͘ͅW̶̡̖͓̗̦̃̇̌̀͝A̵͇̭͉̓̎̈̿̊́̄̚͜R̶̝͚̲̭͎͇͎͓͖͚͇̀̈́͗̃̏̂̌͝͝Ę̴̡̤͙͈̝̬̰͒͘</span><span style
      ='animation: a-text-grow 1s infinite'> ̶̺̈́́̆̓͘͘Ồ̸̢̢̮͓̯̗͙͚̬̉͊̿F̶̠̤̱̱̱͊̂̍̔̃͆̆̑̿͘</span><span style='animation:
      a-text-shrink 1s infinite'> ̴̨̞̠̮͚̱͉͋̔͗̽̈́́́̅ͅỴ̶̣̙̹͚̲͔̲̼̬̥̀͌̒̾͘͘O̵̪̠̗̝̗̘̜͚̮̊͒͆̃̀̌̒͝ͅU̸͎͗̍̑̎̅̅͝R̵̗͑̽̏̓͆͒̈́͌͘̕
      </span><span style='animation: a-text-grow 1s infinite'> ̸̑̽̇̆͊̔̍̊̈́̈́͘ͅS̸̘͐͝U̴̥̭̚͘R̸̖̜͍͒́̋͆̈́̓
      R̸̡̛̛̪̝̟̱̣̹̭̟̣̀̈̀̏̉̌͝͠Õ̶͙͈͖̠͇̬͍̟̰U̵̩̫͉̝͔̼͎̦̔̓̽͌͊̏̇̓̀̓̀Ņ̸͍͇̘̙̥̰͉̲͕͈̥̍͛̃̑͝Ḑ̵̤̻̖̱̘̯̝̖̈̌̄̕͝
      Ī̶̜̱̈́̑̃̉̄̋̔͐͋͠Ṅ̴͎̞͍̽͊͛̈́̅͛̈̅̚͠Ģ̸̢̾͊S̷̫̼̜̼͇̋͛̎͑͆̅̓̇</span>`,
  },
  {
    id: "a186",
    text:
      `<span style='animation: a-text-shrink 1s infinite'>/(^_^)/</span> <span style='animation: a-text-grow 1s infinite
      '>\\(^_^)\\</span> <span style='animation: a-text-shrink 1s infinite'>/(^_^)/</span> <span style='animation:
      a-text-grow 1s infinite'>\\(^_^)\\</span> <span style='animation: a-text-shrink 1s infinite'>/(^_^)/</span> <span
      style='animation: a-text-grow 1s infinite'>\\(^_^)\\</span>`,
  },
  {
    id: "a187",
    text: "𝓒𝓮𝓬𝓲 𝓷'𝓮𝓼𝓽 𝓹𝓪𝓼 𝓾𝓷 𝓶𝓮𝓼𝓼𝓪𝓰𝓮 𝓭𝓮 𝓷𝓸𝓾𝓿𝓮𝓵𝓵𝓮𝓼 🚬"
  },
  {
    id: "a192",
    // This ticker needs to be an unbroken string; using backtick strings and linebreaking will add spaces in the
    // ticker itself where the linebreaks are
    // eslint-disable-next-line max-len
    text: "179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624224137216"
  },
  {
    id: "a196",
    text: "Disco Time! (click me!)",
    onClick() {
      let random = Math.random();
      // Golden ratio
      random += 0.618033988749895;
      random %= 1;
      random *= 255;
      const color = `hsl(${random}, 90%, 60%)`;
      return `<span style='color: ${color}; text-shadow: 0 0 0.5rem ${color};
        animation: a-text-grow 0.4s infinite;'>Disco Time!</span>`;
    },
  },
  {
    id: "a210",
    get text() {
      const clicks = player.news.specialTickerData.uselessNewsClicks;
      const quantity = quantify("time", clicks);
      if (clicks === 1) {
        return `Nothing happens when you click this text. And yet, you've clicked it.`;
      }
      if (clicks > 1) {
        return `Nothing happens when you click this text. And yet, you've clicked it ${quantity}.`;
      }
      return "Nothing happens when you click this text. And you understand that.";
    },
    onClick() {
      player.news.specialTickerData.uselessNewsClicks++;
      return this.text;
    }
  },
  {
    id: "a211",
    get text() {
      const disses = [
        "That's basically a rounding error.",
        "That might as well be zero.",
        "Did you forget an exponent somewhere?",
        "Please, that's nothing."
      ];
      const diss = disses.randomElement();
      return `Only ${format(Currency.antimatter.value, 2, 0)} antimatter? ${diss}`;
    },
  },
  {
    id: "a230",
    get text() {
      return `You started playing this game nearly
        ${TimeSpan.fromMilliseconds(Date.now() - player.records.gameCreatedTime).toString()}
        ago. Thank you for playing!`;
    },
    dynamic: true
  },
  {
    id: "a238",
    get text() {
      return `AD Player: "How many orders of magnitude are you on?" Normal person: "Like, maybe 5 or 6 right now, my
      dude." AD Player: "You are like a little baby. Watch this: <span style='animation: a-text-crunch
      ${newsAnimSpd(22)}s 1; font-size: 0;'>C R O N C H</span>"`;
    },
  },
  {
    id: "a245",
    get text() {
      // \uE010 = :blob:
      const BLOB = "\uE010";
      const theme = Theme.current().displayName();
      const reasons = {
        Normal:
          `it has this certain elegant simplicity to it. You just know it's the way the developer intended you
          to see the game.`,
        Metro:
          `of the beautiful thin borders, pixel perfect harsh geometric edges, and simply delightfully well
          balanced color palette.`,
        Dark: "it's very easy on the eyes, and has this nice playful tone to it in both the colors and the shapes.",
        DarkMetro:
          `it's just so soothing to look at, with that perfect blend of professional and playful design,
          with just a splash of color.`,
        Inverted:
          `it gives you these transcendently beautiful color combinations that you would normally never
          see in a typical dark theme.`,
        InvertedMetro:
          `it gives off this very stern vibe, with these highly contrasting colors clashing with a
          professional modern sort of design.`,
        AMOLED: "it saves 10% more energy compared to using a light theme. Doesn't everyone love saving energy?",
        AMOLEDMetro:
          `it has a nice look to it that resembles the control panel of a sci-fi spaceship. ...No, you can't
          actually fly a spaceship, unfortunately.`,
        S1: "it really gets me in the holiday spirit. I can just feel the magic in the air!",
        S2: "it makes me proud to be Finnish, and proud to celebrate all that we have accomplished as a people.",
        S3: "it's a beautiful analogue for life, in that it's ever changing and never quite right.",
        S4:
          `it has this wonderfully chaotic design, to the point where it's nearly completely impractical.
          And there's a certain beauty in that.`,
        S5:
          `the image of that man permeates throughout all of pop culture. And having this blown-up
          picture of him in the background is just rather humorous.`,
        S6:
          `that beautifully animated background just entrances you, and then the subtle tone and
          colors pull you in and fully immerse you into the game.`,
        S7: "I always had fond memories of that background from my childhood.",
        S8: "it makes it a lot easier to sneak in a little gameplay at the office.",
        S9: "lol you can't even ever see this in the game",
        S10:
          `it has a crisp and soothing design that really appeals, and its background is complex and enthralling.
          It gives you the feeling of standing at the helm of a futuristic interstellar ship.`,
        S11:
          `the Blob is an iconic character in the Antimatter Dimensions official Discord server. It is widely used
          to express emotions in a lovely way. It is a fact that the Blobs are evolving. ${BLOB} always seek to be
          more expressive. Then someday, a new ${BLOB} is born in the server, to express further emotions. Usually,
          ${BLOB} are just blobbling and bouncing around, occasionally merging and dividing. Only ${BLOB} know where
          they are from or where they are going to go. Still, ${BLOB} are there, always with me.
          You love ${BLOB}, so ${BLOB} loves you too.`,
        S12:
          `it makes you feel warm and comfortable, as if you were right at home. However, it is highly recommended
          to update your theme to the newest theme for the best user experience.`,
      };
      const reason = reasons[Theme.current().name.replace(/\s/gu, "")];
      return `Ah, a fellow ${theme} theme user. I see that you have impeccable taste.
        I myself like the ${theme} theme too, because ${reason}`;
    },
    dynamic: true
  },
  (function() {
    let isFlipped = false;
    const normal =
      `This news message is a test of "News 2.0". News 2.0 will feature things like the ability to
      click on news messages to flip them upside down!`;
    const flipped =
      `¡uʍop ǝpᴉsdn ɯǝɥʇ dᴉlɟ oʇ sǝƃɐssǝɯ sʍǝu uo ʞɔᴉlɔ oʇ ʎʇᴉlᴉqɐ ǝɥʇ ǝʞᴉl sƃuᴉɥʇ ǝɹnʇɐǝɟ llᴉʍ 0˙ᄅ
      sʍǝN ˙,,0˙ᄅ sʍǝN,, ɟo ʇsǝʇ ɐ sᴉ ǝƃɐssǝɯ sʍǝu sᴉɥ┴`;
    return {
      id: "a247",
      get text() {
        return isFlipped ? flipped : normal;
      },
      reset() {
        isFlipped = false;
      },
      onClick() {
        isFlipped = !isFlipped;
        return this.text;
      }
    };
  }()),
  {
    id: "a250",
    get text() {
      let scene = "";
      const chasers = [
        ["🐖", "🐢", "🦆", "🐓", "🐜", "🐕", "🐈"],
        ["🚶‍", "🏃‍️", "🏇", "🚴‍"],
        ["🚗", "🚓", "🚕", "🛺", "🚙", "🚌", "🚐", "🚎", "🚑", "🚒", "🚚", "🚛", "🚜"],
        ["🚁", "🛸"]
      ];
      for (const set of chasers) {
        const chaser = set.randomElement();
        for (let i = 0; i < 3; i++) {
          if (Math.random() > 0.5 || !scene.includes(chaser)) scene += chaser;
        }
        scene += "&nbsp;&nbsp;&nbsp;";
      }
      return scene;
    }
  },
  {
    id: "a252",
    get text() {
      return `<span style='animation: a-text-stretch ${newsAnimSpd(35)}s 1 forwards'>This message is dilated.</span>`;
    },
    get unlocked() { return PlayerProgress.realityUnlocked() || PlayerProgress.dilationUnlocked(); }
  },
  {
    id: "a288",
    get text() {
      const position = player.news.specialTickerData.newsQueuePosition--;
      if (position > 1) {
        return `Thank you for contacting customer support. Your satisfaction is very important to us, and a company
          representative will be with you shortly. You are now at position ${position} in the queue. Thank you for
          your patience, and please enjoy these quality selected news messages as you wait.`;
      }
      return "Thank you for contacting customer support, this is Jane, how may I help you today?";
    }
  },
  {
    id: "a289",
    text: "Click here to disassemble the news ticker for a trace amount of paperclips.",
    onClick() {
      player.news.specialTickerData.paperclips++;
      GameOptions.toggleNews();
    }
  },
  {
    id: "a290",
    get text() {
      const paperclips = player.news.specialTickerData.paperclips;
      return `You see, this news isn't normal news. It is being produced by the first news dimension. If you want
        to unlock more news, you have to collect enough paperclips to build the second news dimension. You
        currently have ${quantifyInt("paperclip", paperclips)}, but you need
        ${formatInt(paperclips + 10)} paperclips to afford it.`;
    }
  },
  (function() {
    let wasClicked = false;
    const normal = "Click on this news message to hard reset your game.";
    const clicked = "You're crazy. You know what, here. Have a paperclip.";
    return {
      id: "a296",
      get text() {
        return wasClicked ? clicked : normal;
      },
      reset() {
        wasClicked = false;
      },
      onClick() {
        if (wasClicked) return undefined;
        wasClicked = true;
        player.news.specialTickerData.paperclips++;
        return this.text;
      }
    };
  }()),
  {
    id: "a308",
    get text() {
      const nameList = [
        "Antinology",
        "Infinifection",
        "Eternal Light",
        "Galaxia",
        "Duplicanti",
        "Dimensional Explorer",
        "Techyon",
        "Realistic",
        "Celestar",
        "ERCGDM",
        "NRG+",
        "Looty Box",
        "Symbolic",
        "Minisofa",
        "IDEAL",
        "Appange",
        "Goggles",
        "Interval",
        "Newstar",
        "HeavyPellet",
        "Marsa",
        "Zoology",
        "Photoric",
        "Jacfoz",
        "Orism",
        "EDIK",
        "Fision",
        "Gamma",
        "Fractiled",
        "Imnesia",
        "Fermic",
        "The Automizers"
      ];
      const names = [];
      while (names.length < 3) {
        const name = nameList.randomElement();
        if (!names.includes(name)) names[names.length] = name;
      }
      const prices = [
        Math.floor(Math.random() * 11) / 100,
        Math.floor(Math.random() * 11) / 100,
        Math.floor(Math.random() * 11) / 100
      ];
      for (let i = 0; i < 3; i++) {
        const price = prices[i];
        if (price === 0) prices[i] = `<span style="color: blue">0.00 ◄►</span>`;
        else if (Math.random() > 0.5) prices[i] = `<span style="color: green">+${price} ▲</span>`;
        else prices[i] = `<span style="color: red">-${price} ▼</span>`;
      }
      return `${names[0]} ${prices[0]}&nbsp;&nbsp;&nbsp;
        ${names[1]} ${prices[1]}&nbsp;&nbsp;&nbsp;
        ${names[2]} ${prices[2]}&nbsp;&nbsp;&nbsp;`;
    }
  },
  {
    id: "a314",
    get text() {
      const lawID = Math.floor(Math.random * 8901) + 100;
      return `Warning: Law ${lawID}-B, drafted by the AI "duskscarf", alternatively referred to as "the giant
        space rabbit legislation" is now in effect in your galactic area. This list of laws and regulation
        forbids, among other things; the illegal catching of wild space rabbits, the pacification of tamed
        space rabbits, and further scientific research with "planet grazing" unless an exception is given
        directly by duskscarf. You can find the list of exceptions burned into your eyelids now. In addition,
        the genetic modification of giant space rabbits is limited to very specific fields - size alterations
        (increasing in size), and cryptobiosis exaggeration. No other genetic modification is allowed outside
        of military applications. Thank you for your cooperation. Messages repeats in- Warning: Law ${lawID}-`;
    }
  },
  {
    id: "a317",
    get text() {
      return `${format(Number.MAX_VALUE, 2, 0)}? Doesn't look like anything to me.`;
    }
  },
  (function() {
    let wasClicked = false;
    const normal = "Click here to restart your device.";
    const clicked = "Please give Antimatter Dimensions admin access to your device.";
    return {
      id: "a327",
      get text() {
        return wasClicked ? clicked : normal;
      },
      reset() {
        wasClicked = false;
      },
      onClick() {
        if (wasClicked) return undefined;
        wasClicked = true;
        return this.text;
      }
    };
  }()),
  {
    id: "a334",
    text:
      `Introducing the all-new anti-alignment chart! Featuring groundbreaking new combinations such as "lawful-chaotic"
      and "evil-good"! And with a dazzling third axis for 'Jazziness'~ Identify yourself as chaotic-lawful-unjazzy NOW
      for the impossibly low price of $-59.99! Terms and conditions apply. Batteries not included.`,
    isAdvertising: true
  },
  (function() {
    let wasClicked = false;
    const normal = "Read More";
    const clicked = "More";
    return {
      id: "a339",
      get text() {
        return wasClicked ? clicked : normal;
      },
      reset() {
        wasClicked = false;
      },
      onClick() {
        if (wasClicked) return undefined;
        wasClicked = true;
        return this.text;
      }
    };
  }()),
  {
    id: "a343",
    get text() {
      const fakeProgress = Math.pow(player.records.realTimePlayed, 25);
      // Caps in ~68 years of real playtime then turns into "Infinite%"
      return `Global Challenge - across all AD players, accumulate ${format(Number.MAX_VALUE, 2)} contest-paperclips
        (noted by the
        square ends), to receive an event-exclusive metal bagpipe, capable of giving +2 AM/s, as well as an extra
        tickspeed while above ${format(1e200)} tickspeed upgrades! Current global progress -
        ${format(fakeProgress)}/${format(Number.MAX_VALUE, 2)}
        (${formatPercents(Math.log10(fakeProgress) / Math.log10(Number.MAX_VALUE), 3)})`;
    }
  },
  {
    id: "a348",
    text: "<span style='color: red'>[News Message removed by moderator]<span>"
  },
  {
    id: "a349",
    get text() {
      const chapters = [
        `We have come, writers, painters, sculptors, architects, passionate enthusiasts of the hitherto untouched
        beauty of Paris, to protest with all our strength, all our indignation, in the name of the unknown French
        taste, in the name of art and of French history threatened, against the erection, in the heart of our
        capital, of the useless and monstrous Eiffel Tower, which public malignity, often marked by common sense
        and the spirit of justice, has already named of "Tower of Babel". Without falling into the exaltation of
        chauvinism, we have the right to proclaim that Paris is the unrivaled city in the world. Above the streets,
        the widened boulevards, and the magnificent walks, rise the most noble monuments that the human race has
        produced. The soul of France, creator of masterpieces, shines amidst this august flowering of stones. Italy,
        Germany and Flanders, so justifiably proud of their artistic legacy, possess nothing comparable to ours,
        and from all corners of the universe Paris attracts curiosities and admiration.`,
        `Are we going to let all this be profaned? Will the city of Paris go on to associate itself longer with the
        baroques, with the mercantile imaginations of a machine builder, to become irreparably ugly and dishonor
        itself? For the Eiffel Tower, which commercial America itself would not want, is, doubtless, the dishonor
        of Paris. Everyone feels it, everyone says it, everyone deeply grieves it, and we are only a weak echo of
        the universal opinion, so legitimately alarmed.`,
        `Finally, when the foreigners come to visit our Exhibition, they will exclaim, astonished: "What? It is this
        horror that the French have found to give us an idea of their taste so much vaunted? And they will be right
        to make fun of us, because the Paris of the sublime gothics, the Paris of Jean Goujon, Germain Pilon, Puget,
        Rude, Barye, etc., will have become the Paris of M. Eiffel.`,
        `It suffices, moreover, to realize what we are doing, to imagine for a moment a vertiginously ridiculous
        tower dominating Paris, as well as a gigantic factory chimney, crushing with its barbarian mass. Our Lady,
        the Sainte-Chapelle, the dome of the Invalides, the Arc de Triomphe, all our humiliated monuments, all our
        shrunken architectures, which will disappear in this astonishing dream. And for twenty years, we will see
        how to stretch out over the entire city, still quivering with the genius of so many centuries, we will see
        the odious shadow of the odious column of bolted sheet metal stretch like an ink stain ...`,
        `It's up to you, Monsieur and dear compatriot, to you who love Paris so much, who have embellished it so
        much, who have so often protected it against the administrative devastation and the vandalism of industrial
        enterprises, that it is the honor to defend it once more. We leave it to you to plead the cause of Paris,
        knowing that you will deploy all the energy, all the eloquence that must inspire an artist such as you love
        what is beautiful, what is great, what is right ... And if our cry of alarm is not heard, if our reasons are
        not listened to, if Paris is stubborn in the idea of dishonoring Paris, we will have, at least, you and us,
        hear a protest that honors.`
      ];
      const chapter = chapters[player.news.specialTickerData.eiffelTowerChapter];
      player.news.specialTickerData.eiffelTowerChapter = (player.news.specialTickerData.eiffelTowerChapter + 1) % 5;
      return chapter;
    }
  },
  {
    id: "a352",
    get text() {
      return `<span style='opacity: 0; animation: a-disappear ${newsAnimSpd(20)}s 1'>
      This news message is antimemetic. You will forget that it exists shortly.</span>`;
    }
  },
  (function() {
    let wasClicked = false;
    const normal = "<span style='cursor: pointer'>💣</span>";
    const clicked = "💥";
    return {
      id: "a353",
      get text() {
        return wasClicked ? clicked : normal;
      },
      reset() {
        wasClicked = false;
      },
      onClick() {
        if (wasClicked) return undefined;
        wasClicked = true;
        return this.text;
      }
    };
  }()),
  {
    // Blob from the blob font
    id: "a354",
    text:
      `<span style='color: #FBC21B; text-shadow: 0px 1px 0px black, 1px 0px 0px black, 1px 1px 0px black,
      0px -1px 0px black, -1px 0px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'>
      \uE010</span>`
  },
  {
    id: "a364",
    get text() {
      const products = [
        `Illustration 320-A - True Office Graphics Wall. One of our senior consultants will observe your business,
        and come up with a list of words to be added to a hallway, to remind all employees of the values of their
        company. Known to decrease employee motivation by at least 25%! Past walls include words such as Black
        Hole, Catastrophic, Haphazard, compromising, Inferior, Delusional, Inefficient and Collapsed! Order now!`,
        `Furniture 150-A (2034 edition) - 3-person seating device. A revolutionary new design for office waiting
        areas, it consists of a large 3 legged stool, placed upside down for aesthetic benefits. Perfect for
        getting employees back to work, in a new set of shoes, or pants. It isn't tied down or glued to the
        floor like other editions, but we do make sure that other employees look at you funny if you edit our
        art. No need to order, it comes as a complimentary service for any customer!`,
        `Furniture 0853 - "The Rack" - this revolutionary new workspace, from the inventors of the crawling
        desk, helps your employees overcome their limits and ensure that your whole business is screaming -
        in agony! At times chosen by our revolutionary "pAIn AI", it will suggest mandatory stretchers for all
        users. Recommended by your local gaol, order now! *Warning, AOS&C only takes responsibility for acts
        of god such as lightning or merciful purifications by deities.`
      ];
      const product = products.randomElement();
      return `Antimatter Office Supplies and Co present their new "Modern Office" catalogue! Each template
        design can be customised for your business, and offers a unique way to promote business synergy! Here
        is a sneak preview of one of their newest items: ${product}`;
    },
  },
  {
    id: "a379",
    get text() {
      return `THE ${format(Number.MAX_VALUE, 2)} PIECE! THE ${format(Number.MAX_VALUE, 2)} PIECE IS REAL!`;
    }
  },
  {
    id: "l19",
    text:
      `I'll have 1e29 number 9s, a number 1e9 large, a number 6 with extra replicanti, a number 1e7, two 4e5s,
      one with matter, and a large time vortex.`,
    get unlocked() {
      return DimBoost.totalBoosts >= 5 ||
      player.galaxies > 0 ||
      PlayerProgress.infinityUnlocked();
    }
  },
  {
    id: "l40",
    text:
      `I broke the 8th wall, there is only chaos, Slabdrill is ritually sacrificing antimatter to the 9th
      dimension. This will be my last entry, may Hevipelle have mercy on our souls, we didn't listen,
      We should have listened.`,
    get unlocked() { return NewsHandler.hasSeenNews("l58"); }
  },
  {
    id: "l53",
    text: "If you want to farm infinities, why don't you just get the time study?",
    get unlocked() { return !TimeStudy(32).isBought && Currency.infinities.gt(72000 * 168); }
  },
  {
    id: "l54",
    get text() {
      const names = [];
      if (PlayerProgress.infinityUnlocked()) names.push("Infinity");
      if (PlayerProgress.eternityUnlocked()) names.push("Eternity");
      if (PlayerProgress.dilationUnlocked()) names.push("Dilation");
      if (PlayerProgress.realityUnlocked()) names.push("Reality");

      const game1Name = names.randomElement();
      let game2Name = names.randomElement();
      while (game2Name === game1Name) {
        game2Name = names.randomElement();
      }
      return `Pokemon ${game1Name} and ${game2Name} were just released! This new generation brings the total number ` +
        "of Pokemon up to 1e151. Good luck catching 'em all!";
    },
    get unlocked() { return PlayerProgress.eternityUnlocked(); },
    isAdvertising: true
  },
  {
    id: "l55",
    get text() {
      const recipes = [
        "a Replicanti cake: Gather some Replicanti, place in oven, and watch rise. And rise. And rise.",
        "an antimatter cake: Gather some antimatter, place in oven, and <b>BOOM<b>.",
        "an Eternity cake: Gather some Eternity Points, place in oven, and wait...",
        "an Infinity cake: Gather some Infinity Points, place in oven, and watch them shatter spacetime."
      ];
      const recipe = recipes.randomElement();
      return `How to bake ${recipe}`;
    },
    get unlocked() { return PlayerProgress.eternityUnlocked(); }
  },
  {
    id: "l68",
    get text() {
      let protestText = "";
      if (InfinityChallenge(4).isRunning)
        protestText =
          `Let's take it to this guy, who's part of the side that believes it's Infinity Challenge 4. What do you have
          to say? "Obviously Infinity Challenge 4 is the worst one, I mean, what am I even supposed to do? I keep
          trying but every time I keep getting stuck and nowhere close to the end! How are you even supposed to do it?"
          What a passionate man. This is your local news host, and we'll come back with further information later.`;
      else if (InfinityChallenge(5).isRunning)
        protestText =
          `So up next let's talk to this guy is holding a sign that says "IC5 Unfair". What is the point your group
          is trying to make? "Can't you read the sign? If your comprehension is that bad then Infinity Challenge 5
          will squash you without even giving you a fair chan-" How... Interesting. This is your local news host,
          and we'll come back with further information later.`;
      else
        protestText =
          `Finally, let's chat with this woman who doesn't seem to be in either side. What's your opinion on the
          matter? "Personally, I thought Tickspeed Autobuyer Challenge was worse than both-" "GET HER!!" "WAIT NO-"
          Well, seems like this just took a turn, so I'm getting as far away as I possibly can. This is your local
          news host, and we'll come back with further information... someday.`;
      return `Hello, this is your local always reliable news source, and today people are taking over the streets
        as they fight over which Infinity Challenge is worse. ${protestText}`;
    },
    get unlocked() { return InfinityChallenge(1).isUnlocked || PlayerProgress.eternityUnlocked(); }
  },
  {
    id: "r1",
    text: "This news message is 100x rarer than all the others.",
    get unlocked() { return Math.random() < 0.01; }
  },
  {
    id: "p1",
    text: "Is this a jojo reference?",
  }
  */