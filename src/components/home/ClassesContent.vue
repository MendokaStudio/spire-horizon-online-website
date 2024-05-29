<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";
import ClassCard from "./ClassCard.vue";

const utilityStore = useUtilityStore();

onMounted(() => {
  utilityStore.ContentReveal();
});
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center lg:pt-[5%] md:pt-[10%] sm:pt-[8%] bg-black bg-opacity-80"
  >
    <div
      class="relative w-11/12 h-3/6 lg:w-11/12 lg:h-4/6 2xl:w-8/12 2xl:h-3/4 bg-[url('../image/elements/modal_empty_background.png')] bg-[length:100%_100%]"
    >
      <!-- Content -->
      <div class="flex justify-center items-center w-full h-full">
        <div class="w-full h-full px-1 sm:px-10 pt-[9px] pb-[3px]">
          <div
            class="no-scrollbar grid lg:grid-cols-3 md:grid-cols-1 gap-4 h-full overflow-auto"
          >
            <ClassCard
              :cardIndex="0"
              className="Fighter"
              attackSpeed="80%"
              attackRange="50%"
              classImage="Fighter_Profile"
              description="A versatile melee combatant, excelling in close-quarters combat with a mix of strength and agility."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="1"
              className="Boxer"
              attackSpeed="20%"
              attackRange="25%"
              classImage="Boxer_Profile"
              description="A master of hand-to-hand combat, delivering powerful punches and rapid strikes to overwhelm enemies."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="2"
              className="Muay Thai"
              attackSpeed="40%"
              attackRange="25%"
              classImage="MuayThai_Profile"
              description="A skilled martial artist using knees, elbows, and shins to execute devastating combos in close combat."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="3"
              className="Monk"
              attackSpeed="60%"
              attackRange="100%"
              classImage="Monk_Profile"
              description="A disciplined warrior harnessing inner strength and spiritual energy to deliver powerful, precise attacks."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="4"
              className="Priest"
              attackSpeed="60%"
              attackRange="100%"
              classImage="Priest_Profile"
              description="A holy healer and protector, using divine magic to mend wounds and shield allies from harm."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="5"
              className="Sorcerer"
              attackSpeed="60%"
              attackRange="100%"
              classImage="Sorcerer_Profile"
              description="A master of arcane arts, wielding powerful spells to control the battlefield and unleash elemental fury."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="6"
              className="Assassin"
              attackSpeed="100%"
              attackRange="50%"
              classImage="Assassin_Profile"
              description="A stealthy and agile killer, specializing in swift, lethal strikes from the shadows."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="7"
              className="Musketeers"
              attackSpeed="80%"
              attackRange="100%"
              classImage="Musketeers_Profile"
              description="A sharpshooter with a keen eye, expertly using firearms to take down enemies from a distance."
              class="scale-90"
            />

            <ClassCard
              :cardIndex="8"
              className="Gunslinger"
              attackSpeed="100%"
              attackRange="100%"
              classImage="Gunslinger_Profile"
              description="A dual-wielding marksman, combining speed and precision to unleash a hail of bullets on foes."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="9"
              className="Lancer"
              attackSpeed="60%"
              attackRange="50%"
              classImage="Lancer_Profile"
              description="A formidable spearman, utilizing reach and mobility to outmaneuver and impale enemies."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="10"
              className="Sentinel"
              attackSpeed="60%"
              attackRange="25%"
              classImage="Sentinel_Profile"
              description="A stalwart defender, equipped with heavy armor and shields to absorb and deflect attacks."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="11"
              className="Magical Knight"
              attackSpeed="80%"
              attackRange="25%"
              classImage="Magical-Knight_Profile"
              description="A warrior blending swordsmanship and magic, striking a balance between offense and defense."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="12"
              className="Blade Master"
              attackSpeed="100%"
              attackRange="25%"
              classImage="Blade-Master_Profile"
              description="A swift and deadly swordsman, capable of executing rapid, precise slashes to cut down opponents."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="13"
              className="Sword Master"
              attackSpeed="40%"
              attackRange="25%"
              classImage="Sword-Master_Profile"
              description="An elite swordfighter, mastering various stances and techniques to dominate in melee combat."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="14"
              className="Duelist"
              attackSpeed="80%"
              attackRange="25%"
              classImage="Duelist_Profile"
              description="A nimble and cunning fighter, excelling in one-on-one combat with quick, decisive strikes."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="15"
              className="Swordslinger"
              attackSpeed="60%"
              attackRange="50%"
              classImage="Swordslinger_Profile"
              description="A unique warrior combining swordplay with ranged attacks, switching seamlessly between melee and distance."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="16"
              className="Warrior"
              attackSpeed="60%"
              attackRange="25%"
              classImage="Warrior_Profile"
              description="A battle-hardened fighter, relying on brute strength and resilience to crush foes in close combat."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="17"
              className="Berserker"
              attackSpeed="80%"
              attackRange="25%"
              classImage="Berserker_Profile"
              description="A ferocious combatant, unleashing uncontrollable rage to deal massive damage at the cost of defense."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="18"
              className="Necromancer"
              attackSpeed="60%"
              attackRange="100%"
              classImage="Necromancer_Profile"
              description="A dark mage who commands the undead, summoning minions and casting sinister spells to dominate the battlefield."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="19"
              className="Elementalist"
              attackSpeed="60%"
              attackRange="100%"
              classImage="Elementalist_Profile"
              description="A mage who harnesses the power of the elements, casting destructive spells to wreak havoc on enemies."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="20"
              className="Ranger"
              attackSpeed="100%"
              attackRange="100%"
              classImage="Ranger_Profile"
              description="A skilled archer and tracker, adept at striking from afar and navigating the wilderness."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="21"
              className="Guardian"
              attackSpeed="20%"
              attackRange="25%"
              classImage="Guardian_Profile"
              description="A protective warrior, using strong defensive abilities to safeguard allies and withstand enemy assaults."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="22"
              className="Paladin"
              attackSpeed="20%"
              attackRange="25%"
              classImage="Paladin_Profile"
              description="A holy knight with a strong sense of justice, using both martial prowess and divine magic to fight evil."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="23"
              className="Knight"
              attackSpeed="60%"
              attackRange="50%"
              classImage="Knight_Profile"
              description="A noble and chivalrous warrior, excelling in mounted combat and heavy armor."
              class="scale-90"
            />
            <ClassCard
              :cardIndex="23"
              className="Vanguard"
              attackSpeed="100%"
              attackRange="25%"
              classImage="Vanguard_Profile"
              description="A frontline leader, inspiring allies and charging into battle with unwavering courage and strength."
              class="scale-90"
            />
          </div>
        </div>
      </div>
      <div class="absolute top-[5px] left-0 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
      <div class="absolute top-[-4px] right-[8px] transform rotate-90 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
      <div class="absolute bottom-0 -right-0.5 transform rotate-180 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
      <div class="absolute -bottom-[8px] left-[10px] transform -rotate-90 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
    </div>
  </div>
</template>
