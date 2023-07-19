import {reducer} from "../api-reducer";

describe("API Reducer", () => {
  const initialState = {
    data: [],
    status: "none",
  };

  it("should return state as it is when no action type matches", () => {
    const result = reducer(initialState, {type: "something"});

    expect(result).toBe(initialState);
  });

  it("should return API status LOADING for fetching action type", () => {
    const result = reducer(initialState, {type: "FETCHING"});

    expect(result.data).toEqual([]);
    expect(result.status).toBe("loading");
  });

  it("should return API status success and data for success action type", () => {
    const result = reducer(initialState, {type: "SUCCESS", payload: [{a: "b"}]});

    expect(result.data).toEqual([{a: "b"}]);
    expect(result.status).toBe("success");
  });

  it("should return API status failed for error for ERROR action type", () => {
    const result = reducer(initialState, {type: "ERROR"});

    expect(result.status).toBe("failed");
  });

  it("should return API status success for error for SUCCESS_NO_CONTENT action type", () => {
    const result = reducer(initialState, {type: "SUCCESS_NO_CONTENT"});

    expect(result.status).toBe("success");
  });
});
