import { ClassName } from './_class-name';
import { ActiveSkillModel, AtkSkillModel, PassiveSkillModel } from './_character-base.abstract';
import { JOB_4_MAX_JOB_LEVEL, JOB_4_MIN_MAX_LEVEL } from '../app-config';
import { SuperNovice } from './SuperNovice';

const jobBonusTable: Record<number, [number, number, number, number, number, number]> = {
  1: [1, 1, 0, 0, 0, 0],
  2: [1, 1, 0, 1, 1, 0],
  3: [1, 1, 1, 1, 1, 0],
  4: [1, 1, 1, 1, 1, 1],
  5: [2, 2, 1, 1, 1, 1],
  6: [2, 2, 1, 2, 2, 1],
  7: [2, 2, 2, 2, 2, 1],
  8: [2, 2, 2, 2, 2, 2],
  9: [2, 2, 2, 2, 3, 2],
  10: [2, 3, 2, 2, 3, 2],
  11: [2, 3, 2, 2, 3, 2],
  12: [2, 3, 3, 2, 3, 2],
  13: [2, 3, 3, 3, 3, 3],
  14: [2, 3, 3, 4, 3, 3],
  15: [3, 3, 3, 4, 3, 3],
  16: [3, 3, 3, 4, 3, 3],
  17: [4, 3, 4, 4, 3, 3],
  18: [5, 3, 4, 4, 3, 3],
  19: [5, 3, 4, 5, 3, 3],
  20: [6, 3, 4, 5, 3, 3],
  21: [6, 3, 4, 5, 3, 3],
  22: [6, 3, 4, 6, 3, 3],
  23: [6, 3, 4, 7, 3, 3],
  24: [6, 3, 4, 7, 3, 3],
  25: [7, 3, 4, 7, 3, 3],
  26: [7, 4, 4, 7, 3, 3],
  27: [7, 4, 4, 7, 3, 3],
  28: [7, 4, 4, 7, 4, 3],
  29: [7, 4, 5, 7, 4, 3],
  30: [7, 4, 5, 7, 4, 3],
  31: [7, 4, 6, 7, 4, 3],
  32: [7, 4, 6, 7, 4, 3],
  33: [7, 4, 6, 7, 4, 3],
  34: [7, 4, 6, 7, 4, 3],
  35: [8, 4, 6, 8, 4, 3],
  36: [8, 4, 6, 8, 4, 3],
  37: [8, 4, 6, 8, 4, 4],
  38: [8, 4, 6, 8, 4, 4],
  39: [8, 4, 6, 8, 4, 4],
  40: [8, 4, 6, 8, 4, 4],
  41: [9, 4, 6, 8, 4, 4],
  42: [9, 4, 6, 9, 4, 4],
  43: [9, 4, 6, 9, 4, 4],
  44: [9, 4, 6, 9, 4, 5],
  45: [9, 4, 6, 9, 4, 5],
  46: [9, 4, 6, 9, 4, 6],
  47: [9, 4, 6, 9, 4, 6],
  48: [10, 4, 6, 10, 4, 6],
  49: [10, 4, 6, 10, 4, 6],
  50: [10, 5, 6, 10, 5, 6],
  51: [10, 5, 6, 10, 5, 6],
  52: [10, 5, 6, 10, 5, 6],
  53: [10, 5, 6, 10, 5, 6],
  54: [10, 5, 6, 10, 5, 6],
  55: [10, 5, 6, 10, 5, 6],
  56: [10, 5, 6, 10, 6, 6],
  57: [10, 5, 6, 10, 6, 6],
  58: [10, 5, 6, 10, 6, 6],
  59: [10, 5, 6, 10, 6, 6],
  60: [10, 5, 6, 10, 6, 6],
  61: [10, 5, 6, 10, 6, 6],
  62: [10, 5, 6, 10, 6, 6],
  63: [10, 5, 6, 10, 6, 6],
  64: [10, 5, 6, 10, 6, 6],
  65: [10, 5, 6, 10, 6, 6],
  66: [10, 5, 6, 10, 6, 6],
  67: [10, 5, 6, 10, 6, 6],
  68: [10, 5, 6, 10, 6, 6],
  69: [10, 5, 6, 10, 6, 6],
  70: [10, 5, 6, 10, 6, 6],
};

