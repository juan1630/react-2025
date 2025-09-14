import { expect, test, describe } from "vitest";
import { getHeroByNameAction } from "./get-hero-by-name";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("get-hero-action", () => {
  test("should fetch hero data and return with complete image url", async () => {
    const data = await getHeroByNameAction("bruce-wayne");

    expect(data?.image).toContain(BASE_URL);
    expect(data?.image).toContain("http");
    expect(data).toStrictEqual({
      id: "2",
      name: "Bruce Wayne",
      slug: "bruce-wayne",
      alias: "Batman",
      powers: [
        "Artes marciales",
        "Habilidades de detective",
        "Tecnología avanzada",
        "Sigilo",
        "Genio táctico",
      ],
      description:
        "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
      strength: 6,
      intelligence: 10,
      speed: 6,
      durability: 7,
      team: "Liga de la Justicia",
      image: "http://localhost:3001/images/2.jpeg",
      firstAppearance: "1939",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });
  });

  test("should throw an error if hero is not found", async() => {
    const idSlug = "batman";
    const result = await getHeroByNameAction(idSlug).catch((error) => {
      expect(error).toBeDefined()
      expect(error.response.data.statusCode).toBe(404);
      expect(error.message).toBe("Request failed with status code 404");
    });

    expect(result).toBeUndefined()
  });
});
