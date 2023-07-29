import { APIStatus } from "../../reducers/api-reducer";
import PaginatedTable from "./PaginatedTable";
import {render, screen} from "@testing-library/react";

describe("Paginated Table", () => {
  const mockCols = [{label: "Col1", id: "Col1"}, {label: "Col2", id: "Col2"}];
  const mockRows = [{Col1: "Row1Col1", Col2: "Row1Col2"}, {Col1: "Row2Col1", Col2: "Row2Col2"}];

  it("should render table header", () => {
    render(<PaginatedTable columns={mockCols} rows={[]} page={1} count={10} apiStatus={"None"}
    handleChangePage={() => {}}>
    </PaginatedTable>);

    expect(screen.getByText("Col1")).toBeInTheDocument();
    expect(screen.getByText("Col2")).toBeInTheDocument();
  });

  it("should display text for Error Scenario", () => {
    render(<PaginatedTable columns={mockCols} rows={[]} page={1} count={10} apiStatus={APIStatus.FAILED}
    handleChangePage={() => {}}>
    </PaginatedTable>);

    expect(screen.getByText("Something went wrong, Please try again!!")).toBeInTheDocument();
  });

  it("should display text for Empty Row Scenario", () => {
    render(<PaginatedTable columns={mockCols} rows={[]} page={1} count={10} apiStatus={APIStatus.SUCCESS}
    handleChangePage={() => {}}>
    </PaginatedTable>);

    expect(screen.getByText("Nothing Found")).toBeInTheDocument();
  });

  it("should show loader for loading scenario", () => {
    render(<PaginatedTable columns={mockCols} rows={[]} page={1} count={10} apiStatus={APIStatus.LOADING}
    handleChangePage={() => {}}>
    </PaginatedTable>);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display row data when apistatus is successful", () => {
    render(<PaginatedTable columns={mockCols} rows={mockRows} page={1} count={10} apiStatus={APIStatus.SUCCESS}
    handleChangePage={() => {}}>
    </PaginatedTable>);

    expect(screen.getByText("Row1Col1")).toBeInTheDocument();
    expect(screen.getByText("Row2Col1")).toBeInTheDocument();
  });
});
