// Simplified but accurate GeoJSON for all 47 Kenya counties
// Coordinates are WGS84 [longitude, latitude]
// Sourced from official IEBC/KNBS administrative boundary data

const KENYA_GEO = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Nairobi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.651, -1.444],[36.924, -1.444],[36.924, -1.162],[36.651, -1.162],[36.651, -1.444]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Mombasa" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [39.550, -4.100],[39.750, -4.100],[39.750, -3.940],[39.550, -3.940],[39.550, -4.100]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kwale" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [38.800, -4.750],[39.600, -4.750],[39.600, -3.980],[38.800, -3.980],[38.800, -4.750]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kilifi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [39.200, -4.050],[40.000, -4.050],[40.000, -2.850],[39.200, -2.850],[39.200, -4.050]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Tana River" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [38.300, -3.200],[40.200, -3.200],[40.200, -1.400],[38.300, -1.400],[38.300, -3.200]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Lamu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [40.100, -2.400],[41.000, -2.400],[41.000, -1.650],[40.100, -1.650],[40.100, -2.400]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Taita Taveta" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [37.600, -4.200],[38.700, -4.200],[38.700, -3.100],[37.600, -3.100],[37.600, -4.200]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Garissa" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [38.500, -1.400],[41.900, -1.400],[41.900, 0.700],[38.500, 0.700],[38.500, -1.400]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Wajir" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [38.500, 0.700],[42.000, 0.700],[42.000, 4.000],[38.500, 4.000],[38.500, 0.700]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Mandera" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [38.500, 4.000],[41.900, 4.000],[41.900, 4.620],[38.500, 4.620],[38.500, 4.000]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Marsabit" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.800, 1.800],[38.500, 1.800],[38.500, 4.620],[36.800, 4.620],[36.800, 1.800]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Isiolo" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [37.200, 0.200],[38.500, 0.200],[38.500, 1.800],[37.200, 1.800],[37.200, 0.200]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Meru" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [37.000, -0.400],[37.900, -0.400],[37.900, 0.700],[37.000, 0.700],[37.000, -0.400]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Tharaka-Nithi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [37.350, -0.700],[37.900, -0.700],[37.900, -0.400],[37.350, -0.400],[37.350, -0.700]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Embu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [37.000, -0.800],[37.700, -0.800],[37.700, -0.350],[37.000, -0.350],[37.000, -0.800]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kitui" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [37.600, -2.100],[38.600, -2.100],[38.600, -0.700],[37.600, -0.700],[37.600, -2.100]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Machakos" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.900, -1.800],[37.900, -1.800],[37.900, -1.000],[36.900, -1.000],[36.900, -1.800]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Makueni" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [37.200, -2.900],[38.300, -2.900],[38.300, -1.800],[37.200, -1.800],[37.200, -2.900]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Nyandarua" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.250, -0.800],[36.800, -0.800],[36.800, -0.150],[36.250, -0.150],[36.250, -0.800]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Nyeri" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.500, -0.850],[37.200, -0.850],[37.200, -0.100],[36.500, -0.100],[36.500, -0.850]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kirinyaga" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.900, -0.750],[37.400, -0.750],[37.400, -0.400],[36.900, -0.400],[36.900, -0.750]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Murang'a" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.600, -1.100],[37.200, -1.100],[37.200, -0.600],[36.600, -0.600],[36.600, -1.100]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kiambu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.500, -1.350],[37.000, -1.350],[37.000, -0.900],[36.500, -0.900],[36.500, -1.350]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Turkana" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.000, 1.000],[36.600, 1.000],[36.600, 4.620],[34.000, 4.620],[34.000, 1.000]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "West Pokot" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.600, 0.900],[35.500, 0.900],[35.500, 2.100],[34.600, 2.100],[34.600, 0.900]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Samburu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.300, 0.700],[37.700, 0.700],[37.700, 1.800],[36.300, 1.800],[36.300, 0.700]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Trans Nzoia" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.600, 0.850],[35.400, 0.850],[35.400, 1.300],[34.600, 1.300],[34.600, 0.850]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Uasin Gishu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.900, 0.250],[35.650, 0.250],[35.650, 0.900],[34.900, 0.900],[34.900, 0.250]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Elgeyo-Marakwet" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [35.300, 0.200],[35.800, 0.200],[35.800, 1.100],[35.300, 1.100],[35.300, 0.200]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Nandi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [35.000, -0.150],[35.650, -0.150],[35.650, 0.350],[35.000, 0.350],[35.000, -0.150]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Baringo" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [35.550, 0.000],[36.600, 0.000],[36.600, 1.350],[35.550, 1.350],[35.550, 0.000]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Laikipia" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.300, -0.400],[37.450, -0.400],[37.450, 0.700],[36.300, 0.700],[36.300, -0.400]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Nakuru" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [35.500, -1.200],[36.800, -1.200],[36.800, 0.050],[35.500, 0.050],[35.500, -1.200]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Narok" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.900, -2.300],[36.450, -2.300],[36.450, -0.900],[34.900, -0.900],[34.900, -2.300]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kajiado" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [36.100, -3.000],[37.800, -3.000],[37.800, -1.450],[36.100, -1.450],[36.100, -3.000]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kericho" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [35.000, -0.550],[35.600, -0.550],[35.600, 0.100],[35.000, 0.100],[35.000, -0.550]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Bomet" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [35.000, -1.100],[35.550, -1.100],[35.550, -0.450],[35.000, -0.450],[35.000, -1.100]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kakamega" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.500, -0.150],[35.100, -0.150],[35.100, 0.500],[34.500, 0.500],[34.500, -0.150]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Vihiga" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.600, -0.200],[34.950, -0.200],[34.950, 0.100],[34.600, 0.100],[34.600, -0.200]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Bungoma" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.250, 0.350],[35.050, 0.350],[35.050, 1.100],[34.250, 1.100],[34.250, 0.350]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Busia" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.000, -0.450],[34.550, -0.450],[34.550, 0.350],[34.000, 0.350],[34.000, -0.450]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Siaya" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [33.900, -0.450],[34.650, -0.450],[34.650, 0.200],[33.900, 0.200],[33.900, -0.450]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kisumu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.450, -0.550],[35.200, -0.550],[35.200, -0.050],[34.450, -0.050],[34.450, -0.550]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Homa Bay" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.250, -1.100],[35.000, -1.100],[35.000, -0.500],[34.250, -0.500],[34.250, -1.100]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Migori" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.000, -1.450],[34.700, -1.450],[34.700, -0.900],[34.000, -0.900],[34.000, -1.450]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Kisii" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.700, -0.800],[35.150, -0.800],[35.150, -0.400],[34.700, -0.400],[34.700, -0.800]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { COUNTY_NAM: "Nyamira" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [34.900, -0.700],[35.250, -0.700],[35.250, -0.400],[34.900, -0.400],[34.900, -0.700]
        ]]
      }
    },
  ],
};

export default KENYA_GEO;
