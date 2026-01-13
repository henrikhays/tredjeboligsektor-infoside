/**
 * Datalag for Tredje Boligsektor-kartleggingen
 * Leser og prosesserer actors_master.json
 */

import actorsData from '../../data/actors_master.json';
import { Actor, Topic, Category, Geography, FilterOptions } from './types';

// Cast til riktig type
const actors: Actor[] = actorsData as Actor[];

/**
 * Henter alle aktører
 */
export function getAllActors(): Actor[] {
  return actors;
}

/**
 * Henter en aktør basert på id_master
 */
export function getActorById(id: number): Actor | undefined {
  return actors.find((actor) => actor.id_master === id);
}

/**
 * Henter alle aktører som har et spesifikt tema
 */
export function getActorsByTopic(topic: string): Actor[] {
  const normalizedTopic = topic.toLowerCase().trim();
  return actors.filter((actor) => {
    const actorTopics = actor.temaer
      .split(',')
      .map((t) => t.toLowerCase().trim());
    return actorTopics.includes(normalizedTopic);
  });
}

/**
 * Henter alle unike temaer med antall aktører
 */
export function getAllTopics(): Topic[] {
  const topicCounts: Record<string, number> = {};

  actors.forEach((actor) => {
    const topics = actor.temaer.split(',').map((t) => t.trim());
    topics.forEach((topic) => {
      if (topic) {
        const normalized = topic.toLowerCase();
        topicCounts[normalized] = (topicCounts[normalized] || 0) + 1;
      }
    });
  });

  return Object.entries(topicCounts)
    .map(([name, count]) => ({
      slug: slugify(name),
      name: capitalizeFirst(name),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Henter alle unike kategorier med antall aktører
 */
export function getAllCategories(): Category[] {
  const categoryCounts: Record<string, number> = {};

  actors.forEach((actor) => {
    const category = actor.kategori;
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({
      slug: slugify(name),
      name: formatCategoryName(name),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Henter alle unike geografier med antall aktører
 */
export function getAllGeographies(): Geography[] {
  const geographyCounts: Record<string, number> = {};

  actors.forEach((actor) => {
    const geography = actor.geografi;
    if (geography) {
      geographyCounts[geography] = (geographyCounts[geography] || 0) + 1;
    }
  });

  return Object.entries(geographyCounts)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Henter filteralternativer for en gitt liste med aktører
 */
export function getFilterOptions(actorList: Actor[]): FilterOptions {
  const categories: Record<string, number> = {};
  const geographies: Record<string, number> = {};
  const reportCounts = new Set<number>();

  actorList.forEach((actor) => {
    // Kategorier
    if (actor.kategori) {
      categories[actor.kategori] = (categories[actor.kategori] || 0) + 1;
    }

    // Geografier
    if (actor.geografi) {
      geographies[actor.geografi] = (geographies[actor.geografi] || 0) + 1;
    }

    // Antall rapporter
    const numReports = actor.rapporter_som_omtaler?.length || 0;
    reportCounts.add(numReports);
  });

  return {
    categories: Object.entries(categories)
      .map(([name, count]) => ({
        slug: slugify(name),
        name: formatCategoryName(name),
        count,
      }))
      .sort((a, b) => b.count - a.count),
    geographies: Object.entries(geographies)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count),
    minReports: Array.from(reportCounts).sort((a, b) => a - b),
  };
}

/**
 * Filtrerer aktører basert på kriterier
 */
export function filterActors(
  actorList: Actor[],
  filters: {
    category?: string;
    geography?: string;
    minReports?: number;
  }
): Actor[] {
  return actorList.filter((actor) => {
    // Kategori-filter
    if (filters.category && filters.category !== 'all') {
      if (slugify(actor.kategori) !== filters.category) {
        return false;
      }
    }

    // Geografi-filter
    if (filters.geography && filters.geography !== 'all') {
      if (actor.geografi !== filters.geography) {
        return false;
      }
    }

    // Minimum rapporter-filter
    if (filters.minReports && filters.minReports > 0) {
      const numReports = actor.rapporter_som_omtaler?.length || 0;
      if (numReports < filters.minReports) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Finner tema-slug fra et temanavn
 */
export function findTopicBySlug(slug: string): Topic | undefined {
  const topics = getAllTopics();
  return topics.find((t) => t.slug === slug);
}

/**
 * Hjelpefunksjon: Konverterer streng til URL-vennlig slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Hjelpefunksjon: Kapitaliserer første bokstav
 */
function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Hjelpefunksjon: Formaterer kategorinavn til lesbar form
 */
function formatCategoryName(category: string): string {
  const categoryNames: Record<string, string> = {
    offentlig_aktor: 'Offentlig aktør',
    privat_aktor: 'Privat aktør',
    forskningsmiljo: 'Forskningsmiljø',
    politikk_lovverk: 'Politikk og lovverk',
    nettverk_organisasjon: 'Nettverk og organisasjon',
    finansiering_kilde: 'Finansieringskilde',
    teknologi_digitalt_verktoy: 'Teknologi og digitalt verktøy',
    arrangement_konferanse: 'Arrangement og konferanse',
    annet: 'Annet',
  };

  return categoryNames[category] || capitalizeFirst(category.replace(/_/g, ' '));
}

/**
 * Henter statistikk for forsiden
 */
export function getStatistics() {
  const allTopics = getAllTopics();
  const allCategories = getAllCategories();
  const allGeographies = getAllGeographies();

  return {
    totalActors: actors.length,
    totalTopics: allTopics.length,
    totalCategories: allCategories.length,
    totalGeographies: allGeographies.length,
    topTopics: allTopics.slice(0, 10),
    topCategories: allCategories,
  };
}
