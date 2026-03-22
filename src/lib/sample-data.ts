export interface SampleRow {
  date: string;
  region: string;
  product: string;
  revenue: number;
  units_sold: number;
  cost: number;
  category: string;
}

export const sampleData: SampleRow[] = [
  { date: "2024-01-01", region: "North", product: "Widget A", revenue: 12500, units_sold: 250, cost: 7500, category: "Electronics" },
  { date: "2024-01-01", region: "South", product: "Widget B", revenue: 8900, units_sold: 178, cost: 5340, category: "Electronics" },
  { date: "2024-01-01", region: "East", product: "Gadget X", revenue: 15200, units_sold: 304, cost: 9120, category: "Hardware" },
  { date: "2024-01-01", region: "West", product: "Gadget Y", revenue: 6700, units_sold: 134, cost: 4020, category: "Hardware" },
  { date: "2024-01-08", region: "North", product: "Widget A", revenue: 13100, units_sold: 262, cost: 7860, category: "Electronics" },
  { date: "2024-01-08", region: "South", product: "Widget B", revenue: 7600, units_sold: 152, cost: 4560, category: "Electronics" },
  { date: "2024-01-08", region: "East", product: "Gadget X", revenue: 16800, units_sold: 336, cost: 10080, category: "Hardware" },
  { date: "2024-01-08", region: "West", product: "Gadget Y", revenue: 5900, units_sold: 118, cost: 3540, category: "Hardware" },
  { date: "2024-01-15", region: "North", product: "Widget A", revenue: 11800, units_sold: 236, cost: 7080, category: "Electronics" },
  { date: "2024-01-15", region: "South", product: "Widget B", revenue: 9200, units_sold: 184, cost: 5520, category: "Electronics" },
  { date: "2024-01-15", region: "East", product: "Gadget X", revenue: 14500, units_sold: 290, cost: 8700, category: "Hardware" },
  { date: "2024-01-15", region: "West", product: "Gadget Y", revenue: 7100, units_sold: 142, cost: 4260, category: "Hardware" },
  { date: "2024-01-22", region: "North", product: "Widget A", revenue: 14200, units_sold: 284, cost: 8520, category: "Electronics" },
  { date: "2024-01-22", region: "South", product: "Widget B", revenue: 8100, units_sold: 162, cost: 4860, category: "Electronics" },
  { date: "2024-01-22", region: "East", product: "Gadget X", revenue: 17500, units_sold: 350, cost: 10500, category: "Hardware" },
  { date: "2024-01-22", region: "West", product: "Gadget Y", revenue: 6300, units_sold: 126, cost: 3780, category: "Hardware" },
  { date: "2024-02-01", region: "North", product: "Widget A", revenue: 13800, units_sold: 276, cost: 8280, category: "Electronics" },
  { date: "2024-02-01", region: "South", product: "Widget B", revenue: 9500, units_sold: 190, cost: 5700, category: "Electronics" },
  { date: "2024-02-01", region: "East", product: "Gadget X", revenue: 16200, units_sold: 324, cost: 9720, category: "Hardware" },
  { date: "2024-02-01", region: "West", product: "Gadget Y", revenue: 7800, units_sold: 156, cost: 4680, category: "Hardware" },
  { date: "2024-02-08", region: "North", product: "Widget A", revenue: 12000, units_sold: 240, cost: 7200, category: "Electronics" },
  { date: "2024-02-08", region: "South", product: "Widget B", revenue: 10200, units_sold: 204, cost: 6120, category: "Electronics" },
  { date: "2024-02-08", region: "East", product: "Gadget X", revenue: 15800, units_sold: 316, cost: 9480, category: "Hardware" },
  { date: "2024-02-08", region: "West", product: "Gadget Y", revenue: 6500, units_sold: 130, cost: 3900, category: "Hardware" },
  { date: "2024-02-15", region: "North", product: "Widget A", revenue: 14800, units_sold: 296, cost: 8880, category: "Electronics" },
  { date: "2024-02-15", region: "South", product: "Widget B", revenue: 8700, units_sold: 174, cost: 5220, category: "Electronics" },
  { date: "2024-02-15", region: "East", product: "Gadget X", revenue: 18200, units_sold: 364, cost: 10920, category: "Hardware" },
  { date: "2024-02-15", region: "West", product: "Gadget Y", revenue: 7200, units_sold: 144, cost: 4320, category: "Hardware" },
  { date: "2024-02-22", region: "North", product: "Widget A", revenue: 13500, units_sold: 270, cost: 8100, category: "Electronics" },
  { date: "2024-02-22", region: "South", product: "Widget B", revenue: 9800, units_sold: 196, cost: 5880, category: "Electronics" },
  { date: "2024-02-22", region: "East", product: "Gadget X", revenue: 16500, units_sold: 330, cost: 9900, category: "Hardware" },
  { date: "2024-02-22", region: "West", product: "Gadget Y", revenue: 6800, units_sold: 136, cost: 4080, category: "Hardware" },
  { date: "2024-03-01", region: "North", product: "Widget A", revenue: 15500, units_sold: 310, cost: 9300, category: "Electronics" },
  { date: "2024-03-01", region: "South", product: "Widget B", revenue: 7200, units_sold: 144, cost: 4320, category: "Electronics" },
  { date: "2024-03-01", region: "East", product: "Gadget X", revenue: 19000, units_sold: 380, cost: 11400, category: "Hardware" },
  { date: "2024-03-01", region: "West", product: "Gadget Y", revenue: 5500, units_sold: 110, cost: 3300, category: "Hardware" },
  { date: "2024-03-08", region: "North", product: "Widget A", revenue: 11500, units_sold: 230, cost: 6900, category: "Electronics" },
  { date: "2024-03-08", region: "South", product: "Widget B", revenue: 10500, units_sold: 210, cost: 6300, category: "Electronics" },
  { date: "2024-03-08", region: "East", product: "Gadget X", revenue: 17200, units_sold: 344, cost: 10320, category: "Hardware" },
  { date: "2024-03-08", region: "West", product: "Gadget Y", revenue: 7400, units_sold: 148, cost: 4440, category: "Hardware" },
  { date: "2024-03-15", region: "North", product: "Widget A", revenue: 14000, units_sold: 280, cost: 8400, category: "Electronics" },
  { date: "2024-03-15", region: "South", product: "Widget B", revenue: 8400, units_sold: 168, cost: 5040, category: "Electronics" },
  { date: "2024-03-15", region: "East", product: "Gadget X", revenue: 20100, units_sold: 402, cost: 12060, category: "Hardware" },
  { date: "2024-03-15", region: "West", product: "Gadget Y", revenue: 6100, units_sold: 122, cost: 3660, category: "Hardware" },
  { date: "2024-03-22", region: "North", product: "Widget A", revenue: 16200, units_sold: 324, cost: 9720, category: "Electronics" },
  { date: "2024-03-22", region: "South", product: "Widget B", revenue: 7800, units_sold: 156, cost: 4680, category: "Electronics" },
  { date: "2024-03-22", region: "East", product: "Gadget X", revenue: 18800, units_sold: 376, cost: 11280, category: "Hardware" },
  { date: "2024-03-22", region: "West", product: "Gadget Y", revenue: 5200, units_sold: 104, cost: 3120, category: "Hardware" },
  { date: "2024-04-01", region: "North", product: "Widget A", revenue: 13200, units_sold: 264, cost: 7920, category: "Electronics" },
  { date: "2024-04-01", region: "South", product: "Widget B", revenue: 11000, units_sold: 220, cost: 6600, category: "Electronics" },
  { date: "2024-04-01", region: "East", product: "Gadget X", revenue: 16900, units_sold: 338, cost: 10140, category: "Hardware" },
  { date: "2024-04-01", region: "West", product: "Gadget Y", revenue: 8200, units_sold: 164, cost: 4920, category: "Hardware" },
  { date: "2024-04-08", region: "North", product: "Widget A", revenue: 15100, units_sold: 302, cost: 9060, category: "Electronics" },
  { date: "2024-04-08", region: "South", product: "Widget B", revenue: 9100, units_sold: 182, cost: 5460, category: "Electronics" },
  { date: "2024-04-08", region: "East", product: "Gadget X", revenue: 21500, units_sold: 430, cost: 12900, category: "Hardware" },
  { date: "2024-04-08", region: "West", product: "Gadget Y", revenue: 6900, units_sold: 138, cost: 4140, category: "Hardware" },
  { date: "2024-04-15", region: "North", product: "Widget A", revenue: 14600, units_sold: 292, cost: 8760, category: "Electronics" },
  { date: "2024-04-15", region: "South", product: "Widget B", revenue: 10800, units_sold: 216, cost: 6480, category: "Electronics" },
  { date: "2024-04-15", region: "East", product: "Gadget X", revenue: 19500, units_sold: 390, cost: 11700, category: "Hardware" },
  { date: "2024-04-15", region: "West", product: "Gadget Y", revenue: 7600, units_sold: 152, cost: 4560, category: "Hardware" },
];

export const sampleDataColumns = ["date", "region", "product", "revenue", "units_sold", "cost", "category"];
