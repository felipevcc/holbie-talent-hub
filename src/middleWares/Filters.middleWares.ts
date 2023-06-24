import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Filters } from "../types/filters.d";
//import { ProfessionalProfile } from "../types/professional_profiles.d";

// Fake profiles
export const FakeProfilesGet: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const sqlQuery = await query('professional_profiles')
      .select('profile_id', 'location', 'job_name', 'kind_job', 'job_type')
      .where('is_user', false);

    for (let profile of sqlQuery) {
      const skills = await query('professional_skills')
        .select('skill_id')
        .where('profile_id', profile.profile_id)
        .pluck('skill_id');
      profile.skills = skills;
    }

    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get fake profiles', error);
    return res.status(500).json({ message: 'Failed to get fake profiles' });
  }
};

// Most popular fake profiles (filters)
export const PopularFiltersGet: RequestHandler = async (_req: Request, res: Response) => {
  try {
    // Get the three most popular
    const sqlQuery = await query('filters_professional')
      .select('filters_professional.profile_id', 'professional_profiles.location', 'professional_profiles.job_name', 'professional_profiles.kind_job', 'professional_profiles.job_type')
      .groupBy('filters_professional.profile_id')
      .orderByRaw('COUNT(company_id) DESC')
      .limit(3)
      .join('professional_profiles', 'filters_professional.profile_id', 'professional_profiles.profile_id')

    for (let profile of sqlQuery) {
      const skills = await query('professional_skills')
        .select('skill_id')
        .where('profile_id', profile.profile_id)
        .pluck('skill_id');
      profile.skills = skills;
    }

    return res.status(200).json(sqlQuery);
  } catch (error) {
    console.error('Failed to get fake profiles', error);
    return res.status(500).json({ message: 'Failed to get fake profiles' });
  }
};

// Function to create a new fake profile
const createFakeProfile = async (filters: Filters) => {
  try {
    // Create fake profile
    const sqlQuery = await query('professional_profiles').insert({
      location: filters.location,
      job_name: filters.job_name,
      kind_job: filters.kind_job,
      job_type: filters.job_type,
      is_user: false
    });

    // Create fake profile skills
    const profileId: number = sqlQuery[0];
    for (let skillId of filters.skills) {
      await query('professional_skills')
        .insert({ profile_id: profileId, skill_id: skillId });
    }
    return profileId;
  } catch (error) {
    console.error('Failed to create fake profile', error);
    return false;
  }
};

// Filters
export const FiltersPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id, location, job_name, kind_job, job_type, skills } = req.body;

    if (!company_id || !location || !job_name || !kind_job || !job_type || !skills || skills.length === 0) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    // Check if fake profile exists with the profile attributes
    const fakeProfiles = await query('professional_profiles')
      .select('profile_id')
      .where('location', 'LIKE', `%${location}%`)
      .where('job_name', 'LIKE', `%${job_name}%`)
      .where('kind_job', kind_job)
      .where('job_type', job_type)
      .where('is_user', false);

    // Saves the id of the fake filter profile
    let fakeProfileId = null;
    let newFilter: boolean = true;

    //fakeProfiles.length > 0
    if (fakeProfiles && fakeProfiles.length > 0) {
      // Check if fake profile has the same skills
      for (let profile of fakeProfiles) {
        const profileSkills = await query('professional_skills')
          .select('skill_id')
          .where('profile_id', profile.profile_id);

        const profileSkillsIds = profileSkills.map((row) => row.skill_id); // Skill array
        const hasSameSkills = profileSkillsIds.every((skillId) => skills.includes(skillId)) && skills.length === profileSkillsIds.length;
        if (hasSameSkills) {
          newFilter = false;
          // Set the id of the profile that complies with all filters
          fakeProfileId = profile.profile_id;
          break;
        }
      }
    }

    if (newFilter) {
      // Create new fake profile
      fakeProfileId = await createFakeProfile({ location, job_name, kind_job, job_type, skills });
      if (!fakeProfileId) {
        return res.status(500).json({ message: 'Failed to create fake profile' });
      }
    }

    // Create the relationship between the fake profile and the company that made the filter
    await query('filters_professional')
      .insert({ company_id, profile_id: fakeProfileId })
      .onConflict(['company_id', 'profile_id'])
      .ignore();

    // Professional profiles filter
    const profiles = await query('professional_profiles')
      .select('*')
      .where('location', 'LIKE', `%${location}%`)
      .where('job_name', 'LIKE', `%${job_name}%`)
      .where('kind_job', kind_job)
      .where('job_type', job_type)
      .where('is_user', true);

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: 'Results not found' });
    }

    // Skills filter
    for (const profile of profiles) {
      const profileSkills = await query('professional_skills')
        .select('skill_id')
        .where('profile_id', profile.profile_id);
      // Number of skills in the profile that match the filters
      const matchedSkills = profileSkills.filter((row) => skills.includes(row.skill_id));
      profile.matchedSkillsCount = matchedSkills.length;
    }

    // Sort array by the number of highest matches in skills
    profiles.sort((a, b) => b.matchedSkillsCount - a.matchedSkillsCount);

    // Group profiles based on number of matches
    const groupedProfiles: { [key: string]: any[] } = profiles.reduce((acc, profile) => {
      const key = profile.matchedSkillsCount.toString();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(profile);
      return acc;
    }, {});

    // Randomize the order of profiles within each group
    Object.values(groupedProfiles).forEach((group) => {
      group.sort(() => Math.random() - 0.5);
    });

    // Merge the profiles back into a single array
    const sortedProfiles = Object.values(groupedProfiles).flat();

    // Remove the matchedSkillsCount attribute
    for (const profile of sortedProfiles) {
      delete profile.matchedSkillsCount;
    }

    const maxProfiles = 3; // Number of results to return
    const sortedProfilesLimited = sortedProfiles.slice(0, maxProfiles);

    return res.status(200).json(sortedProfilesLimited);
  } catch (error) {
    console.error('Failed to get results', error);
    return res.status(500).json({ message: 'Failed to get results' });
  }
};

// Search engine to filter
export const SearchEnginePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { filter } = req.body;

    // Professional profiles filter
    const profiles = await query('professional_profiles')
      .select('professional_profiles.*')
      .where((builder) => {
        builder
          .where('location', 'LIKE', `%${filter}%`)
          .orWhere('job_name', 'LIKE', `%${filter}%`)
          .orWhere('kind_job', 'LIKE', `%${filter}%`)
          .orWhere('job_type', 'LIKE', `%${filter}%`)
          .orWhereExists(function () {
            this.select('*')
              .from('professional_skills')
              .join('skills', 'professional_skills.skill_id', 'skills.skill_id')
              .whereRaw(`professional_skills.profile_id = professional_profiles.profile_id`)
              .andWhere('skills.name', 'LIKE', `%${filter}%`);
          });
      })
      .where('is_user', true);

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: 'Results not found' });
    }

    return res.status(200).json(profiles);
  } catch (error) {
    console.error('Failed to get results', error);
    return res.status(500).json({ message: 'Failed to get results' });
  }
};
