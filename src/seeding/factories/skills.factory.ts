import { define } from 'typeorm-seeding';

import SkillEntity from 'src/modules/skills/entities/skill.entity';
import { skills } from '../mocks.dataset';

define(SkillEntity, () => {
  const skill = new SkillEntity();

  skill.name = skills[Math.floor(Math.random() * skills.length)];

  return skill;
});
