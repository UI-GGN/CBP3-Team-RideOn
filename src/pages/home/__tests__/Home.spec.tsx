// import {render, waitFor} from '@testing-library/react';
// import Home from "../Home";
// import {MemoryRouter} from "react-router-dom";
// import {withAuthenticationRequired, useAuth0} from "@auth0/auth0-react";
//
// // jest.mock('@auth0/auth0-react', () => ({
// //   withAuthenticationRequired: jest.fn().mockImplementation((component, ignore) => null),
// //   useAuth0: () => {
// //     return {
// //       user: { sub: "foobar" },
// //       isAuthenticated: false,
// //       loginWithRedirect: jest.fn(),
// //       logout: false
// //     };
// //   }
// // }));
// jest.mock("@auth0/auth0-react", () => ({
//   ...jest.requireActual("@auth0/auth0-react"),
//   withAuthenticationRequired: jest.fn(),
//   useAuth0: jest.fn(),
// }));
//
// // describe("Home Page", () => {
// //   beforeEach(() => {
// //     const mockLocation = {
// //       pathname: "/home/routes",
// //     };
// //     withAuthenticationRequired.mockImplementation((component) => component);
// //     const mockUser = {name: "John Doe", email: "john@example.com", picture: "somelink"};
// //     const mockIsAuthenticated = true;
// //     const mockLogin = jest.fn();
// //     const mockLogout = jest.fn();
// //     const mockAuth0Context = {
// //       isAuthenticated: mockIsAuthenticated,
// //       user: mockUser,
// //       loginWithRedirect: mockLogin,
// //       logout: mockLogout,
// //     };
// //
// //     useAuth0.mockReturnValue(mockAuth0Context);
// //   });
// //
// // // jest.mock('@auth0/auth0-react', () => ({
// // //   Auth0Provider: ({ children }) => children,
// // //   withAuthenticationRequired: (component, _) => "a",
// // //   useAuth0: () => {
// // //     return {
// // //       user: { sub: "foobar" },
// // //       isAuthenticated: false,
// // //       loginWithRedirect: jest.fn(),
// // //       logout: false
// // //     };
// // //   }
// // // }));
// // // value returned for useAuth0 when logged-in
// // // const mockUseAuth0LoggedIn = {
// // //   isAuthenticated: true,
// // //   isLoading: false,
// // //   logout: false,
// // //   loginWithRedirect: jest.fn()
// // // };
// // // const mockUseAuth0 = () => {
// // //   return mockUseAuth0LoggedIn;
// // // };
// // // jest.mock('@auth0/auth0-react', () => {
// // //   // load original module
// // //   const originalModule = jest.requireActual('@auth0/auth0-react');
// // //
// // //   // mock only the functions we want to mock
// // //   return {
// // //     __esModule: true,
// // //     ...originalModule,
// // //     useAuth0: jest.fn(() => mockUseAuth0())
// // //   };
// // // });
// // // test('renders profile views', () => {
// // //   const {baseElement} = render(<Home />);
// // //
// // //   // const sectionHeading = baseElement.container.querySelector("#welcome-message");
// // //   // expect(sectionHeading).toBeInTheDocument();
// // //   expect(baseElement).toMatchSnapshot();
// // //   // expect(baseElement("RideOn")).toBeVisible();
// // // });
// //   test("renders the component", async () => {
// //     const {getByText, getByRole} = render(
// //         <MemoryRouter>
// //           {" "}
// //           <Home/>{" "}
// //         </MemoryRouter>
// //     );
// //
// //     await waitFor(() => {
// //       expect(getByText("Routes")).toBeInTheDocument();
// //       expect(getByText("Requests")).toBeInTheDocument();
// //       expect(getByText("Logout")).toBeInTheDocument();
// //       expect(getByRole("img")).toBeInTheDocument();
// //     });
// //     expect(render(
// //         <MemoryRouter>
// //           {" "}
// //           <Home/>{" "}
// //         </MemoryRouter>
// //     )).toMatchSnapshot();
// //   });
// // };
// const mockedUseAuth0 = <jest.Mock<typeof useAuth0>>useAuth0;
//
//   mockedUseAuth0.mockReturnValue({
//     isAuthenticated: true,
//     user,
//     logout: jest.fn(),
//     loginWithRedirect: jest.fn()
//   });
// jest.mock("@auth0/auth0-react");
//
// const mockedUseAuth0 = mocked(useAuth0, true);
// describe("Home Page", () => {
//   beforeEach(() => {
//     withAuthenticationRequired.mockImplementation((component) => component);
//     // const mockUser = {name: "John Doe", email: "john@example.com", picture: "somelink"};
//     // const mockIsAuthenticated = true;
//     // const mockLogin = jest.fn();
//     // const mockLogout = jest.fn();
//     // const mockAuth0Context = {
//     //   isAuthenticated: mockIsAuthenticated,
//     //   user: mockUser,
//     //   loginWithRedirect: mockLogin,
//     //   logout: mockLogout,
//     // };
//     //
//     // useAuth0.mockReturnValue(mockAuth0Context);
//     mockedUseAuth0.mockReturnValue({
//       isAuthenticated: true,
//       user,
//       logout: jest.fn(),
//       loginWithRedirect: jest.fn(),
//       getAccessTokenWithPopup: jest.fn(),
//       getAccessTokenSilently: jest.fn(),
//       getIdTokenClaims: jest.fn(),
//       loginWithPopup: jest.fn(),
//       isLoading: false,
//     });
//   });
//
//   test("renders the component", async () => {
//     const {getByText, getByRole} = render(
//         <MemoryRouter>
//           {" "}
//           <Home/>{" "}
//         </MemoryRouter>
//     );
//
//     await waitFor(() => {
//       expect(getByText("Routes")).toBeInTheDocument();
//       expect(getByText("Requests")).toBeInTheDocument();
//       expect(getByText("Logout")).toBeInTheDocument();
//       expect(getByRole("img")).toBeInTheDocument();
//     });
//     expect(render(
//         <MemoryRouter>
//           {" "}
//           <Home/>{" "}
//         </MemoryRouter>
//     )).toMatchSnapshot();
//   });
// });
