import React from "react";
import {renderHook} from "@testing-library/react";
import * as AxiosContext from "../../../contexts/axios-context";
import { useGetAllVendor } from "../useGetAllVendor";

jest.mock("../contexts/axios-context", () => ({
  useAxios: jest.fn(),
}));

describe("useGetAllVendor", () => {
  it("should intialise data and status with initial value", () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({response: {data: []}}),
    };
    jest
      .spyOn(AxiosContext, "useAxios")
      .mockReturnValueOnce({axiosInstance: mockAxiosInstance});
    const initialState = {response: {data: [], metadata: {}}, status: "none"};
    const dispatch = jest.fn();
    jest.spyOn(React, "useReducer").mockReturnValueOnce([initialState, dispatch]);

    const {result} = renderHook(() => useGetAllVendor());

    expect(result.current.response.data).toEqual([]);
    expect(result.current.status).toBe("none");
  });
});
