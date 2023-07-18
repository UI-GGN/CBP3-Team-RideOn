import {getDateTime} from "../DateTimeConvertor";
describe("Date Time Convertor", () => {
  it("should convert timestampz to `ddd DD MMM YYYY h:mm A` format", () => {
    const result = getDateTime("2023-07-09T05:22:28.000Z");

    expect(result).toEqual("Sun 09 Jul 2023 10:52 AM");
  });
});
