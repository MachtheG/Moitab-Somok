import { constituencyHistory } from "@/data/election";
import { party } from "@/data/party";

/** schema.org Person for Hon. Kosgei. Facts only from data/ (sourced). */
export function personJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hilary Kiplang'at Kosgei",
    honorificPrefix: "Hon.",
    jobTitle: "Member of Parliament for Kipkelion West",
    url: siteUrl,
    memberOf: [
      { "@type": "Organization", name: "National Assembly of Kenya" },
      { "@type": "PoliticalParty", name: party.current === "UDA" ? "United Democratic Alliance" : party.current },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Kenyatta University" },
      { "@type": "HighSchool", name: "Kericho High School" },
    ],
    workLocation: { "@type": "Place", name: "Kipkelion West Constituency, Kericho County, Kenya" },
    description: `MP for Kipkelion West since ${constituencyHistory.mps[1]!.year}.`,
  };
}
