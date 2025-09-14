import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query";
import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api//giphy.api";
import { giphyResponse } from "../../mockData/gifs.mock.data";

describe("getGifsByQuery", () => {
  let mock = new AxiosMockAdapter(giphyApi);
  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });

  // test("should returns a list of gifs", async() => {
  //   const gifs = await getGifsByQuery('goku')
  //   const [gif1] = gifs

  //   expect(gifs.length).toBe(10)
  //   expect(gif1).toEqual({
  //     id: expect.any(String),
  // height:expect.any(Number),
  // title:expect.any(String),
  // url:expect.any(String),
  // width: expect.any(Number),
  //   })
  // });
  test("should returns a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphyResponse);
    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(5);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
    });
  });

  test("should returns an empty list of gifs if query is empty", async () => {
    // mock.onGet("/search").reply(200, {data:[]});
    mock.restore();
    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error when API returns an error", async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(()=> {

    })
    mock.onGet("/search").reply(400, { data: { message: "Bad request" } });
    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(0)
    expect(consoleErrorSpy).toBeCalled()
    expect(consoleErrorSpy).toBeCalledTimes(1)
  });
});
