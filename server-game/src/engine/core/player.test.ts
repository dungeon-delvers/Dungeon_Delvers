import { Player } from './player';
import { Vector3 } from '@babylonjs/core';
import { PlayerClassName, Race, Gender } from 'types/game';

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player({
      id: 0,
      name: 'Ricard',
      level: 1,
      attributes: {
        CON: 14,
        DEX: 16,
        INT: 9,
        MIG: 11,
        PER: 15,
        RES: 10,
      },
      gender: 'MALE',
      race: 'HUMAN',
      playerClass: 'FIGHTER',
      isAlive: true,
      position: new Vector3(0, 0, 0), // Example argument for rotation
      rotation: new Vector3(0, 0, 0), // Example argument for position
      visibility: 'PUBLIC',
      userId: 1,
      zoneId: 1,
    });
  });

  it('should initialize with correct properties', () => {
    expect(player.id).toBe(0);
    expect(player.gender).toBe('MALE');
    expect(player.level).toBe(1);
    expect(player.playerClass).toBe('FIGHTER');
    expect(player.race).toBe('HUMAN');
    expect(player.userId).toBe(1);
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
