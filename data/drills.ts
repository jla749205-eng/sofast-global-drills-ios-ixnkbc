
import { Drill } from '@/types/drills';

export const DRILLS: Drill[] = [
  {
    id: 'el-presidente',
    name: 'El Presidente',
    description: 'Classic 12-round drill with 3 targets, 2 shots each, turn and repeat',
    parTime: 10,
    rounds: 12,
    distance: '10 yards',
    instructions: [
      'Set up 3 targets at 10 yards',
      'Start with hands at surrender position',
      'On signal, draw and fire 2 rounds on each target',
      'Perform reload',
      'Turn 180 degrees',
      'Turn back and fire 2 rounds on each target again',
      'Total: 12 rounds'
    ],
    isPremium: false
  },
  {
    id: 'mozambique',
    name: 'Mozambique Drill',
    description: 'Failure to stop drill: 2 to body, 1 to head',
    parTime: 3,
    rounds: 3,
    distance: '7 yards',
    instructions: [
      'Set up 1 target at 7 yards',
      'Start from holster or ready position',
      'On signal, fire 2 rounds to center mass',
      'Fire 1 round to head/ocular box',
      'Total: 3 rounds'
    ],
    isPremium: false
  },
  {
    id: 'dot-torture',
    name: 'Dot Torture',
    description: '50-round precision drill with 10 dots',
    parTime: undefined,
    rounds: 50,
    distance: '3-5 yards',
    instructions: [
      'Print Dot Torture target with 10 dots',
      'Follow specific dot sequence',
      'Dot 1: 5 rounds strong hand only',
      'Dot 2: 5 rounds weak hand only',
      'Dots 3-4: 1 round each, 5 times',
      'Dot 5: 5 rounds strong hand only',
      'Continue pattern for all 10 dots',
      'Total: 50 rounds, no time limit'
    ],
    isPremium: false
  },
  {
    id: 'bill-drill',
    name: 'Bill Drill',
    description: '6 rounds on single target as fast as possible',
    parTime: 3,
    rounds: 6,
    distance: '7 yards',
    instructions: [
      'Set up 1 target at 7 yards',
      'Start from holster',
      'On signal, draw and fire 6 rounds center mass',
      'Focus on speed while maintaining accuracy',
      'Total: 6 rounds'
    ],
    isPremium: true
  },
  {
    id: 'fast',
    name: 'FAST (Fundamentals, Accuracy, Speed Test)',
    description: 'Timed drill with body and head shots',
    parTime: 5,
    rounds: 6,
    distance: '7 yards',
    instructions: [
      'Use FAST target at 7 yards',
      'Start from holster',
      'Fire 2 rounds to 3x5 body box',
      'Fire 4 rounds to 2x3.5 head box',
      'Clean run under 5 seconds is advanced',
      'Total: 6 rounds'
    ],
    isPremium: true
  },
  {
    id: '1-5-1',
    name: '1-5-1 Drill',
    description: 'Head, body, head drill testing transitions',
    parTime: 6,
    rounds: 7,
    distance: '7 yards',
    instructions: [
      'Set up 1 target at 7 yards',
      'Start from holster',
      'Fire 1 round to head',
      'Fire 5 rounds to body',
      'Fire 1 round to head',
      'Total: 7 rounds'
    ],
    isPremium: true
  },
  {
    id: 'hackathorn-standards',
    name: 'Hackathorn Standards',
    description: 'Multi-distance drill from 10 to 35 yards',
    parTime: undefined,
    rounds: 30,
    distance: '10-35 yards',
    instructions: [
      '10 yards: 5 rounds in 2.5 seconds',
      '15 yards: 5 rounds in 3.5 seconds',
      '25 yards: 10 rounds in 10 seconds',
      '35 yards: 10 rounds in 15 seconds',
      'Total: 30 rounds'
    ],
    isPremium: true
  },
  {
    id: 'failure-drill',
    name: 'Failure Drill',
    description: 'Multiple target engagement with failure to stop',
    parTime: 8,
    rounds: 9,
    distance: '7 yards',
    instructions: [
      'Set up 3 targets at 7 yards',
      'Start from holster',
      'Fire 2 rounds center mass on each target',
      'Fire 1 head shot on each target',
      'Total: 9 rounds'
    ],
    isPremium: true
  },
  {
    id: 'walk-back',
    name: 'Walk Back Drill',
    description: 'Start close, walk back after each hit',
    parTime: undefined,
    rounds: 10,
    distance: '3-25 yards',
    instructions: [
      'Start at 3 yards',
      'Fire 1 round at 8-inch circle',
      'If hit, walk back 1 yard',
      'If miss, stay at distance',
      'Continue until 10 rounds fired',
      'Record maximum distance achieved'
    ],
    isPremium: true
  },
  {
    id: '5x5',
    name: '5x5 Drill',
    description: '5 rounds, 5 yards, 5 seconds',
    parTime: 5,
    rounds: 5,
    distance: '5 yards',
    instructions: [
      'Set up 1 target at 5 yards',
      'Start from holster',
      'On signal, draw and fire 5 rounds',
      'All rounds must be in scoring zone',
      'Complete in under 5 seconds',
      'Total: 5 rounds'
    ],
    isPremium: true
  }
];

export const getFreeDrills = () => DRILLS.filter(drill => !drill.isPremium);
export const getPremiumDrills = () => DRILLS.filter(drill => drill.isPremium);
export const getDrillById = (id: string) => DRILLS.find(drill => drill.id === id);
