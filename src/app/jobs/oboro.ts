import { ClassName } from './_class-name';
import { ActiveSkillModel, AtkSkillFormulaInput, AtkSkillModel, PassiveSkillModel } from './_character-base.abstract';
import { Ninja } from './Ninja';
import { ShadowWarrior } from '../constants/share-active-skills/shadow-warrior';
import { ElementType } from '../constants/element-type.const';
import { AdditionalBonusInput, InfoForClass } from '../models/info-for-class.model';
import { floor } from '../utils';
import { DistortedCrescent, S16thNight } from '../constants/share-active-skills';
import { IllusionShockFn, PureSoulFn, RighthandMasteryFn, S16thNightFn } from '../constants/share-passive-skills';

const jobBonusTable: Record<number, [number, number, number, number, number, number]> = {
  1: [0, 0, 0, 0, 1, 0],
  2: [0, 0, 0, 0, 1, 0],
  3: [0, 0, 0, 1, 1, 0],
  4: [0, 0, 0, 1, 1, 0],
  5: [0, 1, 0, 1, 1, 0],
  6: [0, 1, 1, 1, 1, 0],
  7: [0, 1, 1, 1, 1, 0],
  8: [1, 1, 1, 1, 1, 0],
  9: [1, 1, 1, 1, 1, 1],
  10: [1, 1, 1, 1, 1, 1],
  11: [1, 1, 1, 1, 2, 1],
  12: [2, 1, 1, 1, 2, 1],
  13: [2, 2, 1, 1, 2, 1],
  14: [2, 2, 1, 1, 2, 1],
  15: [2, 2, 1, 2, 2, 1],
  16: [2, 2, 1, 2, 2, 2],
  17: [2, 2, 2, 2, 2, 2],
  18: [2, 2, 2, 2, 2, 2],
  19: [3, 2, 2, 2, 2, 2],
  20: [3, 2, 2, 2, 3, 2],
  21: [3, 3, 2, 2, 3, 2],
  22: [3, 3, 2, 2, 3, 2],
  23: [3, 3, 2, 2, 3, 3],
  24: [3, 3, 3, 2, 3, 3],
  25: [3, 3, 3, 3, 3, 3],
  26: [3, 3, 3, 3, 3, 3],
  27: [3, 3, 3, 3, 4, 3],
  28: [3, 3, 3, 3, 4, 3],
  29: [3, 4, 3, 3, 4, 3],
  30: [3, 4, 3, 3, 4, 3],
  31: [4, 4, 3, 3, 4, 3],
  32: [4, 4, 3, 4, 4, 3],
  33: [4, 4, 3, 4, 4, 3],
  34: [4, 4, 3, 4, 5, 3],
  35: [4, 4, 3, 5, 5, 3],
  36: [4, 4, 3, 5, 5, 3],
  37: [4, 4, 4, 5, 5, 3],
  38: [4, 4, 4, 5, 6, 3],
  39: [5, 4, 4, 5, 6, 3],
  40: [5, 4, 4, 5, 6, 3],
  41: [5, 5, 4, 5, 6, 3],
  42: [5, 5, 4, 6, 6, 3],
  43: [6, 5, 4, 6, 6, 3],
  44: [6, 5, 4, 6, 6, 3],
  45: [6, 5, 4, 6, 7, 3],
  46: [6, 5, 4, 6, 7, 4],
  47: [6, 6, 4, 6, 7, 4],
  48: [7, 6, 4, 6, 7, 4],
  49: [7, 6, 4, 6, 7, 4],
  50: [7, 6, 4, 6, 8, 4],
  51: [7, 6, 4, 6, 8, 4],
  52: [7, 6, 4, 6, 8, 4],
  53: [7, 6, 4, 6, 8, 4],
  54: [7, 6, 4, 6, 8, 4],
  55: [7, 6, 4, 6, 8, 4],
  56: [7, 6, 4, 6, 8, 4],
  57: [7, 6, 4, 6, 8, 4],
  58: [7, 6, 4, 6, 8, 4],
  59: [7, 6, 4, 6, 8, 4],
  60: [7, 6, 4, 6, 8, 4],
  61: [7, 6, 4, 6, 8, 4],
  62: [7, 6, 4, 6, 8, 4],
  63: [7, 6, 4, 6, 8, 4],
  64: [7, 6, 4, 6, 8, 4],
  65: [7, 6, 4, 6, 8, 4],
  66: [7, 6, 4, 6, 8, 4],
  67: [7, 6, 4, 6, 8, 4],
  68: [7, 6, 4, 6, 8, 4],
  69: [7, 6, 4, 6, 8, 4],
  70: [7, 10, 6, 6, 8, 6],
};

