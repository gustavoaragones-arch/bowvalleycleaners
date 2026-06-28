export type ChecklistSection = {
  id: string;
  title: string;
  timeAllotment: string;
  intro?: string;
  items: { task: string; description: string }[];
};

/** Extracted from Unit_Cleaning_List.pdf — Bow Valley STR turnover SOP */
export const TURNOVER_CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    id: "initial-assessment",
    title: "1. Initial Assessment",
    timeAllotment: "5 Minutes",
    items: [
      {
        task: "Luminosity & Ventilation",
        description:
          "Turn on all lights and open all curtains. When weather allows, open windows for fresh air.",
      },
      {
        task: "Property Condition Check",
        description:
          "Check for damages from entrance through living room, kitchen, bedrooms, and bathrooms. If damage is found, inform supervisor and follow instructions.",
      },
      {
        task: "Lost & Found",
        description: "If a noticeable guest object is found, inform supervisor.",
      },
      {
        task: "Cleanliness",
        description:
          "Check the level of dirtiness; if trashed or messy, inform supervisor.",
      },
      {
        task: "Wash Dishes",
        description:
          "If the guest did not start the dishwasher, start a short cycle. If only a few items were used, wash manually while cleaning the kitchen.",
      },
      {
        task: "Waste Disposal",
        description:
          "Grab garbage bags from the bathroom and kitchen. Throw out all trash dispersed around the house.",
      },
      {
        task: "Linen Management — Stripping / Laundry",
        description:
          "If clean laundry is provided: empty the bag on a clean surface, use it to strip used linen (pillowcases, sheets, duvet covers, towels, kitchen cloths), and place the bag in the hallway outside the unit. If laundry is in-unit: strip and wash towels first, then bedding.",
      },
    ],
  },
  {
    id: "bedrooms",
    title: "2. Bedroom(s)",
    timeAllotment: "12 Minutes each",
    items: [
      {
        task: "Walls / Hang Décor",
        description:
          "Inspect for spills. Use a magic eraser on walls. Spray and clean all switches.",
      },
      {
        task: "Beds",
        description:
          "Make beds with clean linens. Lint-roll pillows and surfaces for hair. Ensure no wrinkles, bed skirt in place, and a professional finish. Touch up unused beds with a lint roller.",
      },
      {
        task: "Windows / Picture Window",
        description:
          "Check glass for oily stains; spray and clean. Clean trims and floor rails.",
      },
      {
        task: "Blinds & Curtains",
        description: "Shake curtains, test operation, and spray/clean if stained.",
      },
      {
        task: "Closet",
        description:
          "Check for hangers; spray/clean closet shelf and check the floor.",
      },
      {
        task: "Side Tables / Nightstands",
        description:
          "Spray/clean countertops and drawers inside/outside. Move furniture forward and clean behind. Dust lamp screens and lamps.",
      },
      {
        task: "Dresser / TV Stands",
        description:
          "Spray/clean countertops and TV remotes. Dust mounted TVs. Clean drawers, handles, and interiors.",
      },
      {
        task: "TV",
        description:
          "Ensure no fingerprints, working properly, and dust behind.",
      },
      {
        task: "Rugs & Throw Blankets",
        description:
          "Spot-clean stains. Check/clean blankets and restore original setup.",
      },
      {
        task: "Other Furniture",
        description:
          "Apply the same principles. Fold baby chairs or playpens. Straighten lamps, clocks, phones, remotes, and décor.",
      },
      {
        task: "Repeat in All Bedrooms",
        description: "Repeat the above tasks in every bedroom.",
      },
    ],
  },
  {
    id: "living-room",
    title: "3. Living Room(s)",
    timeAllotment: "8–10 Minutes",
    items: [
      {
        task: "Lamps, Ceiling Fans & Shades",
        description:
          "Spray/clean or dust lamp screens (lint roller). Ensure no hair or spider webs.",
      },
      {
        task: "Walls & Light Fixtures",
        description:
          "Check decorative pictures. Magic eraser on walls. Spray/clean switches. Dust all light fixtures.",
      },
      {
        task: "Side Tables, Coffee Tables, TV Stand & Shelves",
        description:
          "Dust and spray/clean surfaces and drawers. Move furniture to clean behind. Dust woodwork, routers, and devices.",
      },
      {
        task: "Carpets, Rugs & Throw Blankets",
        description:
          "Spot-clean stains. Check/clean blankets and restore original setup.",
      },
      {
        task: "Sofas & Upholstery",
        description:
          "Spot-clean stains. Shake crumbs, lint-roll, and lift cushions to shake crumbs underneath.",
      },
      {
        task: "Fireplace",
        description:
          "Spray/clean top and sides for dust. Clean glass and bottom tiles if applicable. Test operation.",
      },
    ],
  },
  {
    id: "kitchen",
    title: "4. Kitchen",
    timeAllotment: "20 Minutes",
    items: [
      {
        task: "Clear Kitchenware / Dishes",
        description:
          "Ensure furniture, décor, and curtains are in the correct position.",
      },
      {
        task: "Fridge",
        description:
          "When dishwasher is done, leave door open to dry. Place kitchenware in cabinets; wipe stuck food.",
      },
      {
        task: "Stoves, Oven & Extractor",
        description:
          "Clean inner stands with separate rags for dirt and polish. Wipe hood fan, grease filters, buttons, and panels. Remove gas stove grills and clean surfaces. Use magic eraser on glass cooktops. Clean oven door interior/exterior and check bottom drawer for grease and crumbs.",
      },
      {
        task: "Appliances & Light Fixtures",
        description:
          "Dust fixtures. Clean inside/outside of oven, fan, microwave, refrigerator, dishwasher, coffee machines, and toasters.",
      },
      {
        task: "Kitchen Tiles & Outlets",
        description: "Spray/clean spills and grease on tiles, outlets, and switches.",
      },
      {
        task: "Kitchen Countertops",
        description:
          "Spray/clean all surfaces. Lift objects. Clean trays, dish racks, and countertop items.",
      },
      {
        task: "Drawers, Cabinets & Under Sink",
        description:
          "Spray/clean spills and crumbs (especially toaster area). Check drawer tracks. Disinfect garbage can and replace liners. Check for leaks.",
      },
      {
        task: "Kitchenware / Dishes",
        description:
          "Wipe and dry before storing. Wash manually if needed; ensure no stuck food.",
      },
      {
        task: "Kitchen Island",
        description:
          "Clean thoroughly — many units use the island as the dining surface. Check cabinets and drawers if present.",
      },
      {
        task: "Sink, Faucets & Drains",
        description:
          "Clear drains, spray/clean surfaces, polish faucet and strainer with dish soap.",
      },
      {
        task: "Kitchen Baseboards",
        description: "Spray/clean spills and food stains.",
      },
      {
        task: "Re-Stock",
        description:
          "Replenish tea, coffee, oil, spices, paper towels, bin liners, cling wrap, dish soap, sponges, etc.",
      },
    ],
  },
  {
    id: "dining",
    title: "5. Dining (if applicable)",
    timeAllotment: "3–5 Minutes",
    items: [
      {
        task: "Table",
        description:
          "Move furniture to clean floors and check underneath. Remove fingerprints from wood, glass, or marble.",
      },
      {
        task: "Tablecloths",
        description: "Check washable fabrics for food or stains.",
      },
      {
        task: "Chairs",
        description:
          "Spray/clean surfaces and upholstery. Disinfect highchairs/booster seats. Wipe between spindles.",
      },
      {
        task: "Centerpieces",
        description: "Clean based on material or leave as appropriate.",
      },
      {
        task: "Presentation",
        description: "Ensure the dining area looks professionally presented.",
      },
    ],
  },
  {
    id: "bathroom",
    title: "6. Bathroom(s)",
    timeAllotment: "10 Minutes each",
    items: [
      {
        task: "Disinfection",
        description:
          "Spray/disinfect wall tiles, mirrors, vanity, bathtub area, toilet, and trash bin.",
      },
      {
        task: "Walls & Light Fixtures",
        description: "Wipe all walls from left to right.",
      },
      {
        task: "Windows",
        description: "Check glass for oily stains; spray/clean glass and trims.",
      },
      {
        task: "Mirrors",
        description: "Clean and check for oily stains.",
      },
      {
        task: "Vanity / Sink",
        description:
          "Clear drains. Clean countertops, tiles, doors, baseboards, and vanity interior. Polish sink, tap, and drain ring.",
      },
      {
        task: "Bathtub / Shower Area",
        description:
          "Roll up shower curtain and put away soap containers. Wipe tile walls, shower, and taps top to bottom. Magic eraser on tub soil. Polish taps and drain ring.",
      },
      {
        task: "Glass Shower Doors",
        description: "Clean transparent doors with rags (no squeegee).",
      },
      {
        task: "Toilet",
        description:
          "Sanitize inside (brush/cleaner) and outside including behind and screws. Polish with a clean rag.",
      },
      {
        task: "Garbage Bin",
        description: "Clean/wipe the outside, especially aluminum finishes.",
      },
      {
        task: "Re-Stock",
        description:
          "Replenish soaps, lotions, tissues, toilet paper, shampoo, conditioner, body wash, and towels.",
      },
    ],
  },
  {
    id: "laundry",
    title: "7. Laundry Area",
    timeAllotment: "3 Minutes",
    items: [
      {
        task: "Lint Traps",
        description: "Empty lint traps on all machines.",
      },
      {
        task: "Machine Surfaces",
        description: "Spray/clean spills; check for hair on machines.",
      },
      {
        task: "Machine Interiors",
        description: "Open all machines and inspect inside.",
      },
      {
        task: "Area Tidy",
        description: "Clean and tidy the laundry area.",
      },
    ],
  },
  {
    id: "exteriors",
    title: "8. Balcony, Decks, A/C Units & Other Exteriors",
    timeAllotment: "5 Minutes",
    items: [
      {
        task: "Walls & Patio Sets",
        description: "Check walls and clean patio chairs and tables.",
      },
      {
        task: "BBQ",
        description: "Lift BBQ covers and clean BBQ if used.",
      },
      {
        task: "Floor",
        description: "Broom or sweep the floor.",
      },
    ],
  },
  {
    id: "entrance",
    title: "9. Entrance Vest / Hall",
    timeAllotment: "3 Minutes",
    items: [
      {
        task: "Door & Knobs",
        description:
          "Clean the inner side of the door and knobs — special attention to mud and dirt.",
      },
      {
        task: "Coat Hangers",
        description: "Ensure coat hangers are in good shape.",
      },
      {
        task: "Rugs & Shoe Trays",
        description: "Remove gravel and soil from rugs and shoe trays.",
      },
      {
        task: "Parks Pass & Info Panels",
        description:
          "Ensure panels/posters are clean, in place, and free of fingerprints.",
      },
    ],
  },
  {
    id: "floors",
    title: "10. Floors / Staircases",
    timeAllotment: "20–30 Minutes",
    items: [
      {
        task: "Vacuum Floors & Carpets",
        description:
          "Vacuum under beds, in all rooms (far side toward entrance), and under rugs.",
      },
      {
        task: "Mop & Baseboards",
        description:
          "Mop all floors and clean baseboards with rags. Use one fresh pad per unit — do not reuse pads between apartments. Large areas may require two or more pads.",
      },
      {
        task: "Wooden Baseboards",
        description:
          "Be mindful of dust, hair, and stains between guests on wood baseboards.",
      },
    ],
  },
  {
    id: "final-inspection",
    title: "11. Final Inspection",
    timeAllotment: "3 Minutes",
    intro:
      "A mandatory quick check before leaving the unit to confirm the cleaning meets expectations.",
    items: [
      {
        task: "Critical Areas",
        description:
          "Under beds; tubs/showers (hair on walls); toilet bases and interior; beds (hair on pillows); nightstands (backside); mirrors; sinks/vanities.",
      },
      {
        task: "Surfaces & Drawers",
        description:
          "Observe granite and wood surfaces from different angles for transparent spills. Open and close all drawers with a rag to catch missed spots.",
      },
      {
        task: "Living Room Check",
        description:
          "Check seats and sofas for hair. Inspect tables. Ensure floor areas under tables are clean.",
      },
      {
        task: "Kitchen Check",
        description: "Final pass on overall kitchen cleaning.",
      },
      {
        task: "Departure",
        description:
          "Turn off lights. Set curtains as requested. Do not leave cleaning equipment. Close and double-check the lock.",
      },
    ],
  },
];
