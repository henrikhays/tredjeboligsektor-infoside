/**
 * TypeScript-typer for Tredje Boligsektor-kartleggingen
 */

export interface Actor {
  id_master: number;
  navn: string;
  kategori: string;
  temaer: string;
  geografi: string;
  rolle_kort: string;
  relevans_for_TBS: string;
  status: string;
  kildetype: string;
  rapporter_som_omtaler: string[];
  kildehenvisninger_i_rapporter: string;
}

export interface Topic {
  slug: string;
  name: string;
  count: number;
}

export interface Category {
  slug: string;
  name: string;
  count: number;
}

export interface Geography {
  name: string;
  count: number;
}

export interface FilterOptions {
  categories: Category[];
  geographies: Geography[];
  minReports: number[];
}
