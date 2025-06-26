import {
  ActionProps,
  ActionResult,
  AttackProps,
  AttackResult,
  BuffProps,
  HealProps,
} from '@shared/types/action';
import { DefenseType } from '@shared/types/defense';

import { Character } from '../core/character';

export interface IActionStrategy {
  perform(
    source: Character,
    target: Character,
    actionProps:
      | (ActionProps & AttackProps)
      | (ActionProps & BuffProps)
      | (ActionProps & HealProps)
  ): ActionResult;
}

export class AbilityAttackAction implements IActionStrategy {
  perform(
    source: Character,
    target: Character,
    actionProps: ActionProps & AttackProps
  ): ActionResult {
    if (source.resourceValue < actionProps.cost) {
      return {
        message: `${source.name} does not have enough ${source.resourceName} to cast ${actionProps.name}!`,
        success: false,
      };
    }

    source.resourceValue -= actionProps.cost;

    const { damage, outcome } = resolveAttack(
      source,
      target,
      actionProps.baseDamage,
      actionProps.defenseStat
    );

    if (damage > 0) {
      target.health = Math.max(0, target.health - damage);
    }

    return {
      message: `${source.name} casts ${actionProps.name} on ${target.name}: ${outcome}${outcome !== 'MISS' ? ` for ${damage} damage` : ''}!`,
      success: outcome !== 'MISS',
    };
  }
}

export class Action {
  public props: ActionProps;
  private strategy: IActionStrategy;

  constructor(strategy: IActionStrategy, props: ActionProps) {
    this.strategy = strategy;
    this.props = props;
  }

  perform(
    source: Character,
    target: Character,
    actionProps:
      | (ActionProps & AttackProps)
      | (ActionProps & BuffProps)
      | (ActionProps & HealProps)
  ): ActionResult {
    return this.strategy.perform(source, target, actionProps);
  }

  setStrategy(strategy: IActionStrategy) {
    this.strategy = strategy;
  }
}

export class AttackAction implements IActionStrategy {
  perform(
    source: Character,
    target: Character,
    actionProps: ActionProps & AttackProps
  ): ActionResult {
    const { damage, outcome } = resolveAttack(
      source,
      target,
      actionProps.baseDamage,
      actionProps.defenseStat
    );

    if (damage > 0) {
      target.health = Math.max(0, target.health - damage);
    }

    return {
      message: `${source.name} attacks ${target.name}: ${outcome}${outcome !== 'MISS' ? ` for ${damage} damage` : ''}!`,
      success: outcome !== 'MISS',
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
      message: `${source.name} heals ${target.name} for ${actionProps.healAmount} health!`,
      success: true,
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
        message: `${source.name} does not have enough mana to cast ${actionProps.name}!`,
        success: false,
      };
    }

    source.resourceValue -= actionProps.cost;

    // Apply buff (this is a placeholder, actual implementation may vary)
    target.activeBuffs = {
      ...actionProps,
    };

    return {
      message: `${source.name} casts ${actionProps.name} on ${target.name}!`,
      success: true,
    };
  }
}

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
  damage: number;
  outcome: AttackResult;
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

  return { damage, outcome, roll };
}
