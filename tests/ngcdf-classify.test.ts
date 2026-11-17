import { describe, expect, it } from "vitest";
import { findWard, inferSector, normaliseHeading } from "@/scripts/ngcdf/classify";
import { ngcdfDocs, ngcdfProjects } from "@/data/record/ngcdf-projects";

describe("NG-CDF classifier", () => {
  it("maps document headings", () => {
    expect(normaliseHeading("INFRASTRUCTURE DEVELOPMENT FOR JSS BY MOE")).toBe("jss");
    expect(normaliseHeading("MONITORING,EVALUATION AND CAPACITY BUILDING")).toBe("monitoring");
    expect(normaliseHeading("ADDITIONAL")).toBeNull();
  });
  it("prefers the school name over the activity", () => {
    expect(inferSector("Kasheen Secondary School", "Purchase of 16,000 litres water storage tank")).toBe("secondary-education");
    expect(inferSector("Water and Sewerage Charges", "Payments of water services")).toBe("administration");
  });
  it("only assigns a ward when exactly one is named", () => {
    expect(findWard("Chilchila Ward Environment Project")).toBe("chilchila");
    expect(findWard("Kipkelion Girls Secondary School")).toBeUndefined();
    expect(findWard("Kamasian Ward 125,000, Kunyak Ward 125,000")).toBeUndefined();
  });
});

describe("parsed NG-CDF data reconciles with printed totals", () => {
  const sum = (fy: string, list?: number) =>
    Math.round(ngcdfProjects.filter((p) => p.fy === fy && (list === undefined || p.list === list)).reduce((s, p) => s + p.amount, 0) * 100) / 100;
  it("FY2017/18 equals the GRAND TOTAL", () => expect(sum("2017/18")).toBe(92_989_655.16));
  it("FY2022/23 list 2 equals its TOTAL", () => expect(sum("2022/23", 2)).toBe(72_010_754));
  it("FY2023/24 equals its TOTAL", () => expect(sum("2023/24")).toBe(157_375_603));
  it("has four documents", () => expect(ngcdfDocs.map((d) => d.fy)).toEqual(["2017/18", "2020/21", "2022/23", "2023/24"]));
});
