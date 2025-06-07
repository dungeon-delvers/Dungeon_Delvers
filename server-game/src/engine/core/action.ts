import { BuffableStat, Character } from './character';
import { DefenseType } from './defense';

const ACTION_TYPES = [
  'attack_melee',
  'attack_spell',
  'buff',
  'debuff',
  'heal',
] as const;

const ATTACK_RESULTS = ['MISS', 'GRAZE', 'HIT', 'CRITICAL'] as const;

export type ActionType = (typeof ACTION_TYPES)[number];
export type AttackResult = (typeof ATTACK_RESULTS)[number];

export type BuffProps = {
  buffAmount: number;
  duration: number;
  buffStat: BuffableStat;
};

export type AttackProps = {
  baseDamage: number;
  defenseStat?: DefenseType;
  areaOfEffect?: number;
};

export type HealProps = {
  healAmount: number;
};

export interface ActionProps {
  actionText: (source: Character, target: Character) => string;
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

export interface IActionStrategy {
  perform(source: Character, target: Character, actionProps: any): ActionResult;
}

export type ActionResult = {
  success: boolean;
  message: string;
};

/**
 * Resolves an attack and returns the outcome and final damage.
 * @param source The attacking character
 * @param target The target character
 * @param baseDamage The base damage to apply
 * @param defenseStat The defense stat to use ('deflection', 'fortitude', 'reflexes', 'will')
 */
export function resolveAttack(
  source: Character,
  target: Character,
  baseDamage: number,
  defenseStat: DefenseType = 'deflection'
): {
  outcome: AttackResult;
  damage: number;
  roll: number;
} {
  const accuracy = source.accuracy ?? 0;
  const defense = target.getDefense(defenseStat) ?? 0;
  const roll = Math.floor(Math.random() * 101); // 0-100
  const result = roll + (accuracy - defense);

  let outcome: AttackResult;
  let damage = baseDamage;
  if (result < 16) {
    outcome = 'MISS';
    damage = 0;
  } else if (result <= 50) {
    outcome = 'GRAZE';
    damage = Math.floor(baseDamage * 0.5);
  } else if (result <= 101) {
    outcome = 'HIT';
    // standard damage
  } else {
    outcome = 'CRITICAL';
    damage = Math.floor(baseDamage * 1.5);
  }

  return { outcome, damage, roll };
}

export class Action {
  private strategy: IActionStrategy;
  public props: ActionProps;

  constructor(strategy: IActionStrategy, props: ActionProps) {
    this.strategy = strategy;
    this.props = props;
  }

  setStrategy(strategy: IActionStrategy) {
    this.strategy = strategy;
  }

  perform(
    source: Character,
    target: Character,
    actionProps: any
  ): ActionResult {
    return this.strategy.perform(source, target, actionProps);
  }
}

export class AttackAction implements IActionStrategy {
  perform(
    source: Character,
    target: Character,
    actionProps: ActionProps & AttackProps
  ): ActionResult {
    const { outcome, damage } = resolveAttack(
      source,
      target,
      actionProps.baseDamage,
      actionProps.defenseStat
    );

    if (damage > 0) {
      target.health = Math.max(0, target.health - damage);
    }

    return {
      success: outcome !== 'MISS',
      message: `${source.name} attacks ${target.name}: ${outcome}${outcome !== 'MISS' ? ` for ${damage} damage` : ''}!`,
    };
  }
}

// Heal Action
export class HealAction implements IActionStrategy {
  perform(
    source: Character,
    target: Character,
    actionProps: ActionProps & HealProps
  ): ActionResult {
    target.health += actionProps.healAmount;
    return {
      success: true,
      message: `${source.name} heals ${target.name} for ${actionProps.healAmount} health!`,
    };
  }
}

export class AbilityAttackAction implements IActionStrategy {
  perform(
    source: Character,
    target: Character,
    actionProps: ActionProps & AttackProps
  ): ActionResult {
    if (source.resourceValue < actionProps.cost) {
      return {
        success: false,
        message: `${source.name} does not have enough ${source.resourceName} to cast ${actionProps.name}!`,
      };
    }

    source.resourceValue -= actionProps.cost;

    const { outcome, damage } = resolveAttack(
      source,
      target,
      actionProps.baseDamage,
      actionProps.defenseStat
    );

    if (damage > 0) {
      target.health = Math.max(0, target.health - damage);
    }

    return {
      success: outcome !== 'MISS',
      message: `${source.name} casts ${actionProps.name} on ${target.name}: ${outcome}${outcome !== 'MISS' ? ` for ${damage} damage` : ''}!`,
    };
  }
}

// Spell Buff Action
export class SpellBuffAction implements IActionStrategy {
  perform(
    source: Character,
    target: Character,
    actionProps: ActionProps & BuffProps
  ): ActionResult {
    if (source.resourceValue < actionProps.cost) {
      return {
        success: false,
        message: `${source.name} does not have enough mana to cast ${actionProps.name}!`,
      };
    }

    source.resourceValue -= actionProps.cost;

    // Apply buff (this is a placeholder, actual implementation may vary)
    target.activeBuffs = {
      ...actionProps,
    };

    return {
      success: true,
      message: `${source.name} casts ${actionProps.name} on ${target.name}!`,
    };
  }
}