const traitBonusTable: Record<number, [number, number, number, number, number, number]> = {
  1: [0, 1, 0, 0, 0, 0],
  2: [0, 1, 0, 0, 0, 0],
  3: [0, 1, 0, 0, 0, 0],
  4: [0, 1, 0, 0, 0, 0],
  5: [1, 2, 0, 0, 0, 0],
  6: [1, 2, 0, 1, 0, 0],
  7: [1, 2, 0, 1, 0, 0],
  8: [1, 2, 0, 1, 1, 0],
  9: [1, 2, 0, 1, 1, 0],
  10: [1, 2, 0, 1, 1, 0],
  11: [1, 2, 0, 1, 1, 0],
  12: [1, 2, 0, 1, 1, 0],
  13: [1, 2, 1, 1, 1, 0],
  14: [1, 2, 1, 1, 1, 0],
  15: [1, 3, 1, 1, 1, 0],
  16: [1, 3, 1, 1, 1, 1],
  17: [1, 4, 1, 1, 2, 1],
  18: [1, 5, 1, 1, 2, 1],
  19: [1, 5, 1, 2, 2, 1],
  20: [2, 6, 1, 2, 2, 1],
  21: [2, 6, 1, 2, 2, 2],
  22: [2, 6, 1, 3, 2, 2],
  23: [2, 6, 1, 3, 2, 2],
  24: [3, 6, 1, 3, 2, 2],
  25: [3, 7, 1, 3, 2, 2],
  26: [3, 7, 1, 3, 2, 2],
  27: [3, 7, 1, 3, 3, 2],
  28: [3, 7, 1, 3, 3, 2],
  29: [3, 7, 1, 3, 3, 2],
  30: [4, 7, 1, 4, 3, 2],
  31: [4, 7, 1, 4, 3, 2],
  32: [4, 7, 2, 4, 3, 2],
  33: [5, 7, 2, 5, 3, 2],
  34: [5, 7, 2, 5, 3, 2],
  35: [5, 8, 2, 5, 3, 2],
  36: [5, 8, 2, 5, 4, 2],
  37: [5, 8, 2, 5, 4, 2],
  38: [5, 8, 2, 5, 4, 3],
  39: [5, 8, 3, 6, 4, 3],
  40: [6, 8, 3, 6, 5, 3],
  41: [6, 9, 3, 6, 5, 3],
  42: [6, 9, 3, 6, 5, 3],
  43: [7, 9, 3, 6, 5, 3],
  44: [7, 9, 3, 6, 5, 3],
  45: [7, 9, 4, 7, 5, 3],
  46: [7, 9, 4, 7, 5, 3],
  47: [7, 9, 4, 7, 6, 3],
  48: [7, 10, 4, 7, 6, 3],
  49: [8, 10, 4, 8, 6, 3],
  50: [8, 10, 4, 8, 6, 3],
  51: [8, 10, 4, 8, 7, 3],
  52: [9, 10, 4, 8, 8, 3],
  53: [9, 11, 4, 8, 8, 3],
  54: [9, 11, 4, 8, 8, 3],
  55: [9, 11, 4, 9, 8, 3],
  56: [9, 11, 4, 9, 8, 3],
  57: [10, 11, 4, 9, 8, 3],
  58: [10, 11, 4, 9, 8, 3],
  59: [10, 11, 4, 10, 8, 3],
  60: [10, 11, 4, 10, 8, 3],
  61: [10, 11, 4, 10, 8, 3],
  62: [10, 11, 4, 10, 8, 3],
  63: [10, 11, 4, 10, 8, 3],
  64: [10, 11, 4, 10, 8, 3],
  65: [10, 11, 4, 10, 8, 3],
  66: [10, 11, 4, 10, 8, 3],
  67: [10, 11, 4, 10, 8, 3],
  68: [10, 11, 4, 10, 8, 3],
  69: [10, 11, 4, 10, 8, 3],
  70: [10, 11, 4, 10, 8, 3],
};

export class HyperNovice extends SuperNovice {
  protected override CLASS_NAME = ClassName.HyperNovice;
  protected override JobBonusTable = jobBonusTable;
  protected override TraitBonusTable = traitBonusTable;

  protected override minMaxLevel = JOB_4_MIN_MAX_LEVEL;
  protected override maxJob = JOB_4_MAX_JOB_LEVEL;

  private readonly classNames4th = [ClassName.Only_4th, ClassName.HyperNovice];
  private readonly atkSkillList4th: AtkSkillModel[] = [];
  private readonly activeSkillList4th: ActiveSkillModel[] = [];
  private readonly passiveSkillList4th: PassiveSkillModel[] = [];

  constructor() {
    super();

    this.inheritSkills({
      activeSkillList: this.activeSkillList4th,
      atkSkillList: this.atkSkillList4th,
      passiveSkillList: this.passiveSkillList4th,
      classNames: this.classNames4th,
    });
  }
}
