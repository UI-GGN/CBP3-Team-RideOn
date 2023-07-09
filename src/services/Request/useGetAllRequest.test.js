import React from "react";
import { renderHook } from "@testing-library/react";
import { useGetAllRequest } from "./useGetAllRequest";
import * as AxiosContext from "../../contexts/axios-context";

jest.mock("../contexts/axios-context", () => ({
  useAxios: jest.fn()
}));

describe("useGetAllRequest", () => {
  it("should intialise data and status with initial value", () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ response: {data: []} }),
    };
    jest.spyOn(AxiosContext, "useAxios").mockReturnValueOnce({ axiosInstance: mockAxiosInstance });
    const initialState = { data: [], status: "none" };
    const dispatch = jest.fn();
    jest.spyOn(React, "useReducer").mockReturnValueOnce([initialState, dispatch]);

    const { result } = renderHook(() => useGetAllRequest());

    expect(result.current.data).toEqual([]);
    expect(result.current.status).toBe("none");
  });
});