export class Oboro extends Ninja {
  protected override CLASS_NAME = ClassName.Oboro;
  protected override JobBonusTable = jobBonusTable;
  protected override initialStatusPoint = 48;

  private readonly classNames2nd = [ClassName.Oboro];

  private readonly atkSkillList2nd: AtkSkillModel[] = [
    {
      label: 'Flaming Petals Lv10',
      name: 'Flaming Petals',
      value: 'Flaming Petals==10',
      acd: 0,
      fct: 1.4,
      vct: 5.6,
      cd: 0,
      element: ElementType.Fire,
      isMatk: true,
      totalHit: 10,
      formula: (): number => {
        return 90;
      },
    },
    {
      label: 'Freezing Spear Lv10',
      name: 'Freezing Spear',
      value: 'Freezing Spear==10',
      acd: 0,
      fct: 1.4,
      vct: 5.6,
      cd: 0,
      element: ElementType.Water,
      isMatk: true,
      totalHit: 12,
      formula: (): number => {
        return 70;
      },
    },
    {
      label: 'Freezing Spear Lv10 (in Watery Evasion)',
      name: 'Freezing Spear',
      value: 'Freezing Spear Water==10',
      acd: 0,
      fct: 1.4,
      vct: 5.6,
      cd: 0,
      element: ElementType.Water,
      isMatk: true,
      totalHit: 12,
      formula: (input: AtkSkillFormulaInput): number => {
        const { skillLevel } = input;

        return 70 + skillLevel * 2;
      },
    },
    {
      label: 'Wind Blade Lv10',
      name: 'Wind Blade',
      value: 'Wind Blade==10',
      acd: 0,
      fct: 1.1,
      vct: 4.4,
      cd: 0,
      element: ElementType.Wind,
      isMatk: true,
      totalHit: 6,
      formula: (): number => {
        return 150;
      },
    },
    {
      label: 'Exploding Dragon Lv5',
      name: 'Exploding Dragon',
      value: 'Exploding Dragon==5',
      acd: 0.5,
      fct: 0.8,
      vct: 2,
      cd: 0.3,
      element: ElementType.Fire,
      isMatk: true,
      hit: 3,
      formula: (input: AtkSkillFormulaInput): number => {
        const { skillLevel } = input;

        return 150 + skillLevel * 150;
      },
    },
    {
      label: 'Snow Flake Draft Lv5',
      name: 'Snow Flake Draft',
      value: 'Snow Flake Draft==5',
      acd: 0.5,
      fct: 0.8,
      vct: 2.5,
      cd: 0.3,
      element: ElementType.Water,
      isMatk: true,
      hit: 5,
      formula: (input: AtkSkillFormulaInput): number => {
        const { skillLevel } = input;

        return 150 + skillLevel * 150;
      },
    },
    {
      label: 'First Wind Lv5',
      name: 'First Wind',
      value: 'First Wind==5',
      acd: 0,
      fct: 0.3,
      vct: 1.2,
      cd: 0,
      element: ElementType.Wind,
      isMatk: true,
      hit: 5,
      formula: (input: AtkSkillFormulaInput): number => {
        const { skillLevel } = input;

        return 100 + skillLevel * 100;
      },
    },
    {
      label: 'Cross Slash Lv10',
      name: 'Cross Slash',
      value: 'Cross Slash==10',
      acd: 0,
      fct: 0,
      vct: 0,
      cd: 3.1,
      hit: 2,
      formula: (input: AtkSkillFormulaInput): number => {
        const { model, skillLevel } = input;
        const baseLevel = model.level;
        const bonus = this.isSkillActive('Cross Wound') ? baseLevel * skillLevel : 0;

        return skillLevel * 200 * (baseLevel / 100) + bonus;
      },
    },
  ];

  private readonly activeSkillList2nd: ActiveSkillModel[] = [
    ShadowWarrior,
    S16thNight,
    DistortedCrescent,
    {
      label: '[Debuf] Cross Wound',
      name: 'Cross Wound',
      inputType: 'selectButton',
      dropdown: [
        { label: 'Yes', value: 1, isUse: true },
        { label: 'No', value: 0, isUse: false },
      ],
    },
  ];

