import { Player } from './player';
import { Attributes } from './attribute';
import { Vector3 } from '@babylonjs/core';
import { BaseStats, PlayerClass, Race, Gender, Visiblity } from 'types/game';

const mockAttributes = new Attributes({
  CON: 14,
  DEX: 16,
  INT: 9,
  MIG: 11,
  PER: 15,
  RES: 10,
});

const mockBaseStats: BaseStats = {
  accuracy: 46, // 47
  deflection: 37, // 37
  fortitude: 41, // 42
  health: 117, // 118
  reflex: 53, // 54
  willpower: 30, // 30
  actionSpeed: 1,
  areaOfEffect: 0,
  damageMod: 0.03,
  duration: 0,
  healing: 1,
};

const mockPosition = new Vector3(0, 0, 0);
const mockRotation = new Vector3(0, 0, 0);
const mockRace: Race = 'DWARF';
const mockGender: Gender = 'MALE';
const mockPlayerClass: PlayerClass = 'FIGHTER';
const mockUserId = 'user123';
describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player(
      'player1',
      'Ricard',
      mockAttributes,
      mockBaseStats,
      mockGender,
      mockPlayerClass,
      mockPosition,
      mockRace,
      mockRotation,
      mockUserId
    );
  });

  it('should initialize with correct properties', () => {
    expect(player.id).toBe('player1');
    expect(player.gender).toBe(mockGender);
    expect(player.level).toBe(1);
    expect(player.playerClass).toBe(mockPlayerClass);
    expect(player.race).toBe(mockRace);
    expect(player.userId).toBe(mockUserId);
    expect(player.visibility).toBe('PUBLIC');
  });

  it('should allow updating the surname', () => {
    player.surname = 'Doe';
    expect(player.surname).toBe('Doe');
  });

  it('should allow updating the gender', () => {
    player.gender = 'FEMALE';
    expect(player.gender).toBe('FEMALE');
  });

  it('should allow updating the level', () => {
    player.level = 5;
    expect(player.level).toBe(5);
  });

  it('should allow updating the visibility', () => {
    player.visibility = 'ROLEPLAY';
    expect(player.visibility).toBe('ROLEPLAY');
  });

  it('should allow updating the race', () => {
    player.race = 'HUMAN';
    expect(player.race).toBe('HUMAN');
  });

  it('should allow updating the player class', () => {
    player.playerClass = 'MAGE';
    expect(player.playerClass).toBe('MAGE');
  });

  it('should return the correct string representation', () => {
    expect(player.toString()).toBe('Ricard (FIGHTER)');
  });
});
