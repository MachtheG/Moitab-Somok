/**
 * Every factual claim on the site points at one of these ids.
 * `accessed` is when we last read the source; `verified` means the specific
 * figure we use was read on the page itself (not a search snippet).
 * scripts/check-sources.ts fails CI if any data file cites an unknown id.
 */
export type Source = {
  id: string;
  title: string;
  outlet: string;
  date: string | null; // publication date (YYYY-MM-DD) if the page shows one
  accessed: string;
  url: string;
  verified: boolean;
  note?: string;
};

export const sources = [
  {
    id: "parliament-profile",
    title: "Hon. Kosgei Hilary Kiplang'at",
    outlet: "Parliament of Kenya: National Assembly",
    date: null,
    accessed: "2026-11-17",
    url: "https://www.parliament.go.ke/the-national-assembly/hon-kosgei-hilary-kiplangat-0",
    verified: true,
    note: "Education, KEBS board 2015–2017, 12th Parliament committees. Page text was read via a model-extracted summary; re-check wording before quoting.",
  },
  {
    id: "mzalendo-13th",
    title: "Kosgei Hilary Kiplang'at: 13th Parliament performance",
    outlet: "Mzalendo Trust",
    date: null,
    accessed: "2026-11-17",
    url: "https://mzalendo.com/mps-performance/national-assembly/13th-parliament/hilary-kiplangat-kosgei/?in_depth=1",
    verified: true,
    note: "Party confirmed by Parliament roster 6 Nov 2026 (per page). Counts cover the 13th Parliament to date.",
  },
  {
    id: "mzalendo-12th",
    title: "Kosgei Hilary Kiplang'at: 12th Parliament",
    outlet: "Mzalendo Trust",
    date: null,
    accessed: "2026-11-17",
    url: "https://mzalendo.com/mps-performance/national-assembly/12th-parliament/kosgei-hilary/?in_depth=1",
    verified: true,
    note: "Records Hansard of 15 Oct 2019 in which he states membership of the Departmental Committee on Environment and Natural Resources.",
  },
  {
    id: "mzalendo-constituency",
    title: "Kipkelion West: constituency profile",
    outlet: "Mzalendo Trust",
    date: null,
    accessed: "2026-11-17",
    url: "https://mzalendo.com/research-and-knowledge/constituencies/kipkelion-west/",
    verified: true,
    note: "Registered voters 2017/2022, ward registers 2022, 2022 result (cites IEBC Gazette 9950).",
  },
  {
    id: "mzalendo-ngcdf",
    title: "Kipkelion West: NG-CDF approved allocations",
    outlet: "Mzalendo Trust (citing NG-CDF Board)",
    date: "2026-07-26",
    accessed: "2026-11-17",
    url: "https://mzalendo.com/public-finance/ngcdf/kipkelion-west/",
    verified: true,
    note: "Approved, not released or spent. Captured 26 Jul 2026 from crm.ngcdf.go.ke (constid=189).",
  },
  {
    id: "iebc-gazette-2022",
    title: "Gazette Notice 9950: Declaration of Members of the National Assembly, 2022",
    outlet: "IEBC / Kenya Gazette",
    date: "2022",
    accessed: "2026-11-17",
    url: "https://iebc.or.ke/uploads/resources/p3sivVm8LM.pdf",
    verified: true,
    note: "Opened 2026-11-17: line 189 Kipkelion West, Kosgei Hilary Kiplangat, UDA, 26,222.",
  },
  {
    id: "iebc-register-2022",
    title: "Registered voters per constituency, 2022",
    outlet: "IEBC",
    date: "2022",
    accessed: "2026-11-17",
    url: "https://www.iebc.or.ke/docs/rov_per_constituency.pdf",
    verified: true,
    note: "Opened 2026-11-17: 189 KIPKELION WEST 52,960.",
  },
  {
    id: "wikipedia-constituency",
    title: "Kipkelion West Constituency",
    outlet: "Wikipedia",
    date: "2026-09-24",
    accessed: "2026-11-17",
    url: "https://en.wikipedia.org/wiki/Kipkelion_West_Constituency",
    verified: true,
    note: "Split from Kipkelion after the 2010 Constitution; MPs 2013 (Rob Jackson Kipkorir, URP), 2017 & 2022 (Kosgei); four wards; coffee and dairy. Secondary source: cite IEBC originals where possible.",
  },
  {
    id: "weeffect-coffee",
    title: "Coffee farms give Kipkelion women financial freedom",
    outlet: "We Effect",
    date: null,
    accessed: "2026-11-17",
    url: "https://weeffect.org/stories/coffee-farms-give-kipkelion-women-financial-freedom/",
    verified: false,
    note: "Covers coffee only (does not mention dairy). Dairy is sourced to Wikipedia.",
  },
  {
    id: "iebc-election-date",
    title: "IEBC sets August 10, 2027 as General Election date",
    outlet: "The Standard",
    date: null,
    accessed: "2026-11-17",
    url: "https://standardmedia.co.ke/business/national/article/2001551158/iebc-sets-august-10-2027-as-general-election-date",
    verified: true,
    note: "Opened 2026-11-17: Tuesday 10 Aug 2027; primaries by 9 May 2027; campaign 29 May–7 Aug 2027. Replace with the IEBC gazette notice URL once located.",
  },
  {
    id: "ngcdf-2017-18",
    title: "Kipkelion West Constituency: Project Proposal FY 2017/2018",
    outlet: "NG-CDF Board",
    date: "2019-02-21",
    accessed: "2026-11-17",
    url: "https://ngcdf.go.ke/wp-content/uploads/2021/07/KIPKELION-WEST-1718.pdf",
    verified: true,
    note: "Local copy data/raw/ngcdf/2017-18.pdf. Grand total KSh 92,989,655.16. FY began July 2017, before the August 2017 election.",
  },
  {
    id: "ngcdf-2020-21",
    title: "Kipkelion West: Project Proposal FY 2020-2021",
    outlet: "NG-CDF Board",
    date: "2021-08-04",
    accessed: "2026-11-17",
    url: "https://ngcdf.go.ke/wp-content/uploads/2021/08/Kipkelion-west-2020-21.pdf",
    verified: true,
    note: "Local copy data/raw/ngcdf/2020-21.pdf. No printed total; parsed sum KSh 133,388,879.01.",
  },
  {
    id: "ngcdf-2022-23",
    title: "Kipkelion West: Approved Projects Proposal FY 2022-2023",
    outlet: "NG-CDF Board (constituency site)",
    date: "2024-06-18",
    accessed: "2026-11-17",
    url: "https://kipkelion-west.ngcdf.go.ke/wp-content/uploads/2024/09/3_Kipkelion-West.pdf",
    verified: true,
    note: "Local copy data/raw/ngcdf/2022-23.pdf. Two lists; list 2 TOTAL KSh 72,010,754. Combined KSh 132,315,033 vs approved allocation KSh 138,215,033.",
  },
  {
    id: "ngcdf-2023-24",
    title: "Kipkelion West: Approved Projects Codelist FY 2023-2024",
    outlet: "NG-CDF Board (constituency site)",
    date: "2024-09-06",
    accessed: "2026-11-17",
    url: "https://kipkelion-west.ngcdf.go.ke/wp-content/uploads/2024/09/Kipkelion-West.pdf",
    verified: true,
    note: "Local copy data/raw/ngcdf/2023-24.pdf. TOTAL KSh 157,375,603 vs approved allocation KSh 166,593,720.",
  },
  {
    id: "kbc-2025-05-10",
    title: "Leaders demand justice for slain Kasipul MP, call for arrest of masterminds",
    outlet: "KBC",
    date: "2025-05-10",
    accessed: "2026-11-17",
    url: "https://www.kbc.co.ke/leaders-demand-justice-for-slain-kasipul-mp-call-for-arrest-of-masterminds/",
    verified: true,
  },
  {
    id: "kenyans-2025-07-22",
    title: "MPs Accuse Ministry of Aiding Land Fraud, Demand DCI Probe",
    outlet: "Kenyans.co.ke",
    date: "2025-07-22",
    accessed: "2026-11-17",
    url: "https://www.kenyans.co.ke/news/114430-mps-accuse-ministry-aiding-land-fraud-demand-dci-probe",
    verified: true,
  },
  {
    id: "kenyans-2019-07-05",
    title: "ODM & Jubilee MPs Who are Married to Sisters",
    outlet: "Kenyans.co.ke",
    date: "2019-07-05",
    accessed: "2026-11-17",
    url: "https://www.kenyans.co.ke/news/41384-odm-jubilee-mps-who-are-married-sisters",
    verified: true,
  },
  {
    id: "hdx-ward-boundaries",
    title: "Kenya Elections: county, constituency and ward boundaries",
    outlet: "Humanitarian Data Exchange (IEBC data)",
    date: null,
    accessed: "2026-11-18",
    url: "https://data.humdata.org/dataset/kenya-elections",
    verified: true,
    note: "Ward polygons via github.com/tigawanna/kenya_wards_geojson_data (reprojected to WGS84). Local copy data/raw/geo/.",
  },
  {
    id: "official-x",
    title: "Hilary Kosgei (@KosgeiHon)",
    outlet: "X",
    date: null,
    accessed: "2026-11-17",
    url: "https://x.com/KosgeiHon",
    verified: false,
    note: "[[TO CONFIRM: official account, per campaign]]",
  },
  {
    id: "official-facebook",
    title: "Hon. Hilary Kosgei",
    outlet: "Facebook",
    date: null,
    accessed: "2026-11-17",
    url: "https://www.facebook.com/HonHilaryKosgei",
    verified: false,
    note: "[[TO CONFIRM: official page, per campaign]]. The page name includes a nickname that is not shown on the site until approved (D-017).",
  },
] as const satisfies readonly Source[];

export type SourceId = (typeof sources)[number]["id"];

export function getSource(id: SourceId): Source {
  return sources.find((s) => s.id === id)!;
}