  private readonly passiveSkillList2nd: PassiveSkillModel[] = [
    {
      label: 'Flaming Petals',
      name: 'Flaming Petals',
      inputType: 'dropdown',
      dropdown: [
        { label: '-', value: 0, isUse: false },
        { label: 'Lv 1', value: 1, isUse: true },
        { label: 'Lv 2', value: 2, isUse: true },
        { label: 'Lv 3', value: 3, isUse: true },
        { label: 'Lv 4', value: 4, isUse: true },
        { label: 'Lv 5', value: 5, isUse: true },
        { label: 'Lv 6', value: 6, isUse: true },
        { label: 'Lv 7', value: 7, isUse: true },
        { label: 'Lv 8', value: 8, isUse: true },
        { label: 'Lv 9', value: 9, isUse: true },
        { label: 'Lv 10', value: 10, isUse: true },
      ],
    },
    {
      label: 'Freezing Spear',
      name: 'Freezing Spear',
      inputType: 'dropdown',
      dropdown: [
        { label: '-', value: 0, isUse: false },
        { label: 'Lv 1', value: 1, isUse: true },
        { label: 'Lv 2', value: 2, isUse: true },
        { label: 'Lv 3', value: 3, isUse: true },
        { label: 'Lv 4', value: 4, isUse: true },
        { label: 'Lv 5', value: 5, isUse: true },
        { label: 'Lv 6', value: 6, isUse: true },
        { label: 'Lv 7', value: 7, isUse: true },
        { label: 'Lv 8', value: 8, isUse: true },
        { label: 'Lv 9', value: 9, isUse: true },
        { label: 'Lv 10', value: 10, isUse: true },
      ],
    },
    {
      label: 'Wind Blade',
      name: 'Wind Blade',
      inputType: 'dropdown',
      dropdown: [
        { label: '-', value: 0, isUse: false },
        { label: 'Lv 1', value: 1, isUse: true },
        { label: 'Lv 2', value: 2, isUse: true },
        { label: 'Lv 3', value: 3, isUse: true },
        { label: 'Lv 4', value: 4, isUse: true },
        { label: 'Lv 5', value: 5, isUse: true },
        { label: 'Lv 6', value: 6, isUse: true },
        { label: 'Lv 7', value: 7, isUse: true },
        { label: 'Lv 8', value: 8, isUse: true },
        { label: 'Lv 9', value: 9, isUse: true },
        { label: 'Lv 10', value: 10, isUse: true },
      ],
    },
    {
      label: 'Illusion - Bewitch',
      name: 'Illusion - Bewitch',
      inputType: 'dropdown',
      dropdown: [
        { label: '-', value: 0, isUse: false },
        { label: 'Lv 1', value: 1, skillLv: 1, isUse: true },
        { label: 'Lv 2', value: 2, skillLv: 2, isUse: true },
        { label: 'Lv 3', value: 3, skillLv: 3, isUse: true },
        { label: 'Lv 4', value: 4, skillLv: 4, isUse: true },
        { label: 'Lv 5', value: 5, skillLv: 5, isUse: true },
      ],
    },
    {
      label: 'Illusion - Death',
      name: 'Illusion - Death',
      inputType: 'dropdown',
      dropdown: [
        { label: '-', value: 0, isUse: false },
        { label: 'Lv 1', value: 1, skillLv: 1, isUse: true },
        { label: 'Lv 2', value: 2, skillLv: 2, isUse: true },
        { label: 'Lv 3', value: 3, skillLv: 3, isUse: true },
        { label: 'Lv 4', value: 4, skillLv: 4, isUse: true },
        { label: 'Lv 5', value: 5, skillLv: 5, isUse: true },
      ],
    },
    IllusionShockFn(),
    {
      label: 'Moonlight Fantasy',
      name: 'Moonlight Fantasy',
      inputType: 'dropdown',
      dropdown: [
        { label: '-', value: 0, isUse: false },
        { label: 'Lv 1', value: 1, skillLv: 1, isUse: true },
        { label: 'Lv 2', value: 2, skillLv: 2, isUse: true },
        { label: 'Lv 3', value: 3, skillLv: 3, isUse: true },
        { label: 'Lv 4', value: 4, skillLv: 4, isUse: true },
        { label: 'Lv 5', value: 5, skillLv: 5, isUse: true },
      ],
    },
    RighthandMasteryFn(),
    PureSoulFn(),
    S16thNightFn(),
  ];

  constructor() {
    super();

    this.inheritSkills({
      activeSkillList: this.activeSkillList2nd,
      atkSkillList: this.atkSkillList2nd,
      passiveSkillList: this.passiveSkillList2nd,
      classNames: this.classNames2nd,
    });
  }

  override getMasteryAtk(info: InfoForClass): number {
    return this.calcHiddenMasteryAtk(info).totalAtk;
  }

  override getMasteryMatk(info: InfoForClass): number {
    const _16Night = this.activeSkillLv('16th Night');
    if (_16Night <= 0) return 0;

    const { model } = info;

    return floor((model.jobLevel * _16Night) / 2);
  }

  override setAdditionalBonus(params: AdditionalBonusInput) {
    const { totalBonus, model } = params;
    if (this.isSkillActive('Distorted Crescent')) {
      const bonus = floor(model.level / 3) + 100;
      totalBonus.atk += bonus;
      totalBonus.matk += bonus;
    }

    return totalBonus;
  }
}
