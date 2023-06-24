import { Router } from "express";
import { FakeProfilesGet, PopularFiltersGet, FiltersPost, SearchEnginePost } from "../middleWares/Filters.middleWares";

const router = Router();

// Fake profiles
router.get('/fake_profiles', FakeProfilesGet);

// Most popular fake profiles (filters)
router.get('/popular_filters', PopularFiltersGet);

// Filters
router.post('/filters', FiltersPost);

// Search engine (filter)
router.post('/search_engine', SearchEnginePost);

export default router;
