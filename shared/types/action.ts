import { BuffableStat } from './character';
import { DefenseType } from './defense';

export const ACTION_TYPES = [
  'attack_melee',
  'attack_spell',
  'buff',
  'debuff',
  'heal',
] as const;

export const ATTACK_RESULTS = ['MISS', 'GRAZE', 'HIT', 'CRITICAL'] as const;

export interface ActionProps {
  actionText: <T>(source: T, target: T) => string;
  areaOfEffect?: number;
  cooldown: number;
  cost: number;
  description: string;
  executionTime: number;
  icon: string;
  id: number;
  name: string;
  range: number;
  type: ActionType;
}

export type ActionResult = {
  message: string;
  success: boolean;
};

export type ActionType = (typeof ACTION_TYPES)[number];

export type AttackProps = {
  areaOfEffect?: number;
  baseDamage: number;
  defenseStat?: DefenseType;
};

export type AttackResult = (typeof ATTACK_RESULTS)[number];

export type BuffProps = {
  buffAmount: number;
  buffStat: BuffableStat;
  duration: number;
};

export type HealProps = {
  healAmount: number;
};
